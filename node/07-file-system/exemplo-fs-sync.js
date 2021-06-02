// exemplo do modulo FS

const fs = require('fs');

//lendo um arquivo no modo síncrono

let retorno = null;

try {
    retorno = fs.readFileSync('index2.html');
} catch (error) {
    console.log(`Erro na leitura do arquivo: ${error}`);
}

// console.log(retorno);