const fs = require('fs');

let dir = './arquivos';

// readdir() é uma função assíncrona
fs.readdir(dir, (error, fileName) => {
    if (error) {
        throw error;
    } else {
        fileName.forEach((fileName) => {
            // stat() tbm é assíncrona
            fs.stat(`${dir}/${fileName}`, (error, result) => {
                // console.log(`erro: ${error}   |   resultado: ${result}`);
                console.log(` arquivo: ${fileName} tem ${result.size} bytes`);
            });
        });
    }
});