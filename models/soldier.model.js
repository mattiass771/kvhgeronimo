const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const soldierSchema = new Schema({
    _id: { type: String, required: true },
    nameFull: { type: String},
    completeName: { type: String, required: true},
    name: { type: String, required: true },
    password: { type: String, required: true },
    rank: { type: String },
    state: { type: String },
    birth: { type: String },
    eyes: { type: String },
    hair: { type: String },
    weight: { type: String },
    height: { type: String },
    story: { type: String },
    action: { type: Array },
    squad: { type: String },
    func: { type: String },
    imageURL: { type: String },
    equip: { type: Object }
})

const Soldier = mongoose.model('Soldier', soldierSchema);

module.exports = Soldier;