const path = require('path');
const fs = require('fs');
const glob = require('glob');
const base = path.resolve('', '_site');

const logStat = function (fileExtension) {
    glob.glob(`${base}/**/*.${fileExtension}`, async (err, matches) => {
        const fileNames = matches.map(function (match) {
            return path.relative('_site', match);
        });

        console.log(String(fileExtension).toUpperCase());

        fileNames.forEach(function (fileName) {
            const filePath = `_site/${fileName}`;
            const fileSize = convertBytes(fs.statSync(filePath).size);
            console.log(filePath, fileSize);
        });

        console.log('\n');
    });
}

const convertBytes = function (bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    if (bytes == 0) {
        return "n/a"
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    if (i == 0) {
        return bytes + " " + sizes[i]
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}

logStat('css');
logStat('js');
