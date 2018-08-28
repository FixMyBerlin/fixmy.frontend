const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Autoprefixer = require('autoprefixer');

const common = require('./webpack.common.js');
const Config = require('../config.json');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: Path.resolve(__dirname, 'build'),
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      siteUrl: Config.devUrl,
      template: Path.resolve(__dirname, '../src/index.html')
    }),
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.ProvidePlugin({
      config: '~/../config.json'
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BABEL_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
