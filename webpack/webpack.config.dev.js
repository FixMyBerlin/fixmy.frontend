const Autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const Path = require('path');
const Webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    clientLogLevel: 'silent',
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    overlay: true,
    publicPath: '/',
    progress: true,
    stats: 'minimal'
  },
  cache: true,
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      siteUrl: 'http://localhost:8080',
      title: 'FixMyBerlin DevServer',
      template: Path.resolve(__dirname, '../src/index.html')
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
          emitWarning: true,
          cache: true
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
