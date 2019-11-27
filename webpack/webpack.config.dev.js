const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Autoprefixer = require('autoprefixer');

const common = require('./webpack.common.js');
const Config = require('../config.js');

const INDEX_HTML =
  process.env.KATASTER_PATH != null
    ? '../src/pages/KatasterKI/index_tsp.html'
    : '../src/index.html';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    publicPath: '/',
    clientLogLevel: 'silent'
  },
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      siteUrl: Config.devUrl,
      template: Path.resolve(__dirname, INDEX_HTML)
    }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public/lab'), to: 'lab' }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true
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
              plugins: (loader) => [Autoprefixer]
            }
          }
        ]
      }
    ]
  }
});
