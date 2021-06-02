// teste de gravação de arquivos texto no modo assíncrono

const fs = require('fs');

const inicio = new Date();
console.log(`inicio: ${inicio}`);

for (let i = 1; i <= 1000; i++) {
    
    fs.writeFile((erro) => {
        console.log(`arquivo teste-async-${i}.txt gravado`);
        if (i == 1000) {
            const ultimoArquivo = new Date();
            console.log(`ultimo arquivo: ${ultimoArquivo}`);
            console.log(`tempo (ms): ${ultimoArquivo - inicio}`);    
        }
    });
}

const fim = new Date();
console.log(`fim: ${fim}`);
console.log(`tempo (ms): ${fim - inicio}`);