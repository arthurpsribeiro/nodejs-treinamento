const express = require("express");

const consign = require("consign");

const app = express();

// use() permite configuras alguns recrusos do express
// essas configurações vão permitir acessar o body do request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

consign()
	.include("const")
	.include("models")
	.then("controllers")
	.then("routes")
	.into(app);

app.listen(app.const.app.porta, () =>
	console.log(`Servidor rodando na porta ${app.const.app.porta}`)
);
