const mongoose = require("mongoose");

module.exports = (app) => {
    const RastreadorController = {
        // método cadastrar vai atender a rota POST /rastreador
        cadastrar(request, response) {
            const Rastreador = app.models.rastreador;

            // criar o documento na coleção 'rastreadores'
            const rastreador = new Rastreador(request.body);

            // parametros para mongoose.connect()
            let connectUrl = "mongodb://localhost:27017/rastro-dev"; //string de conexao
            // objeto de configuracoes
            let connectOptions = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            };

            mongoose
                .connect(connectUrl, connectOptions)
                .then(() => {
                    // esse result, caso seja passado como parâmetro, é um objeto Mongoose (objeto de conexão)
                    console.log("Conexao com MongoDB realizada.");
                    //grava um documento na coleção
                    Rastreador.create(rastreador)
                        .then((result) => {
                            // esse result é um documento do rastreador
                            mongoose.disconnect();
                            response.status(200).send(result);
                            console.log(
                                `Rastreador ${rastreador.codigoRastreador} cadastrado com sucesso.`
                            );
                        })
                        .catch((error) => {
                            mongoose.disconnect();
                            response
                                .status(500)
                                .send(
                                    `Erro ao cadastrar o Rastreador: ${error}`
                                );
                            console.log(
                                `Erro ao cadastrar o Rastreador: ${error}`
                            );
                        });
                })
                .catch((error) => {
                    response
                        .status(500)
                        .send(`Erro ao conectar no banco MongoDB: ${error}`);
                    console.log(`Erro ao conectar no banco MongoDB: ${error}`);
                });
        },
    };
    return RastreadorController;
};
