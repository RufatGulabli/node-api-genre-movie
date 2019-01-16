const winston = require('winston');

module.exports = function () {
    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
    process.on('unhandledRejection', (exc) => {
        throw exc;
    });
    process.on('uncaughtException', (exc) => {
        winston.error(exc);
        setTimeout(() => {
            process.exit(1);
        }, 500);
    });
    winston.add(winston.transports.File, { filename: 'logFile.log' });
}