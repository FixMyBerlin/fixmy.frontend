const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const Path = require('path');
const Autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Config = require('../config.json');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /react/,
          name: "vendor",
          chunks: "initial",
          minSize: 1,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BABEL_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      siteUrl: Config.prodUrl,
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyURLs: true
      }
    }),
    new ExtractTextPlugin({ filename: 'bundle.css' }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    // compiling mode “scope hoisting”
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new Webpack.ProvidePlugin({
      config: '~/../config.json'
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(Object.assign({
          fallback: 'style-loader',
          use: [
            'css-loader'
          ]
        }))
      },
      {
        test: /\.styl$/i,
        use: ExtractTextPlugin.extract(Object.assign({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: (loader) => [
                  Autoprefixer
                ]
              }
            },
            'stylus-loader'
          ]
        }))
      }
    ]
  }
});
