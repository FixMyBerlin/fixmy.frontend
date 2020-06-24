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
            plugins: [{ cleanupIDs: false }, { removeViewBox: false }]
          }
        }
      }
    ]
  });
};

const configureTypeScript = (config) => {
  config.resolve.extensions.push('.ts', '.tsx');
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
    include: [AppSourceDir]
  });
};

const configureFileLoader = (config) => {
  config.module.rules.push({
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]'
      }
    }
  });
};

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: (config) => {
    config.resolve.alias['~'] = AppSourceDir;
    configureTypeScript(config);
    replaceSvgRule(config);
    configureFileLoader(config);
    return config;
  }
};
