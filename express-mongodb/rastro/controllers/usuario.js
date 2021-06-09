const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

		login(request, response) {
			console.log("Rota POST /login ");

			mongoose
				.connect(app.const.db.connectUrl, app.const.db.connectOptions)
				.then((result) => {
					const Usuario = app.models.usuario;
					Usuario.find({ login: request.body.login })
						.then((result) => {
							if (result.length > 0) {
								const usuario = result[0];

								if (bcrypt.compareSync(request.body.senha, usuario.senha)) {
									// gerar um token para devolver na resposta
									const payload = { login: usuario.login };
									const token = jwt.sign(payload, app.const.security.chaveJWT, {
										expiresIn: app.const.security.tempoExpiracaoToken,
									});
									console.log(token);
									response.set("Authorization", token);
									response.status(200).send("usuário logado com sucesso");

									mongoose.disconnect();
								} else {
									console.log("login ou senha inválidos");
									response.status(401).send("Login ou Senha inválido");
									mongoose.disconnect();
								}
							} else {
								response.status(401).send(`Usuário não localizado no cadastro`);
								mongoose.disconnect();

								console.log(`Login ou senha inválidos`);
							}
						})
						.catch((error) => {
							response
								.status(500)
								.send(`Erro ao localizar o usuário no cadastro: ${error}`);
							mongoose.disconnect();
							console.log(`Erro ao localizar o usuário no cadastro: ${error}`);
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
