/* eslint-disable vars-on-top, no-var */

var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');
var AssetsPlugin = require('assets-webpack-plugin');

var config = {
  output: {
    filename: '[name].[hash].bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].bundle.css'}
      ),
    new webpack.DefinePlugin({
      DEV_MODE: false
    }),
    new AssetsPlugin({ path: path.join(__dirname, 'dist') })
  ]
};

module.exports = config;
