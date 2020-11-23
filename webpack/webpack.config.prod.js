require('dotenv').config();

const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common.js');

let siteUrl;
let title;
if (process.env.REGION === 'aachen') {
  siteUrl = 'https://radbuegel-aachen.de';
  title = 'Radbügel für Aachen';
} else if (process.env.REGION === 'eichwalde') {
  siteUrl = 'https://zesplus.de';
  title = 'ZESplus';
} else {
  siteUrl = 'https://fixmyberlin.de';
  title = 'FixMyBerlin';
}

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
      siteUrl,
      title,
      template: Path.resolve(__dirname, '../src/index.html'),
      minify: false
    }),
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new Webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000
    })
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
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          }
        ]
      }
    ]
  }
});
