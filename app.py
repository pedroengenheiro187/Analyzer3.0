from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Permite chamadas de qualquer origem (incluindo seu frontend no Render)

@app.route("/")
def home():
    return "API Analyzer ativa. Use /analyze para enviar imagens."

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        # Verifica se as imagens estão presentes
        if 'image1' not in request.files or 'image2' not in request.files:
            return jsonify({"error": "Duas imagens são necessárias"}), 400

        image1 = request.files['image1']
        image2 = request.files['image2']

        # Abre as imagens com Pillow para futuras análises
        img1 = Image.open(io.BytesIO(image1.read()))
        img2 = Image.open(io.BytesIO(image2.read()))

        # Simulação de resultado
        result = {
            "image1_size": img1.size,
            "image2_size": img2.size,
            "same_format": img1.format == img2.format,
            "message": "Imagens analisadas com sucesso."
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"Erro ao analisar imagens: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
