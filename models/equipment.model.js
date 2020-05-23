const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipSchema = new Schema({
    name: { type: String, required: true },
    short: { type: String, required: true},
    army: { type: Array, required: true },
    type: { type: String, required: true }
})

const Equipment = mongoose.model('Equipment', equipSchema);

module.exports = Equipment;