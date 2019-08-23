/**
 * @author wxh on 2017/11/22
 * @copyright
 * @desc
 */

const webpackDevMiddleware = require('webpack-dev-middleware');


module.exports = function (compiler, webpackConfig) {
    return webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    });
};