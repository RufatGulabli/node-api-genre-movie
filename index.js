const winston = require('winston');
const express = require('express');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();
require('./startup/routes')(app);
require('./startup/db')();

// To catch Non-Express exeptions and log them
winston.handleExceptions(new winston.transports.File({ filename : 'uncaughtExceptions.log'}));

process.on('unhandledRejection', (exc) => {
    throw exc;
});

winston.add(winston.transports.File, { filename : 'logFile.log'});
process.on('uncaughtException', (exc) => {
    winston.error(exc);
    process.exit(1);
});

if (!config.get('JWT')) {
    console.error('FATAL ERROR : \'JWT\' Environment Variable is not defined.');
    process.exit(1);
}

const port = config.get('PORT') || 3000;
// app.use('port', port);

app.listen(port, () => console.log(`Server is running on port ${port}...`));