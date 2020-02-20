const Path = require('path');
const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const defaultBaseName = '/';
const defaultEntryPoint = '../src/index.js';

const FAVICONS_PATH =
  process.env.KATASTER_PATH != null
    ? '../src/pages/KatasterKI/favicons'
    : '../favicons';

module.exports = {
  entry: {
    app: Path.resolve(__dirname, process.env.ENTRY_POINT || defaultEntryPoint)
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
    publicPath: process.env.BASE_NAME || defaultBaseName
  },
  plugins: [
    new CleanWebpackPlugin(),
    // copy data folder to make it available in redux loadData action
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public/markdown'), to: 'markdown' },
      { from: Path.resolve(__dirname, '../_redirects') },
      { from: Path.resolve(__dirname, FAVICONS_PATH) },
      { from: Path.resolve(__dirname, '../public/data'), to: 'data' }
    ]),
    new Webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      CONFIG_ENV: 'dev',
      BASE_NAME: '/', // base name of router history
      KATASTER_PATH: '/strassencheck', // used as a base for the kataster app
      REGION_ENV: 'berlin',
      CYPRESS_BROWSER_WINDOW: null // position Cypress Chrome window e.g. "1920,1080;1920,0"
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '~': Path.resolve(__dirname, '../src'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.js$/,
        include: [
          Path.resolve(__dirname, '../src'),
          Path.resolve(__dirname, '../node_modules/tr46'),
          Path.resolve(__dirname, '../node_modules/webidl-conversions'),
          Path.resolve(__dirname, '../node_modules/whatwg-url'),
          Path.resolve(__dirname, '../node_modules/ky'),
          Path.resolve(__dirname, '../node_modules/d3-scale')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ],
        include: [Path.resolve(__dirname, '../src')]
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            exclude: /node_modules/,
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
          },
          {
            include: /node_modules/,
            use: {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]'
              }
            }
          }
        ]
      }
    ]
  }
};
