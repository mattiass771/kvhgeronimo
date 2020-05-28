const router = require('express').Router();
let Soldier = require('../models/soldier.model');

router.route('/').get((req, res) => {
    Soldier.find()
        .then(soldier => res.json(soldier))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const _id = req.body._id;
    const nameFull = req.body.nameFull;
    const completeName = req.body.completeName;
    const name = req.body.name;
    const password = req.body.password;
    const rank = req.body.rank;
    const state = req.body.state;
    const birth = req.body.birth;
    const eyes = req.body.eyes;
    const hair = req.body.hair;
    const weight = req.body.weight;
    const height = req.body.height;
    const story = req.body.story;
    const action = req.body.action;
    const squad = req.body.squad;
    const func = req.body.func;
    const imageURL = req.body.imageURL;
    const equip = req.body.equip;

    const newSoldier = new Soldier({ _id, nameFull, completeName, 
        name, password, rank, state, birth, eyes, hair, weight, 
        height, story, action, squad, func, imageURL, equip });

    newSoldier.save()
        .then(() => res.json('Soldier added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    Soldier.findById(req.params.id)
        .then(soldier => res.json(soldier))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    Soldier.findByIdAndDelete(req.params.id)
        .then(() => res.json('Soldier deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
    Soldier.findById(req.params.id)
        .then(soldier => {
            soldier.equip = req.body.equip;

            soldier.save()
                .then(() => res.json('Equipment updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update-story/:id').post((req, res) => {
    Soldier.findById(req.params.id)
        .then(soldier => {
            soldier.story = req.body.story;

            soldier.save()
                .then(() => res.json('Story updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update-soldier/:id').post((req, res) => {
    Soldier.findById(req.params.id)
        .then(soldier => {
            soldier._id = req.body._id;
            soldier.nameFull = req.body.nameFull;
            soldier.completeName = req.body.completeName;
            soldier.name = req.body.name;
            soldier.password = req.body.password;
            soldier.rank = req.body.rank;
            soldier.state = req.body.state;
            soldier.birth = req.body.birth;
            soldier.eyes = req.body.eyes;
            soldier.hair = req.body.hair;
            soldier.weight = req.body.weight;
            soldier.height = req.body.height;
            soldier.story = req.body.story;
            soldier.action = req.body.action;
            soldier.squad = req.body.squad;
            soldier.func = req.body.func;
            soldier.imageURL = req.body.imageURL;

            soldier.save()
                .then(() => res.json('Soldier Data updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;