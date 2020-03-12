const merge = require('webpack-merge');
const common = require('../webpack/webpack.common.js');
const path = require('path');

const AppSourceDir = path.join(__dirname, '..', 'src');

/**
 * Replace Storybook's malfuncioning SVG rule with our working one
 *
 * @param {Object} config with non-working SVG rule
 */
const replaceSvgRule = (config) => {
  const svgLoader = {
    use: [
      'babel-loader',
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [{ cleanupIDs: false }, { removeViewBox: false }]
          }
        }
      }
    ]
  };

  const svgRule = config.module.rules.find((rule) =>
    'test.svg'.match(rule.test)
  );
  svgRule.exclude = [AppSourceDir];

  config.module.rules.push({
    test: /\.svg$/i,
    include: [AppSourceDir],
    use: [svgLoader]
  });
  return config;
};

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: (config) => {
    const merged = merge(common, config);
    const svgFixed = replaceSvgRule(config);
    return merged;
  }
};
