/**
 * @author wxh on 2018/8/19
 * @copyright
 * @desc
 */

const administrator = require('../../controller/system/administrator');
const role = require('../../controller/system/role');
const perm = require('../../controller/system/perm');
const record = require('../../controller/system/record');

exports.map = function (app) {


    //--------------------后台用户--------------------
    app.put('/system/account', administrator.createNewAdministrator); // 创建管理员

    app.get('/system/account', administrator.getAdministratorDetail); // 获取管理员详情

    app.get('/system/info', administrator.getAdministratorDetailByToKen); // 根据token获取管理员详情

    app.post('/system/account', administrator.updateAdministrator);   // 更新管理员

    app.delete('/system/account', administrator.removeAdministrator); // 删除管理员

    app.post('/system/reset/password', administrator.resetPassword);  // 重置密码

    app.get('/system/total', administrator.getSystemTotal);  // 获取用户总量

    app.get('/system/list', administrator.getSystemList);  // 获取用户列表

    app.post('/system/role/binding', administrator.updateSystemRoleBySystemId);  // 编辑用户绑定的角色



    //--------------------角色--------------------
    app.put('/system/role', role.createNewRole); // 创建角色

    app.get('/system/role', role.getRoleList); // 获取角色列表

    app.post('/system/role', role.updateRole); // 修改角色信息

    app.delete('/system/role', role.deleteRole); // 删除角色信息

    app.get('/system/role/perms', role.getPermsListByRoleId); // 根据角色Id权限列表

    app.post('/system/role/perms', role.updateRolePermsByRoleId); // 根据角色Id修改绑定的权限

    app.put('/system/role/perm', role.addRolePerm); //添加角色的权限

    app.delete('/system/role/perm', role.deleteRolePerm); //添加角色的权限

    // app.get('/system/role/info', role.getRoleInfo); // 获取角色详情
    //
    // app.post('/system/role', role.updateRole); // 更新角色内容
    //
    //
    // //--------------------权限--------------------
    app.put('/system/perm', perm.createNewPerm); // 创建权限

    app.post('/system/perm', perm.updatePerm); // 修改权限
    //
    app.get('/system/perm', perm.getPermList); // 获取权限列表

    app.get('/system/perm/list/btn_map', perm.listBtnPermGroupByParent); //  列出按钮权限，按parent字段分组

    app.get('/system/perm/list/all', perm.listAllPermissions); // 列出所有菜单、按钮、接口等权限

    app.post('/system/perm/sync/menu', perm.syncMenuPerms); // 同步菜单权限数据

    app.post('/system/perm/sync/api', perm.syncApiPerms); // 同步接口权限数据

    app.delete('/system/perm', perm.deletePerm); // 删除权限
    //
    // app.get('/system/perm/info', administrator.getPermInfo); // 获取权限详情
    //
    // app.post('/system/perm', administrator.updatePerm); // 更新权限


    //------------------------------------记录--------------------------------------
    app.get('/system/account/record/list', record.getAdministratorRecordList); //获取用户操作记录列表

    app.get('/system/order/record/list', record.getOrderUpdateRecordList); //获取订单操作记录列表

    app.get('/system/order_payment_item/record/list', record.getOrderPaymentItemUpdateRecordList); //获取支付项操作记录列表

    app.get('/system/order/all/record/details', record.getOrderRecordDetailsByOrderId); //根据订单id获取所有操作记录



};