/* eslint-disable vars-on-top, no-var, object-shorthand, prefer-template, no-else-return */

var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var uiContext = require('./server/ui-context');

var padEnd = require('lodash.padend');

var config = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    inline: true,
    quiet: true,
    proxy: {
      '/api/internal/*': 'http://localhost:3000/',
      '/ui/session-manager/*': 'http://localhost:3000/'
    }
  },
  output: {
    path: uiContext.baseHref
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'template.ejs',
      baseHref: uiContext.baseHref,
      turnBackURLPrefix: padEnd('', uiContext.baseHref ? (uiContext.baseHref.split("/").length - 2) * 3 : 0, '../'),
      title: 'Customer Servicing UI client',
      hash: true,
      chunks: ['ui-client-app-shell'],
      window: {
        uiContext
      }
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Your application is running at http://localhost:8080' + uiContext.baseHref]
      }
    }),
    new webpack.DefinePlugin({
      DEV_MODE: true
    })
  ]
};

module.exports = config;
