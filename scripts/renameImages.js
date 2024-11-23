const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../public/images/bw');

// Get existing files with the pattern
function getLastImageNumber() {
    const files = fs.readdirSync(sourceDir)
        .filter(file => file.match(/chadwicknft_photography-\d+\.jpg$/i));
    
    if (files.length === 0) return 0;
    
    const numbers = files.map(file => {
        const match = file.match(/chadwicknft_photography-(\d+)\./);
        return match ? parseInt(match[1]) : 0;
    });
    
    return Math.max(...numbers);
}

// Rename files
function renameFiles() {
    let nextNumber = getLastImageNumber() + 1;
    
    const files = fs.readdirSync(sourceDir)
        .filter(file => file.match(/\.(jpg|jpeg|JPG|JPEG)$/))
        .filter(file => !file.match(/chadwicknft_photography-\d+\.jpg$/i))
        .filter(file => !file.includes('thumbnails') && !file.includes('medium') && !file.includes('large'));
    
    files.forEach(file => {
        const oldPath = path.join(sourceDir, file);
        const newName = `chadwicknft_photography-${nextNumber}.jpg`;
        const newPath = path.join(sourceDir, newName);
        
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed ${file} to ${newName}`);
        nextNumber++;
    });
}

renameFiles();
