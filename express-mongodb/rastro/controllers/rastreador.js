const mongoose = require("mongoose");

const connectUrl = "mongodb://localhost:27017/rastro-dev"; //string de conexao
const connectOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};

module.exports = (app) => {
	const RastreadorController = {
		// método cadastrar vai atender a rota POST /rastreador
		cadastrar(request, response) {
			const Rastreador = app.models.rastreador;

			// criar o documento na coleção 'rastreadores'
			const rastreador = new Rastreador(request.body);

			mongoose
				.connect(connectUrl, connectOptions)
				.then(() => {
					// esse result, caso seja passado como parâmetro, é um objeto Mongoose (objeto de conexão)
					console.log("Conexao com MongoDB realizada.");
					//grava um documento na coleção
					Rastreador.create(rastreador)
						.then((result) => {
							// esse result é um documento do rastreador
							mongoose.disconnect();
							response.status(200).send(result);
							console.log(
								`Rastreador ${rastreador.codigoRastreador} cadastrado com sucesso.`
							);
						})
						.catch((error) => {
							mongoose.disconnect();
							response
								.status(500)
								.send(`Erro ao cadastrar o Rastreador: ${error}`);
							console.log(`Erro ao cadastrar o Rastreador: ${error}`);
						});
				})
				.catch((error) => {
					response
						.status(500)
						.send(`Erro ao conectar no banco MongoDB: ${error}`);
					console.log(`Erro ao conectar no banco MongoDB: ${error}`);
				});
		},

		alterar(request, response) {
			console.log("Rota PUT /rastreador chamada...");

			const Rastreador = app.models.rastreador;

			mongoose
				.connect(connectUrl, connectOptions)
				.then(() => {
					// a função updateOne() altera um documento da coleção
					Rastreador.updateOne(
						{
							// objeto com o criterio de busca do documento
							codigoRastreador: request.body.codigoRastreador,
						},
						{
							// objeto com os dados que devem ser atualizados
							$set: {
								placaVeiculo: request.body.placaVeiculo,
								cpfCliente: request.body.cpfCliente,
							},
						}
					)
						.then((result) => {
							console.log(result);

							if (result.nModified > 0) {
								mongoose.disconnect();
								response.status(200).send("Rastreador alterado com sucesso");
							} else {
								mongoose.disconnect();
								response
									.status(404)
									.send("Rastreador não localizado no cadastro");
							}
						})
						.catch((error) => {
							mongoose.disconnect();
							response
								.status(500)
								.send(`Erro ao alterar o Rastreador: ${error}`);
							console.log(`Erro ao alterar o Rastreador: ${error}`);
						});
				})
				.catch((error) => {
					response
						.status(500)
						.send(`Erro ao conectar no banco MongoDB: ${error}`);
					console.log(`Erro ao conectar no banco MongoDB: ${error}`);
				});
		},

		excluir(request, response) {
			console.log("Rota DELETE /rastreador chamada...");
			console.log(request.params);

			const Rastreamento = app.models.rastreamento;
			const Rastreador = app.models.rastreador;

			mongoose
				.connect(connectUrl, connectOptions)
				.then(() => {
					Rastreamento.deleteMany({
						codigoRastreador: request.params.codigoRastreador,
					})
						.then((result) => {
							console.log(result);
							Rastreador.deleteOne({
								codigoRastreador: request.params.codigoRastreador,
							})
								.then((result) => {
									if (result.deletedCount > 0) {
										response
											.status(200)
											.send(
												`Rastreador ${request.params.codigoRastreador} deletado com sucesso`
											);
									} else {
										response
											.status(500)
											.send(
												`Rastreador ${request.params.codigoRastreador} não encontrado`
											);
									}

									mongoose.disconnect();
								})
								.catch((error) => {
									mongoose.disconnect();
									response
										.status(500)
										.send(`Erro ao deletar o Rastreador ${error}`);
								});
						})
						.catch((error) => {
							mongoose.disconnect();
							response
								.status(500)
								.send(`Erro ao deletar o Rastreador ${error}`);
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
	return RastreadorController;
};
