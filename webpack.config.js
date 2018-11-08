/**
 * Created by ed on 06.04.17.
 */

'use strict';

var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: "production",
    entry: './app/index.js',
    output: {
        path: __dirname,
        filename: './public/static/bundle.js'
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
                                minimize: true
                            }
                    },
                    {
                        loader: "sass-loader",
                        options:
                            {
                                minimize: true
                            }
                    }
                ]
            },
        ]
    },
    externals: {
        fs: 'fs',
    },
    plugins: [
        new UglifyJSPlugin(),
    ],
    performance : {
        hints : false
    },
};
