const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlCdnWebpackPlugin = require('../index');
const cdnConfig = require('./cdn.config');

module.exports = {
  mode: 'production',
  entry: { index: path.resolve(__dirname, '../src/index.js') },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new AddAssetHtmlCdnWebpackPlugin(true, cdnConfig)
  ]
};
