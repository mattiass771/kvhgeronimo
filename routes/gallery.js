const router = require('express').Router();
let Gallery = require('../models/gallery.model');

router.route('/').get((req, res) => {
    Gallery.find()
        .then(gallery => res.json(gallery))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const about = req.body.about;
    const date = req.body.date;
    const links = req.body.links;
    const showLink = req.body.showLink;

    const newGallery = new Gallery({ name, date, about, links, showLink });

    newGallery.save()
        .then(() => res.json('Gallery added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    Gallery.findById(req.params.id)
        .then(gallery => res.json(gallery))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    Gallery.findByIdAndDelete(req.params.id)
        .then(() => res.json('Gallery deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;