const Uc = require('../models/uc');

module.exports.list = async () => {
    return await Uc.find().exec();
}

module.exports.findById = async (id) => {
    return await Uc.findOne({ _id: id }).exec();
}

module.exports.Informacoes = async (id) => {
    const result = await Uc.findOne({ _id: id })
        .select({ _id: 0, 'horario': 1, 'avaliacao': 1, 'datas': 1 })
        .lean()
        .exec();

    return {
        horario: result?.horario,
        avaliacao: result?.avaliacao,
        datas: result?.datas
    };
}

module.exports.inserir = async (ucData) => {
    const exists = await Uc.findOne({ _id: ucData._id }).exec();
    if (!exists) {
        const newUc = new Uc(ucData);
        return await newUc.save();
    }
}

module.exports.remove = async (id) => {
    return await Uc.deleteOne({ _id: id }).exec();
}

module.exports.update = async (id, ucData) => {
    return await Uc.updateOne({ _id: id }, ucData).exec();
}

module.exports.inserirAula = async (id, aula) => {    
    const updateResult = await Uc.updateOne(
        { _id: id }, 
        { $push: { aulas: aula } }
    ).exec();
    
    return updateResult;
};

module.exports.removeAula = async (id, aulaId) => {
    const updateResult = await Uc.updateOne(
        { _id: id },
        { $pull: { aulas: { _id: aulaId } } }
    ).exec();

    return updateResult;
}

module.exports.updateAula = async (id, aulaId, aulaData) => {
    const updateResult = await Uc.updateOne(
        { _id: id, 'aulas._id': aulaId },
        { $set: { 'aulas.$': aulaData } }
    ).exec();

    return updateResult;
}

module.exports.inserirDocente = async (id, docente) => {
    const updateResult = await Uc.updateOne(
        { _id: id },
        { $push: { docentes: docente } }
    ).exec();

    return updateResult;
}

module.exports.removeDocente = async (id, docenteId) => {
    const updateResult = await Uc.updateOne(
        { _id: id },
        { $pull: { docentes: { _id: docenteId } } }
    ).exec();

    return updateResult;
}

module.exports.updateDocente = async (id, docenteId, docenteData) => {
    const updateResult = await Uc.updateOne(
        { _id: id, 'docentes._id': docenteId },
        { $set: { 'docentes.$': docenteData } }
    ).exec();

    return updateResult;
}

module.exports.inserirAnuncio = async (id, anuncio) => {
    const updateResult = await Uc.updateOne(
        { _id: id },
        { $push: { anuncios: anuncio } }
    ).exec();

    return updateResult;
}

module.exports.removeAnuncio = async (id, anuncioId) => {
    const updateResult = await Uc.updateOne(
        { _id: id },
        { $pull: { anuncios: { _id: anuncioId } } }
    ).exec();  
    
    return updateResult;
}

module.exports.updateAnuncio = async (id, anuncioId, anuncioData) => {
    const updateResult = await Uc.updateOne(
        { _id: id, 'anuncios._id': anuncioId },
        { $set: { 'anuncios.$': anuncioData } }
    ).exec();

    return updateResult;
}

