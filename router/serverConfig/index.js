/**
 * @author wxh on 2019/3/26
 * @copyright
 * @desc
 */
const aliy = require('../../controller/serverConfig/aliy');

exports.map = function (app) {

    //--------------------服务器配置信息--------------------
    app.post('/aliy/colony/server/config', aliy.updateAliyColonyServerConfig); // 阿里云集群服务器信息更新

    app.get('/aliy/colony/server/config', aliy.getAliyColonyServerConfig); // 阿里云集群服务器信息获取

    app.delete('/aliy/colony/server/config', aliy.deleteAliyColonyServerConfigById); // 阿里云集群服务器信息删除

}