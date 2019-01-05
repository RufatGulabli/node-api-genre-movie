const express = require('express');
const mongoose = require('mongoose');
const { Genre, isValidGenre } = require('../model/genre');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/hometask', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err.message));

const router = express.Router();
router.use(bodyParser.json());

/*============================ HTTP Methods ====================================*/
router.get('/', async (req, res) => {
    try {
        let genres = await Genre.find().sort('name');
        return res.send(genres);
    } catch (err) {
        return res.status(404).json(err);
    }
});

router.get('/:id', async (req, res) => {

    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.json(`Genre with ID=${req.params.id} not found`)
        return res.json(genre);
    } catch (err) {
        return res.status(404).json({
            errorCode: 1,
            message: `Genre with the id ${req.params.id} not found.`
        });
    }

    // const id = req.params.id;
    // console.log(id);
    // Genre.findById({ _id : id})
    //      .then(result => res.json(result))
    //      .catch(err => res.json(err.message));
});

router.post('/', async (req, res) => {
    const { error } = isValidGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name,
        description: req.body.description
    });

    try {
        let result = await genre.save();
        return res.send(result);
    } catch (err) {
        return res.status(404).json({
            errCode: 1,
            message: err
        })
    }

    // genre.save().then(() => {
    //     res.json(genre);
    // }).catch(err => {
    //     res.json(err);
    // });
});

router.put('/:id', async (req, res) => {
    const { error } = isValidGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let { name, description } = req.body;
    try {
        const genre = await Genre.findOneAndUpdate({ _id: req.params.id }, {
            name: name,
            description: description
        }, { new: true });
        return res.json(genre);
    } catch (err) {
        return res.status(404).json({
            errorCode: 1,
            message: `Genre with the id ${req.params.id} not found.`
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Genre.findOneAndDelete({ _id: req.params.id });
        res.json(result);
    } catch (err) {
        return res.status(404).json({
            errorCode: 1,
            message: `Genre with the id ${req.params.id} not found.`
        });
    }

    // Genre.deleteOne({_id : req.params.id}).then((result) => {
    //     res.json(result);
    // }).catch((err) => {
    //     res.send(err.message);
    // });

});

module.exports = router;