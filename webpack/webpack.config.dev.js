const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const Path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ProgressPlugin = require('webpack').ProgressPlugin;

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: '8080',
    hot: true,
    client: {
      logging: 'none',
      overlay: false,
      progress: true,
    },
    devMiddleware: {
      publicPath: '/',
      stats: 'minimal',
    },
  },
  cache: true,
  output: {
    chunkFilename: 'js/[name].chunk.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      siteUrl: 'http://localhost:8080',
      title: 'FixMyBerlin DevServer',
      template: Path.resolve(__dirname, '../src/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: Path.resolve(__dirname, '../public/lab'), to: 'lab' }],
    }),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new ESLintPlugin(),
    new ProgressPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
        ],
      },
    ],
  },
});
