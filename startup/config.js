const config = require('config');

function configuration() {
    if (!config.get('JWT')) {
        throw new Error('FATAL ERROR : \'JWT\' Environment Variable is not defined.');
    }
}

const port = config.get('PORT') || 3000;

module.exports = {
    configuration: configuration,
    port: port
};