/**
 * @author wxh on 2018/9/11
 * @copyright
 * @desc
 */

const roleAdminModel = require('../../public/model/admin/role');
const permAdminModel = require('../../public/model/admin/perm');
const async = require('async');



/**
 *  @desc 创建新的角色
 * */
exports.createNewRole = function (req, res, next) {

    if (!req.body.rname) {
        return next(new BadRequestError('角色名为必填'));
    }

    if (!req.body.rval) {
        return next(new BadRequestError('角色值，用于权限判断为必填'));
    }

    let role = {
        rname: req.body.rname,
        rdesc: req.body.rdesc || '',
        rval: req.body.rval,
    };

    roleAdminModel.createNewRole(role, function (err, role_id) {
        if (err) return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!role_id,
                message: role_id ? '创建角色成功' : '创建角色失败',
                role_id: role_id
            }
        });
    });
};

/**
 *  @desc 获取角色列表
 * */
exports.getRoleList = function (req, res, next) {

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    let condition = {};

    if (req.query.content) {

        condition = {
            $or: [
                {rname: new RegExp(req.query.content, 'i')},
                {rval: new RegExp(req.query.content, 'i')},
            ]
        }
    }

    async.parallel({
        count: function (cb) {
            roleAdminModel.getRoleTotal(condition, cb);
        },
        list: function (cb) {
            roleAdminModel.getRoleList(condition, pageSkip, pageSize, cb)
        }
    }, function (err, results) {
        if (err) return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: ``,
                data: {
                    count: results.count,
                    list: results.list
                },
            }
        });
    })
};



/**
 *  @desc 更新用户角色
 * */
exports.updateSystemRoleBySystemId = function (req, res, next) {

    if (!req.body.rname) {
        return next(new BadRequestError('角色名为必填'));
    }

    if (!req.body.rval) {
        return next(new BadRequestError('角色值，用于权限判断为必填'));
    }

    let role = {
        rname: req.body.rname,
        rdesc: req.body.rdesc || '',
        rval: req.body.rval,
    };

    roleAdminModel.createNewRole(role, function (err, role_id) {
        if (err) return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!role_id,
                message: role_id ? '创建角色成功' : '创建角色失败',
                role_id: role_id
            }
        });
    });
};


/**
 *  @desc 获取角色权限列表
 * */
exports.getPermsListByRoleId = function (req, res, next) {

    if (!req.query.role_id) {
        return next(new BadRequestError('角色id为必填'));
    }
    let role_id = req.query.role_id;

    async.parallel({
        role: function (cb) {
            roleAdminModel.getRoleByRoleId({_id:role_id},cb)
        },
        menu: function (cb) {
            roleAdminModel.getPermsByRoleId({role_id:role_id,perm_type:1},cb)
        },
        btn: function (cb) {
            roleAdminModel.getPermsByRoleId({role_id:role_id,perm_type:2}, cb)
        },
        api: function (cb) {
            roleAdminModel.getPermsByRoleId({role_id:role_id,perm_type:3}, cb)
        },
        newMenu: function (cb) {
            roleAdminModel.getPermsByRoleId({role_id:role_id,perm_type:1}, (err,revle)=>{
                if(err) cb(err);
                let arr = [];
                async.eachLimit(revle, 1, function (item, ef) {
                    permAdminModel.getPermByPval({pval:item.perm_val},(err,reloe)=>{
                        if(err) ef(err);
                        if(!reloe) return ef();
                        arr.push({
                            pval:reloe.pval,
                            pname:reloe.pname,
                            parent:reloe.parent,
                            leaf:reloe.leaf
                        });
                        ef()
                    });
                },function (err) {
                    if(err) cb(err);
                    cb(null,arr)
                });
            })
        },
    }, function (err, results) {
        if (err) return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: ``,
                data: {
                    role: {
                        "_id":  results.role._id,
                        "rid":  results.role._id,
                        "rname": results.role.rname,
                        "rdesc": results.role.rdesc,
                        "rval": results.role.rval
                    },
                    menuPvals:  results.menu.map((item)=> item.perm_val),
                    btnPvals: results.btn.map((item)=> item.perm_val),
                    apiPvals: results.api.map((item)=> item.perm_val),
                    newMenu: results.newMenu
                }
            }
        });
    })
};



/**
 *  @desc 根据角色Id修改绑定的权限
 * */
exports.updateRolePermsByRoleId = function (req, res, next) {

    if (!req.body.role_id) {
        return next(new BadRequestError('角色Id为必填'));
    }
    let condition = {
        role_id:req.body.role_id,
        perm_type:req.body.ptype,
    };
    let pvals = req.body.pvals;
    roleAdminModel.removePermsByRoleId(condition,function (err, role_id) {
        if (err) return next(err);

        if(pvals.length == 0 ) {
            return res.json({
                flag: '0000',
                msg: '',
                result: {
                    ok: true,
                    message: '角色编辑成功'
                }
            });
        }
        async.eachLimit(req.body.pvals, 1, function (item, cb) {
            condition.perm_val = item;
            roleAdminModel.saveRolePerms(condition,(err)=>{
                if(err) return cb(err);
                cb()
            });
        },function (err) {
            if (err) return next(err);

            return res.json({
                flag: '0000',
                msg: '',
                result: {
                    ok: true,
                    message: '角色编辑成功'
                }
            });
        });
    });
};


/**
 *  @desc 新增角色修改绑定的权限
 * */
exports.addRolePerm = function (req, res, next) {

    if (!req.body.role_id) {
        return next(new BadRequestError('角色Id为必填'));
    }
    let condition = {
        role_id:req.body.role_id,
        perm_type:req.body.ptype,
        perm_val:req.body.pval,
    };

    roleAdminModel.saveRolePerms(condition, (err) => {
        if (err) return next(err);
        return res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '角色新增成功'
            }
        });
    });
};


/**
 *  @desc 删除角色修改绑定的权限
 * */
exports.deleteRolePerm = function (req, res, next) {

    if (!req.query.role_id) {
        return next(new BadRequestError('角色Id为必填'));
    }
    let condition = {
        role_id:req.query.role_id,
        perm_type:req.query.ptype,
        perm_val:req.query.pval,
    };

    roleAdminModel.removePermsByRoleId(condition,function (err) {
        if (err) return next(err);
        return res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '角色删除成功'
            }
        });
    })
};


/**
 *  @desc 修改角色信息
 * */
exports.updateRole = function (req, res, next) {

    if (!req.body.rid) {
        return next(new BadRequestError('rid is not null'));
    }

    if (!req.body.rname) {
        return next(new BadRequestError('rname is not null'));
    }

    if (!req.body.rval) {
        return next(new BadRequestError('rval is not null'));
    }

    let condition = {
        _id: req.body.rid
    };

    let perm = {
        rname: req.body.rname,
        rval: req.body.rval,
        rdesc: req.body.rdesc || null,
        update_time:new Date()
    };

    roleAdminModel.updateRole(condition,perm, function (err, role_result) {
        if (err) return next(err);
        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!role_result,
                message: role_result ? '编辑角色成功' : '编辑角色失败',
                role:role_result
            }
        });
    });
};

/**
 *  @desc 删除角色数据
 * */
exports.deleteRole = function (req, res, next) {

    let rid = req.query.rid;

    if (!req.query.rid) {
        return next(new BadRequestError('rid is not null '));
    }

    roleAdminModel.removeRoleByRoleId({_id:rid},function (err) {
        if (err) return next(err);

        return res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '角色数据成功'
            }
        });
    });

};
