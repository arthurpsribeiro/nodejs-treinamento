const calculadora = require('./calculadora');

console.log(calculadora.somar(1, 2));
console.log(calculadora.somarNumeros(1, 2, 3, 4, 5, 6));

console.log(calculadora.subtrair(1, 2));
console.log(calculadora.subtrairNumeros(10, 2, 2));

console.log(calculadora.multiplicar(10, 2));
console.log(calculadora.multiplicarNumeros(10, 2, 2));

console.log(calculadora.dividir(10, 2));
console.log(calculadora.dividirNumeros(20, 2, 2));
