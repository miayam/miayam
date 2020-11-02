const path = require('path');
const fs = require('fs');
const base = path.resolve('', '_site/assets');

const getAllFiles = function (dirPath) {
    files = fs.readdirSync(dirPath);

    arrayOfFiles = [];

    files.forEach(function (file) {
        arrayOfFiles.push(path.join(dirPath, file))
    })

    return arrayOfFiles
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

const logStat = function (directoryPath, label) {
    const arrayOfFiles = getAllFiles(directoryPath)

    console.log(label);

    arrayOfFiles.forEach(function (filePath) {
        console.log(
            path.relative('_site', filePath),
            convertBytes(fs.statSync(filePath).size)
        );
    })

    console.log('\n');
}

logStat(base + '/styles', 'CSS');
logStat(base + '/scripts', 'JS');
