let webpackMerge = require('webpack-merge');
let path = require('path');
let fs=require('fs');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let commonConfig=require('./webpack.common');
module.exports=webpackMerge(commonConfig,{

    output:{
        path: path.join(process.cwd(), 'dist'),
        publicPath: 'http://192.168.66.10:8083/',    
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    devServer:{
        host:'192.168.66.10',
        stats: 'minimal',
        proxy:[
            {
                context:['/'],
                target:'http://172.18.2.241:8895/',
                changeOrigin:true,
                secure:false
            }
        ]
    }
})
//http://ci.fabigbig.com:8090/