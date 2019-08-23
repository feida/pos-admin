/**
 * @author wxh on 2018/9/20
 * @copyright
 * @desc
 */

const qiniuModel = require('../../public/model/images/qiniu');

exports.qiniuUploadConfig = function (req, res, next) {

    qiniuModel.getQiniuOssUploadToken(function (err, token) {
        if(err){
            return next(err);
        }

        res.json({
            flag: "0000",
            msg: '',
            result: {
                host: qiniuModel.getQiniuOssBaseHost(),
                token: token
            }
        });
    });
};