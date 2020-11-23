require('dotenv').config({ path: '../' });
const path = require('path');

const AppSourceDir = path.resolve(__dirname, '..', 'src');

/**
 * Replace Storybook's malfuncioning SVG rule with our working one
 *
 * @param {Object} config with non-working SVG rule
 */
const replaceSvgRule = (config) => {
  const svgRule = config.module.rules.find((rule) =>
    'test.svg'.match(rule.test)
  );
  svgRule.exclude = [AppSourceDir];

  config.module.rules.push({
    test: /\.svg$/i,
    include: [AppSourceDir],
    use: [
      'babel-loader',
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [{ cleanupIDs: false }, { removeViewBox: false }],
          },
        },
      },
    ],
  });
};

const configureFileLoader = (config) => {
  config.module.rules.push({
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
      },
    },
  });
};

const fixMapboxBug = (config) => {
  // See https://github.com/mapbox/mapbox-gl-draw/issues/626
  config.node = { ...config.node, fs: 'empty' };
};

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  webpackFinal: (config) => {
    config.resolve.alias['~'] = AppSourceDir;
    replaceSvgRule(config);
    configureFileLoader(config);
    fixMapboxBug(config);
    return config;
  },
};
