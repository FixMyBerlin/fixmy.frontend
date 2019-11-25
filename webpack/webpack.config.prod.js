const Webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Autoprefixer = require('autoprefixer');

const common = require('./webpack.common.js');
const Config = require('../config.js');

const INDEX_HTML =
  process.env.KATASTER_PATH.length === 0
    ? '../src/pages/KatasterKI/index_tsp.html'
    : '../src/index.html';

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    },
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      siteUrl: Config.prodUrl,
      template: INDEX_HTML,
      minify: false
    }),
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new Webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: () => [Autoprefixer]
            }
          }
        ]
      }
    ]
  }
});
