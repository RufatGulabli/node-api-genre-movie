const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    description: {
        type: String,
        required: false
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function isValidInput(genre) {
    const joiSchema = {
        name: Joi.string().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).min(3).max(30).required(),
        description: Joi.string().optional().allow()
    };
    return Joi.validate(genre, joiSchema);
};

module.exports = {
    Genre: Genre,
    isValidGenre: isValidInput,
    genreSchema: genreSchema
};
