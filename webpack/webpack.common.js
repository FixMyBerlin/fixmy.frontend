const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: [require.resolve('./polyfills'), Path.resolve(__dirname, '../src/index.js')],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename:  'js/[name].js',
    publicPath: '/',
    chunkFilename : `[name].js`,
  },
  plugins: [
    new CleanWebpackPlugin(['build'], { root: Path.resolve(__dirname, '..') }),
    // copy data fo1lder to make it available in redux loadData action
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public/markdown'), to: 'markdown' },
      { from: Path.resolve(__dirname, '../_redirects') },
      { from: Path.resolve(__dirname, '../favicons') },
      { from: Path.resolve(__dirname, '../public/data'), to: 'data' }
    ])
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
      'ky': Path.resolve(__dirname, '../src/utils/ky.js')
    }
  },
  module: {
    rules: [
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
        exclude: /node_modules/,
        use: ['babel-loader', {
          loader: 'react-svg-loader',
          options: {
            svgo: {
              plugins: [
                { cleanupIDs: false }
              ]
            }
          }
        }]
      },
      {
        test: /node_modules\/(.*)\.svg$/,
        use: 'file-loader'
      }
    ]
  }
};
