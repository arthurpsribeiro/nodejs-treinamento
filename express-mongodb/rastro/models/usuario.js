const mongoose = require("mongoose");

module.exports = (app) => {
	const Schema = mongoose.Schema;
	const usuarioSchema = Schema({
		login: { type: String, required: true, index: { unique: true } },
		senha: { type: String, required: true },
	});
	const Usuario = mongoose.model("usuarios", usuarioSchema);
	return Usuario;
};
