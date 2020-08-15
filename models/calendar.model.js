const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    name: { type: String, required: true},
    isOpen: { type: Boolean, required: true},
    date: { type: String, required: true},
    place: { type: String },
    mapLink: { type: String },
    text: { type: String },
    link: { type: String, required: true},
    army: { type: String },
    soldiers: { type: Array, required: true},
    active: { type: Boolean, reqiuired: true }
}, {
    timestamps: true,
})

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;