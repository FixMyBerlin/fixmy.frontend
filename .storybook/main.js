const merge = require('webpack-merge');
const common = require('../webpack/webpack.common.js');

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: (config) => merge(common, config)
};
