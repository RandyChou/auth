var config = require('./config_' + (process.env.NODE_ENV == 'production' ? 'production' : 'development') + '.js');
config.tip = require('./tip');

module.exports = config;