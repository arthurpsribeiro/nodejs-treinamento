const express = require('express');

const consign = require('consign');

const app = express();

// use() permite configuras alguns recrusos do express
// essas configurações vão permitir acessar o body do request
app.use(express.json());
app.use(express.urlencoded({extended : true}));

consign().include('models').then('controllers').then('routes').into(app);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));


