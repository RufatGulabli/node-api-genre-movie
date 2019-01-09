const winston = require('winston');
const express = require('express');
const config = require('config');
const genres = require('./controllers/genres');
const customers = require('./controllers/customers');
const movies = require('./controllers/movies');
const rentals = require('./controllers/rentals');
const users = require('./controllers/users');
const auth = require('./controllers/auth');
const errorHandler = require('./middleware/error');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);

if (!config.get('JWT')) {
    console.error('FATAL ERROR : \'JWT\' Environment Variable is not defined.');
    process.exit(1);
}

const app = express();
app.use(bodyParser.json());

winston.add(winston.transports.File, { filename : 'logFile.log'});

mongoose.connect('mongodb://localhost/hometask', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err.message));

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(errorHandler);

const port = config.get('PORT') || 3000;
// app.use('port', port);

app.listen(port, () => console.log(`Server is running on port ${port}...`));