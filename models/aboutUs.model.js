const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aboutUsSchema = new Schema({
    _id: { type: String, required: true },
    links: { type: Array, required: true },
    text: { type: Object }
})

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

module.exports = AboutUs;