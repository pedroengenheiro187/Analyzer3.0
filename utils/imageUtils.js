const fs = require('fs');
const sharp = require('sharp');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

async function analyzeImages(path1, path2) {
    const image1 = PNG.sync.read(fs.readFileSync(path1));
    const image2 = PNG.sync.read(fs.readFileSync(path2));

    const { width, height } = image1;
    const diff = new PNG({ width, height });

    const mismatch = pixelmatch(image1.data, image2.data, diff.data, width, height, {
        threshold: 0.1
    });

    const percentage = ((mismatch / (width * height)) * 100).toFixed(2);

    return {
        similarity: 100 - percentage,
        differencePercentage: percentage,
        edited: percentage > 10 // regra simples: acima de 10% é suspeito
    };
}

module.exports = { analyzeImages };