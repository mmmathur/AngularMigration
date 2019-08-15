/* eslint-disable vars-on-top, no-var, import/no-extraneous-dependencies */

var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');
var Visualizer = require('webpack-visualizer-plugin');
var webpack = require('webpack');
var config = {
  entry: {
    'ui-client-app-shell': './app-shell/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },
  optimization: 
  {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'client')],
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)fesm5/, path.join(__dirname, './client')),
    new LodashModuleReplacementPlugin(),
    new Visualizer(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer
        ]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
            'babel-loader',
            {
                loader: 'ts-loader'
            },
            'angular2-template-loader',
            'angular-router-loader'
        ],
        exclude: [/node_modules/]
    },
    {
      // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
      // Removing this will cause deprecation warnings to appear.
      test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
      parser: { system: true },
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'ng-annotate-loader'
      }
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.css/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    },
    {
      test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)/,
      use: {
        loader: 'url-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader?minimize=false'
        },
      },
      {
        test: /node_modules(\/|\\)globalize/,
        use: {
          loader: 'imports?define=>false'
        }
        
      },
      {
        test: /node_modules(\/|\\)cldrjs/,
        use: {
          loader: 'imports?define=>false'
        }
      }
    ]
  }
};

module.exports = config;
