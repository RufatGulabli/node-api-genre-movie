const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema, isValidGenre } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        default: 0
    },
    genre: genreSchema
}));

function isValidInput(movie, genre) {
    const joiSchema = {
        title: Joi.string().min(3).max(30).required(),
        numberInStock: Joi.number().min(0).optional(),
        dailyRentalRate: Joi.number().min(0).optional(),
        genre: Joi.required()
    };
    const movieError = Joi.validate(movie, joiSchema).error;
    const genreError = isValidGenre(genre).error;
    return movieError || genreError;
}

module.exports = {
    Movie: Movie,
    isValidMovie: isValidInput,
}