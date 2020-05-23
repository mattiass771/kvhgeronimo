const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String},
    about: { type: String},
    links: { type: Array}
})

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;