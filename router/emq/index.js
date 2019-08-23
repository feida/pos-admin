/**
 * @author wxh on 2018/10/22
 * @copyright
 * @desc
 */
const newpos = require('../../controller/emq/newpos');
const emqApi = require('../../controller/emq/emqApi');


exports.map = function(app){
    app.post('/emq/newpos/push',  newpos.newposPush);

    app.post('/java/newpos/push/update',  newpos.javaNewposPushUpdateInfo);

    app.post('/java/newpos/push/insert',  newpos.javaNewposPushInsertInfo);


    app.get('/emq/api/find/subscription',  emqApi.findSubscriptionByClient);    ///根据client 查找订阅

};