const fs = require("fs");

function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, dataBuffer) => {
            err ? reject(err) :
            resolve(JSON.parse(dataBuffer.toString()));
        });
    });
};

function writeJsonFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            err ? reject(err) : resolve(data);
        });
    });
};

module.exports = {
    readJsonFile,
    writeJsonFile
}