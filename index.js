const express = require('express');
const multer = require('multer');
const { analyzeImages } = require('./utils/imageUtils');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use(express.json());

app.post('/analyze', upload.array('images', 2), async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length !== 2) {
            return res.status(400).json({ error: 'Envie duas imagens para análise' });
        }

        const result = await analyzeImages(files[0].path, files[1].path);
        res.json(result);
    } catch (error) {
        console.error('Erro ao analisar imagens:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});