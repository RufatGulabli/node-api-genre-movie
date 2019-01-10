const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/hometask', { useNewUrlParser: true })
        .then(() => winston.info('Connected to MongoDB...'));
}