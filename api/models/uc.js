const mongoose = require('mongoose');

const ucSchema = new mongoose.Schema({
    _id: Number,
    sigla: String,
    titulo: String,
    docentes: [{
        _id: Number,
        nome: String,
        foto: String,
        categoria: String,
        filiacao: String,
        email: String,
        webpage: String
    }],
    horario: {
        teoricas: [String],
        praticas: [String]
    },
    avaliacao: [String],
    datas: {
        teste: String,
        exame: String,
        projeto: String
    },
    anuncios: [{
        _id: Number,
        titulo: String,
        conteudo: String,
        dataAnuncio: String
    }],
    aulas: [{
        _id: Number,
        tipo: String,
        data: String,
        sumario: [String]
    }]
}, { versionKey: false });

module.exports = mongoose.model('ucs', ucSchema);
