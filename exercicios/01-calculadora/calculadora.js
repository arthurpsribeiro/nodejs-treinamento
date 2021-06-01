const calculadora = {
    somar(a, b){
        return a + b;
    },
    somarNumeros(...n) {
        let total = 0
        n.forEach((value) => {
            total += value; 
        })
        return total;
    },
    subtrair(a, b){
        return a - b;
    },
    subtrairNumeros(...n) {
        let total = n[0];
        n.forEach((value, index) => {
            if (index > 0){
                total -= value;
            }
        });
        return total;
    },
    multiplicar(a,b){
        return a * b;
    },
    multiplicarNumeros(...n){
        let total = 1;
        n.forEach((value) => {
            total *= value;
        })
        return total;
    },
    dividir(a,b){
        return a / b;
    },
    dividirNumeros(...n){
        let total = n[0];
        n.forEach((value, index) => {
            if (index > 0){
                total /= value;
            }
        })
        return total;
    }


}

module.exports = calculadora;