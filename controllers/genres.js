const express = require('express');
const winston = require('winston');
const { Genre, isValidGenre } = require('../model/genre');
const authorization = require('../middleware/authorization');
const admin = require('../middleware/admin');

const router = express.Router();

/*============================ HTTP Methods ====================================*/
router.get('/', async (req, res, next) => {
    try {
        let genres = await Genre.find().sort('name');
        return res.send(genres);
    } catch (exc) {
        next(exc);
    }
}); 

router.get('/:id', async (req, res) => {

    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.json(`Genre with ID=${req.params.id} not found`)
        return res.json(genre);
    } catch (exc) {
        next(exc);
    }

    // const id = req.params.id;
    // Genre.findById({ _id : id})
    //      .then(result => res.json(result))
    //      .catch(err => res.json(err.message));
});

router.post('/', authorization, async (req, res) => {
    const { error } = isValidGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    
    const genre = new Genre({
        name: req.body.name,
        description: req.body.description
    });
    
    try {
        let result = await genre.save();
        return res.json(result);
    } catch (exc) {
        next(exc);
    }

    // genre.save().then(() => {
    //     res.json(genre);
    // }).catch(err => {
    //     res.json(err);
    // });
});

router.put('/:id', authorization, async (req, res) => {
    const { error } = isValidGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let { name, description } = req.body;
    try {
        const genre = await Genre.findOneAndUpdate({ _id: req.params.id }, {
            name: name,
            description: description
        }, { new: true });
        return res.json(genre);
    } catch (exc) {
        next(exc);
    }
});

router.delete('/:id', [authorization, admin], async (req, res) => {
    try {
        const result = await Genre.findOneAndDelete({ _id: req.params.id });
        res.json(result);
    } catch (exc) {
        next(exc);
    }

    // Genre.deleteOne({_id : req.params.id}).then((result) => {
    //     res.json(result);
    // }).catch((err) => {
    //     res.send(err.message);
    // });

});

module.exports = router;