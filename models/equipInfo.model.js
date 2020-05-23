const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipInfoSchema = new Schema({
    _id: { type: String, required: true },
    links: { type: Object, required: true },
    image: { type: String, required: true }
})

const EquipInfo = mongoose.model('EquipInfo', equipInfoSchema);

module.exports = EquipInfo;