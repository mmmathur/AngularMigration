/* eslint-disable vars-on-top, no-var, import/no-extraneous-dependencies */

var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');
var Visualizer = require('webpack-visualizer-plugin');

var config = {
  entry: {
    'ngMigration': './app-shell/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },
  resolve: {
    root: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'client')],
    extensions: ['.ts', '.js', '']
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new Visualizer()
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'ng-annotate-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          compact: false
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)/,
        loader: 'url-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader?minimize=false'
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      },
      {
        test: /node_modules(\/|\\)globalize/,
        loader: 'imports?define=>false'
      },
      {
        test: /node_modules(\/|\\)cldrjs/,
        loader: 'imports?define=>false'
      }
    ]
  },
  postcss: [autoprefixer],
  resolveLoader: {
    root: path.resolve(__dirname, 'node_modules')
  }
};

module.exports = config;
