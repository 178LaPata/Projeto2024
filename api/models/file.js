const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    uc: String,
    aula: String,
    date: String,
    mimetype: String,
    name: String,
    original: String,
    size: Number
});

module.exports = mongoose.model('files', FileSchema);

