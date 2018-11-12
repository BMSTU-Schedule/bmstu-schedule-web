/**
 * Created by ed on 06.04.17.
 */

'use strict';

var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './app/index.js',
  output: {
    path: __dirname,
    filename: './public/static/bundle.js',
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, 'config'),
      app: path.resolve(__dirname, 'app'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(s)?css$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options:
              {
                minimize: true,
              },
          },
          {
            loader: 'sass-loader',
            options:
              {
                minimize: true,
              },
          },
        ],
      },
    ],
  },
  externals: {
    fs: 'fs',
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
  performance: {
    hints: false,
  },
};
