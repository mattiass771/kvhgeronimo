const router = require('express').Router();
let Library = require('../models/library.model');

router.route('/').get((req, res) => {
    Library.find()
        .then(library => res.json(library))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const text = req.body.text;
    const isOpen = req.body.isOpen;
    const links = req.body.links;

    const newLibrary = new Library({ name, isOpen, links, text });

    newLibrary.save()
        .then(() => res.json('Library added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    Library.findById(req.params.id)
        .then(library => res.json(library))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    Library.findByIdAndDelete(req.params.id)
        .then(() => res.json('Library deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update-library/:id').post((req, res) => {
    Library.findById(req.params.id)
        .then(library => {
            library.name = req.body.name;
            library.text = req.body.text;
            library.links = req.body.links;

            library.save()
                .then(() => res.json('Library updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;