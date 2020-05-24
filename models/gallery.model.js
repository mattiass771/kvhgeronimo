const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    name: { type: String, required: true },
    about: { type: String, required: true  },
    date: { type: Number, required: true  },
    links: { type: Array, required: true  },
    showLink: { type: String, required: true  }
})

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;