/**
 * @author wxh on 2018/9/20
 * @copyright
 * @desc
 */

const uploadImage = require('../../controller/upload/image.js');

exports.map = function(app){
    app.get('/upload/qiniu/token',  uploadImage.qiniuUploadConfig);
};