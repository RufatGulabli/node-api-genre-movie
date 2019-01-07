const express = require('express');
const genres = require('./controllers/genres');
const customers = require('./controllers/customers');
const movies = require('./controllers/movies');
const rentals = require('./controllers/rentals');
const users = require('./controllers/users');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/hometask', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err.message));

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

const port = process.env.NODE_ENV || 3000;
app.set('port', port);

app.listen(port, () => console.log(`Server is running on port ${port}...`));