/**
 * @author wxh on 2017/11/16
 * @copyright
 * @desc
 */


const moment = require('moment');

module.exports = function () {
    return function (req, res, next) {
        let start = Date.now();
        let end = res.end;

        if(req.method!= `HEAD`){
            res.end = function () {
                logger.info(req.method, req.path, Date.now() - start, `${moment().format('YYYY-MM-DD HH:mm:ss')}`);
                end.apply(res, arguments);
            };
        }
        next();
    };
};