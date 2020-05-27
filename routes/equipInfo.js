const router = require('express').Router();
let EquipInfo = require('../models/equipInfo.model');

router.route('/').get((req, res) => {
    EquipInfo.find()
        .then(equipInfo => res.json(equipInfo))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const _id = req.body._id;
    const links = req.body.links;
    const image = req.body.image;

    const newEquipInfo = new EquipInfo({ _id, links, image });

    newEquipInfo.save()
        .then(() => res.json('Equipment Info added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    EquipInfo.findById(req.params.id)
        .then(equipInfo => res.json(equipInfo))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    EquipInfo.findByIdAndDelete(req.params.id)
        .then(() => res.json('Equipment Info deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;