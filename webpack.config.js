/* eslint-disable global-require */
let config = null;
if (process.env.NODE_ENV === 'production') {
  config = require('./webpack/webpack.config.prod.js');
} else {
  config = require('./webpack/webpack.config.dev.js');
}

module.exports = config;
