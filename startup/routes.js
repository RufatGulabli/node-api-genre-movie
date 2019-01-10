const express = require('express');
const genres = require('../controllers/genres');
const customers = require('../controllers/customers');
const movies = require('../controllers/movies');
const rentals = require('../controllers/rentals');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const errorHandler = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(errorHandler);
}