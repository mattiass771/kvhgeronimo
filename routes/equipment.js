const router = require('express').Router();
let Equip = require('../models/equipment.model');

router.route('/').get((req, res) => {
    Equip.find()
        .then(equip => res.json(equip))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const short = req.body.short;
    const army = req.body.army;
    const type = req.body.type;

    const newEquip = new Equip({name, army, type, short});

    newEquip.save()
        .then(() => res.json('Equipment added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    Equip.findById(req.params.id)
        .then(equip => res.json(equip))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    Equip.findByIdAndDelete(req.params.id)
        .then(() => res.json('Equipment deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
    Equip.findById(req.params.id)
        .then(equip => {
            equip.name = req.body.name;
            equip.short = req.body.short;
            equip.army = req.body.army;
            equip.type = req.body.type;

            equip.save()
                .then(() => res.json('Equipment updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;