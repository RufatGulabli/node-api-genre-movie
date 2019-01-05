const express = require('express');
const mongoose = require('mongoose');
const { Movie, isValidMovie } = require('../model/movie');
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
        const movies = await Movie.find().sort({ name: 1 });
        return res.json(movies);
    } catch (err) {
        return res.status(404).json('Bad Request');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById({ _id: req.params.id });
        if (!movie) return res.json(`Movie with ID=${req.params.id} not found`)
        return res.json(movie);
    } catch (err) {
        return res.status(404).json(err.message);
    }
})

router.post('/', async (req, res) => {
    const { error } = isValidMovie(req.body);
    if (error) return res.status(404).json(error.details[0].message);

    let { title, numberInStock, dailyRentalRate, genre } = req.body;
    let newGenre = new Genre({
        name: genre.name,
        description: genre.description
    });

    let movie = new Movie({
        title: title,
        numberInStock: numberInStock,
        dailyRentalRate: dailyRentalRate,
        genre: newGenre
    });
    try {
        const result = await movie.save();
        await newGenre.save();
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err.message);
    }
});

router.put('/:id', async (req, res) => {
    // Input Validation
    const error = isValidMovie(req.body, req.body.genre);
    if (error) return res.status(404).send(error.details[0].message);
    let { numberInStock, dailyRentalRate, title } = req.body;
    let { name, description } = req.body.genre;

});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Movie.findOneAndDelete({ _id: req.params.id });
        if (!result) return res.status(404).json(`Movie with the id ${req.params.id} not found.`);
        res.json(result);
    } catch (err) {
        return res.status(400).json(err.message);
    }
});

module.exports = router;
