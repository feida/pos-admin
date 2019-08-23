/**
 * @author wxh on 2017/11/16
 * @copyright
 * @desc
 */

exports.notFoundHandler = function () {
    return function (req, res, next) {
        next(new NotFoundError(req.method + ':' + req.path));
    }
};

exports.serverErrorHandler = function () {


    return function (err, req, res, next) {
        err.code = ~~err.code;

        if (!err.code) {
            err.code = 500;
        }

        if(err.code < 500){
            logger.error(err.message);
        }else{
            logger.error(err.stack);
        }

        if (!err.message) {
            err.message = 'server error, please try again later';
        }

        res.status(200).json({
            flag: '0' + err.code,
            msg: err.message,
            result: {
                ok: false,
                failed_message: null,
                success_message: null,
            }
        });
    }
};