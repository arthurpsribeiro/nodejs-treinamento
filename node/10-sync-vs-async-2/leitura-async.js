const fs = require('fs');

const leituraAsync = (file) => {
    console.log(`Fazendo a leitura no modo assíncrono do arquivo ${file}`);
    const startTime = new Date();
    let data = fs.readFile(file, (error, data) => {
        if (error) {
            throw error;
        } else {
            const endRead = new Date();
            console.log(`Tempo (ms) de leitura do arquivo ${file} : ${endRead - startTime}`)
        }
        return startTime - endTime;
    });
    const endTime = new Date();
    console.log(`Tempo de duração da função no modo assíncrono: ${endTime - startTime}`);

};

module.exports = leituraAsync;
