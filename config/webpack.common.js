let webpack = require('webpack');
let path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
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
    performance: {
        hints: false
    },
    optimization:{
        splitChunks:{
            chunks: "all", 
            cacheGroups:{
                vendor:{
                    chunks:'all',
                    test:"/node_modules\/(.*)\.js/",
                    name:'vendor'
                }
            }
        }
    },
    plugins:[
        new VueLoaderPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].bundle[hash:7].css'),
        new HtmlWebpackPlugin({ 
            template: './index.html',
            favicon: './favicon.ico',
            filename:'index.html',
            hash:true,//防止缓存
            minify:{
                removeAttributeQuotes:true//压缩 去掉引号
            }
        })
    ]
}