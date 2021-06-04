const express = require('express');

//configuracao do mongoose
const mongoose = require('mongoose');

//para fazer conexão com o MongoDB, através do Mongoose
let connect = mongoose.connect(
    'mongodb://localhost:27017/rastro-dev', // string de conexão
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

console.log(connect);

//classe schema do mongoose permite definir a estrutura de uma coleção no MongoDB
const Schema = mongoose.Schema;

// Schema() define a estrutura da coleção
const rastreadorSchema = Schema({
    codigoRastreador: {type: String, required: true, index: {unique: true}},
    placaVeiculo: {type: String, required: true},
    cpfCliente: {type: String, required: true}
});

console.log(typeof(Schema));  

// model() cria a coleção

const Rastreador = mongoose.model('rastreadores'/*nome da coleção */, rastreadorSchema);
console.log(typeof(Rastreador));

mongoose.disconnect;

const app = express();

// use() permite configuras alguns recrusos do express
// essas configurações vão permitir acessar o body do request
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.listen(3000 /*porta*/, () => console.log('Servidor rodando na porta 3000'));

//criando a 1a rota
// rota '/'

// get() define a rota e função que deve ser executada
app.get('/' /*url da rota*/, (request, response) => {
    console.log('Rota principal chamada...');
    response.send('Servidor rodando, está tudo ok.');
});

//criando rota para cadastrar rastreador 
app.post('/rastreador', (request, response) => {
    console.log('Rota /rastreador chamada');
    console.log(request.body);
    response.send('OK');
});

