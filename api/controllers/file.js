const File = require('../models/file'); 


module.exports.list = async () => {
    return await File.find().exec();
}

module.exports.listByUC = uc => {
    return File
        .find({ uc: uc })
        .exec();
}
module.exports.listByAula = (uc, aula) => {
    return File
        .find({ uc: uc, aula: aula })
        .exec();
}

module.exports.findById = id => {
    return File
        .findOne({ _id: id })
        .exec();
}

module.exports.inserir = file => {
    var newFile = new File(file)
    return newFile.save()
}


// não tamos a usar este
module.exports.remove = id => {
    File
        .find({_id : id})
        .deleteOne()
        .exec()
}

module.exports.removeByUC = uc => {
    return File
        .find({ uc: uc })
        .deleteMany()
        .exec()
}

module.exports.removeByAulaName = (uc, aula, id) => {
    return File
        .find({ uc: uc, aula: aula, original: id })
        .deleteOne()
        .exec()
}

module.exports.removeByAula = aula => {
    return File
        .find({ aula: aula })
        .deleteMany()
        .exec()
}


module.exports.updateByAulaName = (uc, aula, name, file) => {
    return File
        .updateOne({ uc:uc, aula: aula, original: name }, file)
        .exec()
}

module.exports.updateUcName = (uc, novo) => {
    return File
        .updateOne({ uc:uc }, novo)
        .exec()
}
module.exports.updateAulaName = (uc, aula, name, novo) => {
    return File
        .updateOne({ uc:uc, aula: aula, name: name }, novo)
        .exec()
}

module.exports.updateAulaName2 = (uc, aula, novo) => {
    return File
        .updateOne({ uc:uc, aula: aula }, novo)
        .exec()
}



// não estamos a usar
module.exports.update = (id, file) => {
    return File
        .updateOne({_id : id  }, file)
        .exec()
}


module.exports.content = (uc, aula, nome) => {
    return File
        .find({ uc: uc, original: nome,  aula: aula })
        .exec();
}

