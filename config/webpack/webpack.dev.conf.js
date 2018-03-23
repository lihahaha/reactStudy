const webpack = require('webpack');//引入webpack
const opn = require('opn');//open 浏览器
const merge = require('webpack-merge');//webpack配置文件合并
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');//基础配置
const webpackFile = require('./webpack.file.conf');//路径配置

let config = merge(baseWebpackConfig, {
    output:{
        path:path.resolve(webpackFile.devDirectory),
        filename:'js/[name].js',
        chunkFilename:'js/[name]-[id].js',
        publicPath:''
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:JSON.stringify('development'),
            }
        }),
        /*设置热更新*/
        new webpack.HotModuleReplacementPlugin(),
        /* common 业务公共代码，vendor引入第三方 */
        new webpack.optimize.CommonsChunkPlugin({
            name: ["common", "vendor"],
        }),
        /* 防止 vendor hash 变化 */
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
    ],
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:[
                    'babel-loader',
                    'cache-loader'
                ],
                include:[
                    path.resolve(__dirname,'../../app'),
                    path.resolve(__dirname,'../../entryBuild')
                ],
                exclude:[
                    path.resolve(__dirname,'../../node_modules')
                ]
            },{
                test: /\.(css|pcss)$/,
                loader: 'style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap',
                exclude: /node_modules/
            },{
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=' + webpackFile.resource + '/'
            }
        ]
    },
    devServer:{
        host:'127.0.0.1',
        port:'8080',
        hot:true,
        inline:true,
        contentBase:path.resolve(webpackFile.devDirectory),
        historyApiFallback:true,
        disableHostCheck:true,
        proxy:[{
            context:['./api/**','/u/**'],
            target:'http://192.168.12.100:8080',
            secure:false
        }],
        after(){
            opn('http://localhost:'+this.port);
        }

    }
});
module.exports = config;