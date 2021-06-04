module.exports = (app) => {
     // criando a 1a rota
    // rota '/'

    // get() define a rota e função que deve ser executada
    app.get('/', (request, response) => {
        console.log('Rota principal chamada...');
        response.send('Servidor rodando, está tudo ok.');
    });

    // criando rota para cadastrar rastreador 
    app.post('/rastreador', app.controllers.rastreador.cadastrar);

};





   