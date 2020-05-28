const router = require('express').Router();
let Reports = require('../models/reports.model');

router.route('/').get((req, res) => {
    Reports.find()
        .then(reports => res.json(reports))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const text = req.body.text;
    const isOpen = req.body.isOpen;
    const links = req.body.links;

    const newReports = new Reports({ name, isOpen, links, text });

    newReports.save()
        .then(() => res.json('Reports added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    Reports.findById(req.params.id)
        .then(reports => res.json(reports))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    Reports.findByIdAndDelete(req.params.id)
        .then(() => res.json('Reports deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update-report/:id').post((req, res) => {
    Reports.findById(req.params.id)
        .then(reports => {
            reports.name = req.body.name;
            reports.text = req.body.text;
            reports.links = req.body.links;

            reports.save()
                .then(() => res.json('Report updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;