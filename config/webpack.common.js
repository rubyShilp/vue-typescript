let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    entry:{
        'main': ['babel-polyfill','./scripts/main.ts','./scripts/polyfill.ts']
    },
    context: path.join(process.cwd(), 'app'),
    resolve:{
        modules: [
            'node_modules',
            path.resolve(process.cwd(), 'app')
        ],
        // alias: {
        //     'vue':path.resolve(process.cwd(), './node_modules/vue/dist/vue.min.js'),
        //     'vue-router':path.resolve(process.cwd(), './node_modules/vue-router/dist/vue-router.min.js'),
        //     'vuex':path.resolve(process.cwd(), './node_modules/vuex/dist/vuex.min.js'),
        //     'md5':path.resolve(process.cwd(), './node_modules/md5/md5.js')
        // },
        extensions: ['.vue','.js','.ts','.less','.css']
    },
    module:{
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.ts?$/,
                use: ['babel-loader','ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|swf)$/,
                use: 'url-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{loader:'css-loader'},{loader:'less-loader'}]
                })
            },
            {
                test: /\.css$/,
                include: path.resolve(process.cwd(), 'app', 'scripts'),
                loaders: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                exclude: path.resolve(process.cwd(), 'app', 'scripts'),
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader:'css-loader',
                            options:{
                                minimize: true //css压缩
                            }
                        }]
                })
            }
        ]
    },
    plugins:[
        new webpack.ProgressPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].bundle[hash:7].css'),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery':'jquery'
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'main',
            filename:"main.bundle[hash:7].js"
        }),
        new HtmlWebpackPlugin({ 
            template: './index.html',
            favicon: './favicon.ico',
            chunks:['main'],
            minimize: true
        })
    ]
}