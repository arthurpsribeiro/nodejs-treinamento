module.exports = (app) => {
	// criando rota para cadastrar usuário
	// POST
	// rota '/usuário'

	app.post("/usuario", app.controllers.usuario.cadastrar);
};
