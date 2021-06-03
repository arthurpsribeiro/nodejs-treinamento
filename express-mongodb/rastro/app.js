const express = require('express');

console.log(express);

const app = express();

console.log(app);

app.listen(3000 /*porta*/, () => console.log('Servidor rodando na porta 3000'));