/* eslint-disable vars-on-top, no-var */

var validate = require('webpack-validator');
var Joi = require('webpack-validator').Joi;
var mkdirp = require('mkdirp');
var merge = require('webpack-merge');
var commonConfig = require('./webpack.common.config');
var devConfig = require('./webpack.dev.config');
var prodConfig = require('./webpack.prod.config');

// webpack-validate barks at missing dist folder when validating config
mkdirp.sync('./dist');

var config;

var target = process.env.npm_lifecycle_event;
switch (target) {
  case 'build:dev':
    config = merge(commonConfig, devConfig);
    break;
  case 'build:prod':
    config = merge(commonConfig, prodConfig);
    break;
  default:
    console.log('unknown script target: ', target, ' running with dev config');
    config = merge(commonConfig, devConfig);
}

var customSchema = Joi.object({
  lessLoader: Joi.any()
});

module.exports = validate(config, { schemaExtension: customSchema });
