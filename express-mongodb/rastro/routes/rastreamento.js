module.exports = (app) => {
    //criando rota para cadastrar rastreamento
    // post
    // rota '/rastreamento'

    app.post("/rastreamento", app.controllers.rastreamento.cadastrar);
};
