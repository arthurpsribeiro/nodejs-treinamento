module.exports = (app) => {
	//criando rota para cadastrar rastreamento
	// post
	// rota '/rastreamento'

	app.post("/rastreamento", app.controllers.rastreamento.cadastrar);

	//criando rota para consultar rastreamento por codigo de rastreador
	//GET
	// rota '/rastreamento/:codigoRastreador'

	app.get(
		"/rastreamento/:codigoRastreador",
		app.controllers.rastreamento.buscarCodigoRastreador
	);
};
