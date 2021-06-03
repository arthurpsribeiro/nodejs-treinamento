const express = require('express');

const app = express();

app.listen(3000 /*porta*/, () => console.log('Servidor rodando na porta 3000'));

//criando a 1a rota
// rota '/'

// get() define a rota e funçaõ que deve ser executada
app.get('/' /*url da rota*/, (request, response) => {
    console.log('Rota principal chamada...');
    response.send('Servidor rodando, está tudo ok.');
});

app.get('/rastreador' /*url da rota*/, (request, response) => {
    console.log('Rota principal chamada...');
    response.send('Servidor rodando, está tudo ok.');
});
