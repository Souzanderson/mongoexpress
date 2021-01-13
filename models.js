const mongoose = require('mongoose');

exports.ncm = mongoose.model('ncm', new mongoose.Schema({
    id: String,
    ncm: String,
    natureza: String,
    descricao: String,
    valor: String
}), 'ncm');

