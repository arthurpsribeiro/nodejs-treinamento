const mongoose = require("mongoose");

module.exports = (app) => {
	const RastreamentoController = {
		cadastrar(request, response) {
			console.log("rota /rastreamento chamada...");

			const Rastreamento = app.models.rastreamento;
			const Rastreador = app.models.rastreador;

			const rastreamento = new Rastreamento(request.body);

			if (!rastreamento.dataHora) {
				rastreamento.dataHora = new Date();
			}

			mongoose
				.connect(app.const.db.connectUrl, app.const.db.connectOptions)
				.then(() => {
					Rastreador.find({
						codigoRastreador: rastreamento.codigoRastreador,
					})
						.then((result) => {
							// result = array de documentos
							// se a busca na coleção 'rastreadores' retornar algo,
							// o result (array) vem com tamanho maior que zero
							if (result.length > 0) {
								Rastreamento.create(rastreamento)
									.then((result) => {
										//result = documento criado
										console.log(
											`Rastreamento do rastreamento ${rastreamento.codigoRastreador} cadastrado com sucesso.`
										);
										mongoose.disconnect();
										response.status(200).send(result);
									})
									.catch((error) => {
										console.log(`Erro ao cadastrar o Rastreamento: ${error}`);
										mongoose.disconnect();
										response
											.status(500)
											.send(`Erro ao cadastrar o Rastreamento: ${error}`);
									});
							} else {
								console.log(
									`Rastreador de codigoRastreador: ${rastreamento.codigoRastreador} não localizado no cadastro.`
								);
								response
									.status(404)
									.send(
										`Rastreador de codigoRastreador: ${rastreamento.codigoRastreador} não localizado no cadastro.`
									);
								mongoose.disconnect();
							}
						})
						.catch((error) => {
							console.log(
								`Erro ao localizar o cadastro do Rastreador: ${error}`
							);
							mongoose.disconnect();
							response
								.status(500)
								.send(`Erro ao localizar o código do Rastreador: ${error}`);
						});
				})
				.catch((error) => {
					console.log(`Erro ao conectar no banco MongoDB: ${error}`);
					response
						.status(500)
						.send(`Erro ao conectar no banco MongoDB: ${error}`);
				});
		},

		buscarCodigoRastreador(request, response) {
			console.log("Rota GET / rastreamento/:codigoRastreador chamada...");

			if (
				request.params.codigoRastreador == "" ||
				request.params.codigoRastreador == null
			) {
				response.status(400).send("Parâmetro codigoRastreador inválido");
			} else {
				mongoose
					.connect(app.const.db.connectUrl, app.const.db.connectOptions)
					.then(() => {
						const Rastreamento = app.models.rastreamento;

						Rastreamento.find({
							codigoRastreador: request.params.codigoRastreador,
						})
							.then((result) => {
								//lista de rastreamento
								mongoose.disconnect();
								response.status(200).send(result);
							})
							.catch((error) => {
								// erro ao realizar a pesquisa
								console.log(
									`Erro ao realizar a consulta de rastreamentos: ${error}`
								);
								mongoose.disconnect();
								response
									.status(500)
									.send(
										`Erro ao realizar a consulta de rastreamentos: ${error}`
									);
							});
					})
					.catch((error) => {
						console.log(`Erro ao conectar no banco MongoDB: ${error}`);
						response
							.status(500)
							.send(`Erro ao conectar no banco MongoDB: ${error}`);
					});
			}
		},
	};
	return RastreamentoController;
};
