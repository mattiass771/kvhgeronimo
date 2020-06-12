const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const librarySchema = new Schema({
    name: { type: String, required: true},
    isOpen: { type: Boolean, required: true},
    text: { type: String, required: true},
    links: { type: Array, required: true}
}, {
    timestamps: true,
})

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;