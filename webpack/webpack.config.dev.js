const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Autoprefixer = require('autoprefixer');

const common = require('./webpack.common.js');
const Config = require('../config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    publicPath: '/'
  },
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      siteUrl: Config.devUrl,
      template: Path.resolve(__dirname, '../src/index.html')
    }),
    new Webpack.EnvironmentPlugin(['NODE_ENV', 'CONFIG_ENV'])
    // new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          fix: true
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: (loader) => [
                Autoprefixer
              ]
            }
          }
        ]
      }
    ]
  }
});
