const router = require('express').Router();
let Calendar = require('../models/calendar.model');

router.route('/').get((req, res) => {
    Calendar.find()
        .then(calendar => res.json(calendar))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const isOpen = req.body.isOpen;
    const date = req.body.date;
    const place = req.body.place;
    const mapLink = req.body.mapLink;
    const text = req.body.text;
    const link = req.body.link;
    const army = req.body.army;
    const soldiers = req.body.soldiers;
    const missionConclude = false;
    const active = true;

    const newCalendar = new Calendar({ name, isOpen, date, place, mapLink, link, text, army, soldiers, active, missionConclude });

    newCalendar.save()
        .then(() => res.json('Calendar added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    Calendar.findById(req.params.id)
        .then(calendar => res.json(calendar))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    Calendar.findByIdAndDelete(req.params.id)
        .then(() => res.json('Calendar deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update-soldiers/:id').post((req, res) => {
    Calendar.findById(req.params.id)
        .then(calendar => {
            calendar.soldiers = req.body.soldiers;

            calendar.save()
                .then(() => res.json('Calendar Recruits updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update-calendar/:id').post((req, res) => {
    Calendar.findById(req.params.id)
        .then(calendar => {
            calendar.name = req.body.name;
            calendar.date = req.body.date;
            calendar.place = req.body.place;
            calendar.mapLink = req.body.mapLink;
            calendar.link = req.body.link;
            calendar.text = req.body.text;
            calendar.army = req.body.army;
            calendar.missionConclude = req.body.missionConclude;

            calendar.save()
                .then(() => res.json('Calendar updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/conclude-calendar/:id').post((req, res) => {
    Calendar.findById(req.params.id)
        .then(calendar => {
            calendar.active = req.body.active;
            calendar.missionConclude = req.body.missionConclude;

            calendar.save()
                .then(() => res.json('Calendar concluded!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;