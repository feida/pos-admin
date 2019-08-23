/**
 * @author wxh on 2017/11/22
 * @copyright
 * @desc
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');




const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const resolve = function (p) {
    return path.resolve(__dirname, p);
};
const env = `"${process.env.WEBPACK=="dev"?"development":"production"}"`;

function readFileList(path, filesList) {
  var files = fs.readdirSync(path);
  files.forEach(function (itm, index) {
    var stat = fs.statSync(path + itm);
    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + itm + "/", filesList)
    } else {

      var obj = {};//定义一个对象存放文件的路径和名字
      obj.path = path + itm;//路径
      //obj.filename = itm//名字
      filesList.push(obj);
    }
  })
}

var getFiles = {
  //获取文件夹下的所有文件
  getFileList: function (path) {
    var filesList = [];
    readFileList(path, filesList);
    return filesList;
  },

};
let arr = getFiles.getFileList("./view/pages/");
let otherPlugins = []
arr.forEach(function (arg) {
  let tempFilename = arg.path.substring(7)
  let HtmlWebpackPluginArr = new HtmlWebpackPlugin({
      filename:tempFilename,//模板文件
      template: arg.path,//目标文件
      inject:false,//资源加入到底部
  })
  otherPlugins.push(HtmlWebpackPluginArr)
})
const plugins = function (htmlPath) {

    let htmlPlugins = [];

    let conf = {
        filename: 'index.html',
        template: htmlPath,
        inject: true,
        favicon: resolve('favicon.ico'),
    };

    htmlPlugins.push(new HtmlWebpackPlugin(conf));

    let otherPlugins = [];

    let vendor = new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'js/vendor/vendor.js',
        minChunks: function (module, count) {
            return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0;
        }
    });

    let manifest = new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        filename: 'js/vendor/manifest.js',
        chunks: ['vendor']
    });

    let css = new ExtractTextPlugin({
        filename: 'css/[name].css'
    });

    let jquery = new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    });
    let hot = new webpack.HotModuleReplacementPlugin();
    let process = new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: env
        }
    });
    otherPlugins.push(vendor);
    otherPlugins.push(manifest);
    otherPlugins.push(css);
    otherPlugins.push(jquery);
    otherPlugins.push(hot);
    otherPlugins.push(process);

    return htmlPlugins.concat(otherPlugins);
};

module.exports = {
    entry: {
        // main: './view/main.js'
      main: ['webpack-hot-middleware/client?noInfo=true&reload=true','./view/main.js']
    },
    output: {
        path: resolve('./static'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: "js/[id].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue: 'vue/dist/vue.js',
            src: resolve('./view'),
            // theme: 'element-ui/lib/theme-default/index.css',
            // assets: resolve('./view/assets'),
            // awesome: 'font-awesome/css/font-awesome.css',
            // components: resolve('./view/components'),
            '@': resolve('./view'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        minimize: true,
                                        sourceMap: true
                                    }
                                }
                            ],
                            fallback: 'vue-style-loader'
                        }),
                        less: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        minimize: true,
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: 'less-loader',
                                    options:  {
                                        sourceMap: true
                                    }
                                }
                            ],
                            fallback: 'vue-style-loader'
                        }),

                        scss: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        minimize: true,
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: 'sass-loader',
                                    options:  {
                                        sourceMap: true
                                    }
                                }
                            ],
                            fallback: 'vue-style-loader'
                        }),

                        sass: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        minimize: true,
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: 'sass-loader?indentedSyntax',
                                    options:  {
                                        sourceMap: true
                                    }
                                }
                            ],
                            fallback: 'vue-style-loader'
                        }),
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                    filename: '[name].css',
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                    filename: '[name].css',
                })
            },
              {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ["css-loader", "sass-loader"  ],
                  filename: '[name].css',
                })
              },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('./view')]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [resolve('./view/icons')],
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: [resolve('./view/icons')],
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name:  'fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
      ...plugins('./view/index.html'),
      ...otherPlugins
    ]
};
