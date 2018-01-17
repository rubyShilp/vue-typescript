var webpack = require('webpack');
let path = require('path');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
    output:{
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/',    
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
        })
    ]
});