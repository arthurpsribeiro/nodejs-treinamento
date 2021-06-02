// teste de gravacao de arquivos texto no modo síncrono

const fs = require('fs');

let retorno = fs.writeFileSync('teste-sync.txt', 'Olá, enfermeira!');

const inicio = new Date();
console.log(`inicio: ${inicio}`);

for (let i = 1; i <= 1000; i++){
    fs.writeFileSync(`teste-sync-${i}.txt`, 'Olá, enfermeira!');
}

const fim = new Date();

console.log(`fim: ${fim}`);
console.log(`tempo: ${fim - inicio}`);






