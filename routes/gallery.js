const router = require('express').Router();
let Gallery = require('../models/gallery.model');

router.route('/').get((req, res) => {
    Gallery.find()
        .then(gallery => res.json(gallery))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const _id = req.body._id;
    const name = req.body.name;
    const about = req.body.about;
    const links = req.body.links;
    const date = req.body.date;

    const newGallery = new Gallery({ _id, name, about, links });

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

router.route('/update/:id').post((req, res) => {
    Gallery.findById(req.params.id)
        .then(gallery => {
            gallery._id = req.body._id;
            gallery.name = req.body.name;
            gallery.about = req.body.about;
            gallery.links = req.body.links;

            gallery.save()
                .then(() => res.json('Gallery updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;