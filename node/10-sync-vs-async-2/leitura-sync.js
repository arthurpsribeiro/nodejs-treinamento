const fs = require('fs');

const leituraSync = (file) => {
    console.log(`Fazendo a leitura no modo síncrono do arquivo ${file}`);
    const startTime = new Date();
    let data = fs.readFileSync(file);
    const endTime = new Date();
    console.log(`Tempo de duração da função no modo síncrono: ${endTime - startTime}`);
    return startTime - endTime;
}

module.exports = leituraSync;