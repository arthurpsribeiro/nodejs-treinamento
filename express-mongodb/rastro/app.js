const express = require('express');

//configuracao do mongoose
const mongoose = require('mongoose');

//para fazer conexão com o MongoDB, através do Mongoose
let connect = mongoose.connect(
    'mongodb://localhost:2707//rastro-dev', //string de conexão
    { // objeto de configurações
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

console.log(connect);

//classe schema do mongoose permite definir a estrutura de uma coleção no MongoDB
const schema = mongoose.Schema;

console.log(typeof(schema)); // CONTINUA.... 

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

