const mongoose = require("mongoose");

module.exports = (app) => {
	const RastreamentoController = {
		cadastrar(request, response) {
			console.log("rota /rastreamento chamada...");
			console.log(request.body);

			let connectUrl = "mongodb://localhost:27017/rastro-dev";
			let connectOptions = {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			};

			const Rastreamento = app.models.rastreamento;
			const Rastreador = app.models.rastreador;

			const rastreamento = new Rastreamento(request.body);

			if (!rastreamento.dataHora) {
				rastreamento.dataHora = new Date();
			}

			mongoose
				.connect(connectUrl, connectOptions)
				.then(() => {
					Rastreador.find({
						codigoRastreador: rastreamento.codigoRastreador,
					})
						.then((result) => {
							// result = array de documentos

							console.log(result);

							//se a busca na coleção 'rastreadores' retornar algo,
							// o result (array) vem com tamanho maior que zero

							if (result.length > 0) {
								Rastreamento.create(rastreamento)
									.then((result) => {
										//result = documento criado
										console.log(
											`Rastreamento do rastreamento ${rastreamento.codigoRastreador} cadastrado com sucesso.`
										);
										console.log(result);
										mongoose.disconnect();
										response.status(200).send(result);
									})
									.catch((error) => {
										console.log(`Erro ao cadastrar o Rastreamento: ${error}`);
										console.log(error);
										mongoose.disconnect();
										response
											.status(500)
											.send(`Erro ao cadastrar o Rastreamento: ${error}`);
									});
							} else {
								console.log(
									`Rastreador de codigoRastreador: ${rastreamento.codigoRastreador} não localizado no cadastro.`
								);
								mongoose.disconnect();
								response
									.status(404)
									.send(
										`Rastreador de codigoRastrador: ${rastreamento.codigoRastreador}`
									);
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
	};
	return RastreamentoController;
};
