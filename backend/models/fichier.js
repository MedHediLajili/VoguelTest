const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fichierSchema = new Schema({
    fileName: {type: String, required: true},
    fileUrl: {type: String, required: true}
},
{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Fichier', fichierSchema);