const express = require('express');
const config = require('./startup/config');
const winston = require('winston');
const app = express();

require('./startup/loggin')();
require('./startup/routes')(app);
require('./startup/db')();
config.configuration();
require('./startup/validation')();

app.listen(config.port, () => winston.info(`Server is running on port ${config.port}...`));
