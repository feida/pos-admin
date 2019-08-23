/**
 * @author wxh on 2018/8/19
 * @copyright
 * @desc
 */
const moment = require('moment');
const async = require('async');

const administratorAdminModel = require('../../public/model/admin/administrator');

const roleAdminModel = require('../../public/model/admin/role');


/**
 *  @desc 创建新的管理员
 * */
exports.createNewAdministrator = function (req, res, next) {

    if (!req.body.admin_name) {
        return next(new BadRequestError('管理员名字为必填'));
    }

    if (!req.body.admin_password) {
        return next(new BadRequestError('管理员密码为必填'));
    }

    if (req.body.admin_roles && typeof req.body.admin_roles != `object`) {
        return next(new BadRequestError('admin_roles必须为数组'));
    }

    console.log(`----req.body.admin_mobile----`,req.body.admin_mobile)
    let administrator = {
        admin_name: req.body.admin_name ||`admin`,
        admin_password: req.body.admin_password||`123456`,
        admin_gender: req.body.admin_gender,
        admin_mobile: req.body.admin_mobile ||`13127538810`,
        admin_age: req.body.admin_age||18,
        web_sso: req.body.web_sso,
        admin_profile: req.body.admin_profile||``,
        admin_avatar: req.body.admin_avatar||`https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif`,
        full_name: req.body.full_name||`王晓辉`,
        admin_introduction: req.body.admin_introduction ||`我是后台用户`,
        admin_roles: req.body.admin_roles || []
    };

    administratorAdminModel.createNewAdministrator(administrator, function (err, admin_id) {
        if (err)  return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!admin_id,
                message: admin_id ? '创建管理员成功' : '创建管理员失败',
                admin_id: admin_id
            }
        });
    });
};

/**
 *  @desc 更新管理员
 * */
exports.updateAdministrator = function (req, res, next) {



    if (!req.body.id) return next(new BadRequestError('请传入管理员ID'));

    // if (!req.body.admin_gender) return next(new BadRequestError('请传入管理员性别'));
    //
    // if (!req.body.admin_mobile) return next(new BadRequestError('请传入管理员手机号码'));
    //
    // if (!req.body.admin_age) return next(new BadRequestError('请传入管理员年龄'));
    //
    // if (!req.body.web_sso) return next(new BadRequestError('请传入管理员是否单点登陆'));
    //
    // if (!req.body.full_name) return next(new BadRequestError('请传入管理员真实姓名'));
    //
    // if (!req.body.full_name) return next(new BadRequestError('请传入管理员真实姓名'));


    let administrator = {
        admin_gender: req.body.admin_gender,
        admin_mobile: req.body.admin_mobile ||`13127538810`,
        admin_age: req.body.admin_age||18,
        web_sso: req.body.web_sso,
        admin_avatar: req.body.admin_avatar||``,
        full_name: req.body.full_name||`王晓辉`,
        admin_introduction: req.body.admin_introduction ||`我是后台用户1111`
    };
    administratorAdminModel.updateAdministrator({_id: req.body.id},administrator, function (err, result) {
        if (err)  {
            return next(err);
        }

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: `更新管理员成功`,
            }
        });
    });
};



/**
 *  @desc 根据id更新用户角色
 * */
exports.updateSystemRoleBySystemId = function (req, res, next) {

    if (!req.body.id) {
        return next(new BadRequestError('请传入管理员ID'));
    }

    let id = req.body.id;
    let admin_roles = req.body.admin_roles;

    let update = {
        admin_roles: admin_roles,
        update_time: new Date()
    };

    administratorAdminModel.updateAdministrator(id, update,function (err, result) {
        if (err)  {
            return next(err);
        }
        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!result,
                message: !!result ? '更新管理员角色成功！' : '更新管理员角色失败！',
            }
        });
    });
};


/**
 *  @desc 获取管理员详情
 * */
exports.getAdministratorDetail = function (req, res, next) {
    let administratorId = req.query.admin_id || req.body.admin_id;

    if (!administratorId) {
        return next(new BadRequestError('请传入管理员ID'));
    }

    administratorAdminModel.getAdministratorDetail(administratorId, function (err, result) {
        if (err)  return next(err);

        let administrator = {
            id: result._id,
            admin_name: result.admin_name,
            admin_profile: result.admin_profile,
            admin_mobile: result.admin_mobile,
            admin_age: result.admin_age,
            admin_gender: result.admin_gender,
            avatar: result.admin_avatar,
            full_name : result.full_name,
            roles : result.admin_roles,
            introduction: result.admin_introduction ||`我是后台用户`,
        };

        res.json({
            flag: '0000',
            msg: '',
            result: administrator
        });
    });
};

/**
 *  @desc 根据token获取管理员详情
 * */
