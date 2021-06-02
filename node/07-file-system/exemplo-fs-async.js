// exemplo do módulo fyle system

const fs = require('fs'); // 'fs' é o módulo file system

// lendo um arquivo no modo assíncrono

let retorno = fs.readFile('index.html' /* caminho do arquivo*/, 
    (erro, dados) => {
        if (erro) {
            throw erro;
        } else { 
            console.log(dados.toString());
        } 
    });