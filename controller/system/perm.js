/**
 * @author wxh on 2018/9/11
 * @copyright
 * @desc
 */

const permAdminModel = require('../../public/model/admin/perm');
const async = require('async');
const _ = require('lodash');


/**
 *  @desc 创建新的权限
 * */
exports.createNewPerm = function (req, res, next) {

    if (!req.body.pval) {
        return next(new BadRequestError('权限值为必填'));
    }

    if (!req.body.pname) {
        return next(new BadRequestError('权限名称为必填'));
    }

    let perm = {
        pval: req.body.pval,
        parent: req.body.parent||null,
        pname: req.body.pname,
        ptype: req.body.ptype,
        leaf: req.body.leaf || 0,
    };

    permAdminModel.createNewPerm(perm, function (err, perm_result) {
        if (err) return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!perm_result,
                message: perm_result ? '创建权限成功' : '创建权限失败',
                perm: perm_result
            }
        });
    });
};


/**
 *  @desc 修改权限
 * */
exports.updatePerm = function (req, res, next) {

    if (!req.body.pval) {
        return next(new BadRequestError('权限值为必填'));
    }

    if (!req.body.pname) {
        return next(new BadRequestError('权限名称为必填'));
    }
    let condition = {
        pval: req.body.pval
    };

    let perm = {
        parent: req.body.parent||null,
        pname: req.body.pname,
        ptype: req.body.ptype,
        leaf: req.body.leaf || 0,
        update_time:new Date()
    };

    permAdminModel.updatePerm(condition,perm, function (err, perm_result) {
        if (err) return next(err);
        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!perm_result,
                message: perm_result ? '编辑权限成功' : '编辑权限失败',
            }
        });
    });
};


/**
 *  @desc 获取接口权限列表
 * */
exports.getPermList = function (req, res, next) {

    permAdminModel.getPermList({ptype:3}, (err, result)=>{
        if (err) return next(err);
        // console.log(result);
        let obj = result.filter(item => item.parent==null|| item.parent==`null` || item.parent==`` );
        let aa = [];
        obj.forEach(function(item) {
            let v = {};
            v._id = item._id;
            v.pval=  item.pval;
            v.parent=  item.parent;
            v.pname=  item.pname;
            v.ptype=   item.ptype;
            v.leaf=  item.leaf;
            v.create_time=   item.create_time;
            v.update_time= item.update_time;
            v.children= (_.filter(result, {'parent': item.pval}));
            aa.push(v)
        });
        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: ``,
                data: {
                    apiPermissionTree: aa
                }
            }
        });
    })
};


/**
 *  @desc 列出按钮权限，按parent字段分组
 * */
exports.listBtnPermGroupByParent = function (req, res, next) {

    permAdminModel.getPermList({ptype: 2}, (err, result)=>{
        if (err) return next(err);
        let obj = {};
        let c = _.compact(_.uniqWith(_.map(result, 'parent') , _.isEqual));
        _(c).forEach(function(value) {
            if(value =='null') return;
            obj[`${value}`] = _.filter(result, {'parent': value});
        });
        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: ``,
                data: {
                    btnPermMap: obj
                }
            }
        });
    })
};


/**
 *  @desc 列出所有菜单、按钮、接口等权限
 * */
exports.listAllPermissions = function (req, res, next) {
    async.parallel({
        btnPermMap: function(done){
            permAdminModel.getPermList({ptype: 2}, (err, result)=>{
                if (err) return done(err);
                let obj = {};
                let c = _.compact(_.uniqWith(_.map(result, 'parent') , _.isEqual));
                _(c).forEach(function(value) {
                    if(value =='null') return;
                    obj[`${value}`] = _.filter(result, {'parent': value});
                });
                done(null,obj)
            })
        },
        permMap: function(done){
            permAdminModel.getPermList({}, (err, result)=>{
                if (err) return done(err);
                let obj = {};
                let c = _.compact(_.uniqWith(_.map(result, 'ptype') , _.isEqual));
                _(c).forEach(function(value) {
                    if(value =='null') return;
                    obj[`${value}`] = _.filter(result, {'ptype': value});
                });
                done(null,obj)
            })
        },
    },function(err, results){
        if (err) return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: ``,
                data: {
                    btnPermMap: results.btnPermMap,
                    permMap: results.permMap
                }
            }
        });

    });
};



/**
 *  @desc 同步菜单权限数据
 * */
exports.syncMenuPerms = function (req, res, next) {

    let data = req.body.data;

    permAdminModel.removePermsByCondition({ptype:1},function (err) {
        if (err) return next(err);
        async.eachLimit(data, 1, function (item, cb) {
            item.create_time =  new Date();
            item.update_time =  new Date();
            permAdminModel.savePerm(item,(err)=>{
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
                    message: '菜单编辑成功'
                }
            });
        });

    });
};

/**
 *  @desc 同步接口权限数据
 * */
exports.syncApiPerms = function (req, res, next) {

    // if (!req.body.role_id) {
    //     return next(new BadRequestError('角色Id为必填'));
    // }
    //
};

/**
 *  @desc 删除权限数据
 * */
exports.deletePerm = function (req, res, next) {

    let pval = req.query.pval;

    if (!req.query.pval) {
        return next(new BadRequestError('pval is not null '));
    }

    permAdminModel.removePermsByCondition({pval},function (err) {
        if (err) return next(err);

        return res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '权限数据成功'
            }
        });
    });

};