exports.getAdministratorDetailByToKen = function (req, res, next) {

    let admin_token = req.query.token || req.body.token;

    if (!admin_token) {
        return next(new BadRequestError('请传入管理员 token'));
    }

    administratorAdminModel.getAdministratorDetailByToken(admin_token, function (err, result) {
        if (err)  return next(err);

        if(!result) {
            return res.json({
                flag: '50008',
                msg: '非法的token请重新登陆！',
                result: {
                    ok: false,
                    message: '',
                }
            });
        }

        if (result.status == 0) {
            return res.json({
                flag: '50013',
                msg: '您的账户已经被锁定',
                result: {
                    ok: false,
                    message: '',
                }
            });
        }
        if (result.login_token.expire < `${moment().format('YYYY-MM-DD HH:mm:ss')}`) {
            return res.json({
                flag: '50013',
                msg: 'Token过期了',
                result: {
                    ok: false,
                    message: '',
                }
            });
        }

        let administrator = {
            ok: true,
            message: '',
            id: result._id,
            admin_name: result.admin_name,
            admin_profile: result.admin_profile,
            admin_mobile: result.admin_mobile,
            admin_age: result.admin_age,
            admin_gender: result.admin_gender,
            avatar: result.admin_avatar,
            name : result.full_name,
            roles_id : result.admin_roles,
            roles : [],
            perms : [],
            introduction: result.admin_introduction ||`我是后台用户`,
        };
        if(result.admin_roles.length == 0 ) {
            return res.json({
                flag: '0000',
                msg: '',
                result: administrator
            });
        }
        async.eachLimit(result.admin_roles, 1, function (item, ab) {
            roleAdminModel.getPermByRoleIdList({"role_id":item},(err,rvle)=>{
                if (err)  return ab(err);
                administrator.roles = administrator.roles.concat(rvle.roleArr);
                administrator.perms = administrator.perms.concat(rvle.permArr);
                ab()
            });
        }, function (err) {
            if (err)  return next(err);
            res.json({
                flag: '0000',
                msg: '',
                result: administrator
            });
        });


    });
};

/**
 *  @desc 删除管理员
 * */
exports.removeAdministrator = function (req, res, next) {
    let administratorId = req.query.id;
    let status = req.query.status;

    if (!administratorId) {
        return next(new BadRequestError('请传入管理员id'));
    }

    if (!status) {
        return next(new BadRequestError('status is not null'));
    }


    let update = {
        status: status,
        update_time: new Date()
    };

    administratorAdminModel.updateAdministrator(administratorId,update, function (err, success) {
        if (err)   {
            return next(err);
        }

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!success,
                message: !!success ? `删除管理员成功！` : '删除管理员失败！',
            }
        });
    });
};

/**
 *  @desc 重置密码
 * */
exports.resetPassword = function (req, res, next) {

    if (!req.body.admin_name) {
        return next(new BadRequestError('请传入用户名'));
    }

    if (!req.body.oldPassword) {
        return next(new BadRequestError('请传入旧密码'));
    }

    if (!req.body.newPassword) {
        return next(new BadRequestError('请传入新密码'));
    }

    if (req.body.oldPassword === req.body.newPassword) {
        return next(new BadRequestError('新旧密码相同'));
    }

    let name = req.body.admin_name;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    administratorAdminModel.resetPassword(name, oldPassword, newPassword, function (err, result) {
        if (err) {
            return next(err);
        }

        if (result === '密码错误') {
            return next(new BadRequestError(result))
        }

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!result,
                message: !!result ? null : '重置密码失败',
            }
        });
    });
};


/**
 *  @desc 获取用户总量
 * */
exports.getSystemTotal = function (req, res, next) {

    async.parallel({
        getSystemNormalTotal: function(cb) {
            administratorAdminModel.getSystemTotal({status:1}, cb);
        },
        getSystemAbnormalTotal: function(cb) {
            administratorAdminModel.getSystemTotal({status:0}, cb);
        }
    }, function (err, results) {
        if (err) return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok:true,
                message: ``,
                data: {
                    normal_total:results.getSystemNormalTotal,
                    abnormal_total:results.getSystemAbnormalTotal
                },
            }
        });
    })
};


/**
 *  @desc 获取用户列表
 * */
exports.getSystemList = function (req, res, next) {

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    let condition = {};

    if(req.query.content){
        condition = {
            $or : [
                {admin_name : new RegExp(req.query.content, 'i')},
                {admin_mobile : new RegExp(req.query.content, 'i')},
                {full_name : new RegExp(req.query.content, 'i')},
            ]
        }
    }

    async.parallel({
        count: function(cb) {
            administratorAdminModel.getSystemTotal(condition, cb);
        },
        list: function(cb) {
            administratorAdminModel.getSystemList(condition,pageSkip,pageSize,cb)
        }
    }, function (err, results) {
        if (err) return next(err);

        if(results.length == 0 ) {
            return res.json({
                flag: '0000',
                msg: '',
                result: {
                    ok:true,
                    message: ``,
                    data: {
                        count:results.count,
                        list:results.list
                    },
                }
            });
        }
        let resultList = [];

        async.eachLimit(results.list, 1, function (item, cb) {
            roleAdminModel.getRoleInfo({'_id':{ '$in':item.admin_roles}},(err,rvle)=>{
                if(err) return cb()(err);
                let temp={};
                temp['login_token']     = item['login_token'];
                temp['admin_roles']     = item['admin_roles'];
                temp['_id']             = item['_id'];
                temp['status']          = item['status'];
                temp['admin_name']      = item['admin_name'];
                temp['full_name']       = item['full_name'];
                temp['admin_gender']    = item['admin_gender'];
                temp['admin_mobile']    = item['admin_mobile'];
                temp['admin_age']       = item['admin_age'];
                temp['web_sso']         = item['web_sso'];
                temp['admin_avatar']    = item['admin_avatar'];
                temp['create_time']     = item['create_time'];
                temp['update_time']     = item['update_time'];
                temp['role_list']       = rvle;
                temp['online_state']    = onlineUser.hasOwnProperty(item['_id']);

                resultList.push(temp);
                cb()
            });
        },function (err) {

            if (err) return next(err);
            res.json({
                flag: '0000',
                msg: '',
                result: {
                    ok: true,
                    message: ``,
                    data: {
                        count: results.count,
                        list: resultList
                    },
                }
            });
        });
    })


};