const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

module.exports = (app) => {
	const UsuarioController = {
		cadastrar(request, response) {
			console.log("Rota POST /usuario chamada...");

			mongoose
				.connect(app.const.db.connectUrl, app.const.db.connectOptions)
				.then((result) => {
					const Usuario = app.models.usuario;
					const usuario = new Usuario(request.body);

					//encriptando senha do usuario com bcrypt.hashSync() <--- assíncrona
					usuario.senha = bcrypt.hashSync(
						usuario.senha,
						app.const.security.custoHash
					);

					Usuario.create(usuario)
						.then((result) => {
							console.log(`Usuario ${result.login} criado com sucesso:`);
							response.status(200).send(result);
						})
						.catch((error) => {
							console.log(`Erro ao cadastrar o usuario: ${error}`);
							response
								.status(500)
								.send(`Erro ao cadastrar o usuario: ${error}`);
						});
				})
				.catch((error) => {
					response
						.status(500)
						.send(`Erro ao conectar no banco MongoDB: ${error}`);
					console.log(`Erro ao conectar no banco MongoDB: ${error}`);
				});
		},
	};
	return UsuarioController;
};
