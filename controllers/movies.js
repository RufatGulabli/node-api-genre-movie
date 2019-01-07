const express = require('express');
const Fawn = require('fawn');
const { Movie, isValidMovie } = require('../model/movie');
const { Genre } = require('../model/genre');

const router = express.Router();

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
    const error = isValidMovie(req.body);
    if (error) return res.status(404).json(error.details[0].message);

    let { title, numberInStock, dailyRentalRate, genre } = req.body;
    let newGenre = new Genre({
        name: genre.name,
        description: genre.description
    });

    const movie = new Movie({
        title: title,
        numberInStock: numberInStock,
        dailyRentalRate: dailyRentalRate,
        genre: newGenre
    });
    try {
        // Imitation of SQL Transactions
        await new Fawn.Task()
            .save(movie)
            .save(genre)
            .run();
        // await movie.save();
        // await newGenre.save();
        return res.json(movie);
    } catch (err) {
        res.status(500).json('Internal Server Error.');
    }
});

router.put('/:id', async (req, res) => {
    // Input Validation
    const error = isValidMovie(req.body, req.body.genre);
    if (error) return res.status(404).send(error.details[0].message);
    let { numberInStock, dailyRentalRate, title } = req.body;
    numberInStock = numberInStock === undefined ? 0 : numberInStock;
    dailyRentalRate = dailyRentalRate === undefined ? 0 : dailyRentalRate;
    let { name, description } = req.body.genre;

    try {
        const result = await Movie.findOneAndUpdate({ _id: req.params.id }, {
            numberInStock: numberInStock,
            dailyRentalRate: dailyRentalRate,
            title: title,
            genre: {
                name: name,
                description: description
            }
        }, { new: true });
        if (!result) return res.status(404).json(`Movie with the id ${req.params.id} not found.`);
        return res.json(result);
    } catch (err) {
        return res.status(404).json({
            errorCode: 1,
            message: err
        });
    }

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
