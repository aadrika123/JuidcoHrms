const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');
const buildDir = path.resolve(__dirname, 'build');

function copyPropertiesFiles(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    entries.forEach((entry) => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyPropertiesFiles(srcPath, destPath);
        } else if (entry.isFile() && entry.name.endsWith('.properties')) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${srcPath} to ${destPath}`);
        }
    });
}

copyPropertiesFiles(srcDir, buildDir);
