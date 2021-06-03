const fs = require('fs');

let dir = './arquivos';

const readFile = (dir, fileName) => {
    fs.stat(`${dir}/${fileName}`, (error, result) => {
        console.log(` arquivo: ${fileName} tem ${result.size} bytes`);
    });
};

const readDir = (dir) => {
    // readdir() é uma função assíncrona
    fs.readdir(dir, (error, fileName) => {
        if (error) {
            throw error;
        } else {
            fileName.forEach((fileName) => {
                readFile(dir, fileName)              
            });
        };
    });
};

readDir(dir);