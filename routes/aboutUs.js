const router = require('express').Router();
let AboutUs = require('../models/aboutUs.model');

router.route('/').get((req, res) => {
    AboutUs.find()
        .then(aboutUs => res.json(aboutUs))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const _id = req.body._id;
    const links = req.body.links;
    const text = req.body.text;

    const newAboutUs = new AboutUs({ _id, links, text });

    newAboutUs.save()
        .then(() => res.json('About Us Info added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    AboutUs.findById(req.params.id)
        .then(aboutUs => res.json(aboutUs))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    AboutUs.findByIdAndDelete(req.params.id)
        .then(() => res.json('About Us Info deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;