const express = require('express');

const app = express();

// use() permite configuras alguns recrusos do express
// essas configurações vão permitir acessar o body do request
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.listen(3000 /*porta*/, () => console.log('Servidor rodando na porta 3000'));

//criando a 1a rota
// rota '/'

// get() define a rota e funçaõ que deve ser executada
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