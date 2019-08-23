/**
 * @author wxh on 2017/11/16
 * @copyright
 * @desc
 */
const moment = require('moment');

const administratorModel = require('../../public/model/admin/administrator');


module.exports = function () {
    return function (req, res, next) {

        req.session = {};

        let token = req.get('Pos-Admin-Token');

        token = token ? token.trim() : null;

        //没有token未登录,根据业务修改未登录操作
        if(!token){
            return next();
        }

        administratorModel.getAdministratorDetailByToken(token, function (err, session) {
            if(err){
                logger.error(err);
                return next();
            }
            if(!session) {
                return res.json({
                    flag: '50008',
                    msg: '你的账户已在别处登陆！',
                    result: {
                        ok: false,
                        message: '',
                    }
                });
            }

            req.session = session;

            if (session.status == 0) {
                return res.json({
                    flag: '50013',
                    msg: '您的账户已经被锁定',
                    result: {
                        ok: false,
                        message: '',
                    }
                });
            }
            if (session.login_token.expire < `${moment().format('YYYY-MM-DD HH:mm:ss')}`) {
                return res.json({
                    flag: '50013',
                    msg: 'Token过期了',
                    result: {
                        ok: false,
                        message: '',
                    }
                });
            }
            next();

        });
    }
};