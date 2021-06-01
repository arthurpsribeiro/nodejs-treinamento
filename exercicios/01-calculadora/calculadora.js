const calculadora = {
    somar(a, b){
        return a + b;
    },
    somarNumeros(...n) {
        return n.reduce((ac, value) => ac + value)
    },
    subtrair(a, b){
        return a - b;
    },
    subtrairNumeros(...n) {
        return n.reduce((ac, value) => ac - value)

    },
    multiplicar(a, b){
        return a * b;
    },
    multiplicarNumeros(...n){
        return n.reduce((ac, value) => ac * value)
    },
    dividir(a,b){
        return a / b;
    },
    dividirNumeros(...n){
        return n.reduce((ac, value) => ac / value)
    }
}
module.exports = calculadora;