const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../public/images/bw');
const sizes = {
    thumbnail: { width: 400, dir: 'thumbnails' },
    medium: { width: 800, dir: 'medium' },
    large: { width: 1200, dir: 'large' }
};

async function processImage(file) {
    const image = sharp(path.join(sourceDir, file));
    const metadata = await image.metadata();
    
    // Create standardized filename with .jpg extension
    const standardizedFilename = path.basename(file, path.extname(file)) + '.jpg';
    
    for (const [size, config] of Object.entries(sizes)) {
        const targetDir = path.join(sourceDir, config.dir);
        const targetPath = path.join(targetDir, standardizedFilename);
        
        // Calculate height to maintain aspect ratio
        const height = Math.round((config.width / metadata.width) * metadata.height);
        
        await image
            .resize(config.width, height, {
                fit: 'cover',
                withoutEnlargement: true
            })
            .jpeg({
                quality: 85,
                mozjpeg: true
            })
            .toFile(targetPath);
        
        console.log(`Processed ${standardizedFilename} - ${size}`);
    }
}

async function processAllImages() {
    // Clean up existing directories
    for (const { dir } of Object.values(sizes)) {
        const targetDir = path.join(sourceDir, dir);
        if (fs.existsSync(targetDir)) {
            fs.rmSync(targetDir, { recursive: true });
        }
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const files = fs.readdirSync(sourceDir)
        .filter(file => file.match(/\.(jpg|jpeg|JPG|JPEG)$/))
        .filter(file => !file.includes('thumbnails') && !file.includes('medium') && !file.includes('large'));

    for (const file of files) {
        await processImage(file);
    }
}

processAllImages().catch(console.error);
