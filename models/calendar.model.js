const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    name: { type: String, required: true},
    isOpen: { type: Boolean, required: true},
    date: { type: String, required: true},
    place: { type: String, required: true},
    mapLink: { type: String, required: true},
    text: { type: String, required: true},
    link: { type: String, required: true},
    army: { type: String, required: true},
    soldiers: { type: Array, required: true}
}, {
    timestamps: true,
})

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;