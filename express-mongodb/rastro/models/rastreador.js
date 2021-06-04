//configuracao do mongoose
const mongoose = require('mongoose');

module.exports = (app) => {
    // classe schema do mongoose permite definir a estrutura de uma coleção no MongoDB
    const Schema = mongoose.Schema;

    // Schema() define a estrutura da coleção
    const rastreadorSchema = Schema({
        codigoRastreador: {type: String, required: true, index: {unique: true}},
        placaVeiculo: {type: String, required: true},
        cpfCliente: {type: String, required: true}
    });

    // model() 'cria' a coleção
    const Rastreador = mongoose.model('rastreadores'/*nome da coleção */, rastreadorSchema);

    return Rastreador;
};

