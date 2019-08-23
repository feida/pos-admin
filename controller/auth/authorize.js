/**
 * @author wxh on 2018/8/19
 * @copyright
 * @desc
 */
const uuid = require('uuid/v4');
const async = require('async');
const moment = require('moment');


const adminModel = require('../../public/model/admin/administrator');
const recordModel = require('../../public/model/admin/record');

const authorizeModel = require('../../public/model/admin/authorize');


/**
 * 后台用户登录
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.login = function (req, res, next) {

    let username = req.body.username;
    let password = req.body.password;

    if (!username) return next(new BadRequestError('username is null'));

    if (!password) return next(new BadRequestError('password is null'));


    async.parallel({
        adminUser: (done)=>{
            adminModel.getAdminUser(username, password, done)
        },
        mobileUser: (done)=>{
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(username))) return done();

            adminModel.getMobileUser(username, password,  done)
        },
    },(err, results)=>{
        if (err)   return next(err);

        if(!results.adminUser && !results.mobileUser) {
            return res.json({
                flag: '0000',
                msg: '',
                result: {
                    ok: false,
                    message: '登录失败',
                }
            });
        }
        let user = results.adminUser || results.mobileUser;
        if (user.status == 0) {
            return res.json({
                flag: '0000',
                msg: '',
                result: {
                    ok: false,
                    message: '您的账户已经被锁定',
                }
            });
        }

        let userId = user._id;
        let token = uuid();
        let expire = `${moment().add(30,'days').format('YYYY-MM-DD HH:mm:ss')}`;    //有效期为30天

        async.parallel({
            updateLoginToken: function(cb) {
                if(user.web_sso){   //单点登陆
                    adminModel.updateLoginToken(userId, token, expire, cb);
                }else {
                    if(user.login_token && user.login_token.expire > new Date()){
                        token = user.login_token.token;
                        cb()
                    }else {
                        adminModel.updateLoginToken(userId, token, expire, cb);
                    }
                }
            }
        }, function (err, results) {
            if(err)  return next(err);
            user.action = `登陆`;
            recordModel.createAdministratorRecord(user);
            res.json({
                flag: '0000',
                msg: '',
                result: {
                    ok: true,
                    message: '',
                    userId:userId,
                    token: token,
                    avatar: user.admin_avatar || '',
                    user_name: user.admin_name,
                    name: user.full_name,
                    roles: user.admin_roles,
                    introduction: user.admin_introduction ||`我是后台用户`
                }
            });
        });

    });


    // adminModel.getAdminUser(username, password, function (err, user) {
    //     if (err)   return next(err);
    //
    //     if (!user) {
    //         adminModel.getMobileUser(username, password,  (err, mobile_user)=> {
    //             if (err)   return next(err);
    //             console.log(`----mobile_user-----`,mobile_user)
    //             return res.json({
    //                 flag: '0000',
    //                 msg: '',
    //                 result: {
    //                     ok: false,
    //                     message: '登录失败',
    //                 }
    //             });
    //
    //         });
    //     }else {
    //         if (user.status == 0) {
    //             return res.json({
    //                 flag: '0000',
    //                 msg: '',
    //                 result: {
    //                     ok: false,
    //                     message: '您的账户已经被锁定',
    //                 }
    //             });
    //         }
    //
    //         let userId = user._id;
    //         let token = uuid();
    //         let expire = `${moment().add(30,'days').format('YYYY-MM-DD HH:mm:ss')}`;    //有效期为30天
    //
    //         async.parallel({
    //             updateLoginToken: function(cb) {
    //                 if(user.web_sso){   //单点登陆
    //                     adminModel.updateLoginToken(userId, token, expire, cb);
    //                 }else {
    //                     if(user.login_token && user.login_token.expire > new Date()){
    //                         token = user.login_token.token;
    //                         cb()
    //                     }else {
    //                         adminModel.updateLoginToken(userId, token, expire, cb);
    //                     }
    //                 }
    //             }
    //         }, function (err, results) {
    //             if(err)  return next(err);
    //             user.action = `登陆`;
    //             recordModel.createAdministratorRecord(user);
    //             res.json({
    //                 flag: '0000',
    //                 msg: '',
    //                 result: {
    //                     ok: true,
    //                     message: '',
    //                     token: token,
    //                     avatar: user.admin_avatar || '',
    //                     user_name: user.admin_name,
    //                     name: user.full_name,
    //                     roles: user.admin_roles,
    //                     introduction: user.admin_introduction ||`我是后台用户`
    //                 }
    //             });
    //         });
    //     }
    // });
};


/*
 * @desc 退出登录
 * */
exports.logout = function (req,res,next) {

    return res.json({
        flag: '0000',
        msg: '',
        result: {
            ok: true,
            message: '退出成功！',
        }
    })
};


/*
 * @desc 获取登陆验证码
 * */
exports.getMobileVerificationCode = function (req,res,next) {

    let username = req.query.username;

    if (!username) return next(new BadRequestError('username is null'));

    if(!(/^1(3|4|5|7|8)\d{9}$/.test(username))) return next(new BadRequestError('请填写正确的手机号码'));

    authorizeModel.storageMobileVerificationCode(username,(err,result)=>{

        if(err)  return next(err);

        return res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: result.ok,
                message: result.ok?'获取验证码成功,有效时间5分钟！':result.msg,
                date:{
                    mobile:username,
                    code:+result.code,
                    creation_time:result.creation_time,
                }
            }
        })
    })


};