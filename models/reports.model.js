const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportsSchema = new Schema({
    name: { type: String, required: true},
    isOpen: { type: Boolean, required: true},
    text: { type: String, required: true},
    links: { type: Array, required: true}
}, {
    timestamps: true,
})

const Reports = mongoose.model('Reports', reportsSchema);

module.exports = Reports;