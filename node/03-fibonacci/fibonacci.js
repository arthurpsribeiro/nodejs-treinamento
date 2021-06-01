const fibonacci = {
    numeroDaPosicao(posicao){
        if (posicao < 0) {
            return null;
        } else if (posicao == 0) {
            return 0;
        } else if (posicao == 1) {
            return 1;
        } else {
            let i = 2;
            let anterior = 0;
            let atual = 1;
            let resultado = 0;
            while (i <= posicao) {
                resultado = anterior + atual;
                anterior = atual;
                atual = resultado;
                i++;
            }
            return resultado; 
        }
    }, 
    serieNumerosAte(posicao) {
        if (posicao < 0) {
            return [];
        } else if (posicao == 0) {
            return [0];
        } else if (posicao == 1) {
            return [0, 1];
        } else {
            let serie = [0, 1];
            let n = 1; 
            while (n < posicao) {
                serie.push(serie[n] + serie[n -1]);
                n++;
            }
            return serie; 

        }

    }
}

module.exports = fibonacci;