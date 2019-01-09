const winston = require('winston');

module.exports = function(err, req, res, next){
    // Log the exception
    winston.error(err);
    res.status(500).json("Internal Server Error.");
};