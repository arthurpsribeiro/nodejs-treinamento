module.exports = (app) => {
	// criando rota para cadastrar usuário
	// POST
	// rota '/usuário'

	app.post("/usuario", app.controllers.usuario.cadastrar);

	// criando rota para login
	// POST
	// rota '/login'

	app.post("/login", app.controllers.usuario.login);
};
