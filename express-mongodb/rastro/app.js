const express = require('express');

//configuracao do mongoose
const mongoose = require('mongoose');

// classe schema do mongoose permite definir a estrutura de uma coleção no MongoDB
const Schema = mongoose.Schema;

// Schema() define a estrutura da coleção
const rastreadorSchema = Schema({
    codigoRastreador: {type: String, required: true, index: {unique: true}},
    placaVeiculo: {type: String, required: true},
    cpfCliente: {type: String, required: true}
});

// model() 'cria' a coleção
const Rastreador = mongoose.model('rastreadores'/*nome da coleção */, rastreadorSchema);

const app = express();

// use() permite configuras alguns recrusos do express
// essas configurações vão permitir acessar o body do request
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

// criando a 1a rota
// rota '/'

// get() define a rota e função que deve ser executada
app.get('/', (request, response) => {
    console.log('Rota principal chamada...');
    response.send('Servidor rodando, está tudo ok.');
});

// criando rota para cadastrar rastreador 
app.post('/rastreador', (request, response) => {

    // criar o documento na coleção 'rastreadores'
    const rastreador = new Rastreador(request.body);

    // parametros para mongoose.connect()
    let connectUrl = 'mongodb://localhost:27017/rastro-dev'; //string de conexao
    // objeto de configuracoes
    let connectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };

    mongoose.connect(connectUrl, connectOptions)
    .then(() => { // esse result, caso seja passado como parâmetro, é um objeto Mongoose (objeto de conexão)
        console.log('Conexao com MongoDB realizada.');
        Rastreador.create(rastreador)
        .then((result) => { // esse result é um documento do rastreador
            mongoose.disconnect();
            response.status(200).send(result);
            console.log(`Rastreador ${rastreador.codigoRastreador} cadastrado com sucesso.`)
        })
        .catch((error) => {
            mongoose.disconnect();
            response.status(500).send(`Erro ao cadastrar o Rastreador: ${error}`);
            console.log(`Erro ao cadastrar o Rastreador: ${error}`);
        });
    })
    .catch((error) => {
        response.status(500).send(`Erro ao conectar no banco MongoDB: ${error}`);
        console.log(`Erro ao conectar no banco MongoDB: ${error}`);
    });

});

