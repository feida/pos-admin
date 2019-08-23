/**
 * @author wxh on 2018/11/19
 * @copyright
 * @desc
 */

const third_party_merchants = require('../../controller/spider/third_party_merchants');

exports.map = function (app) {
    app.put('/spider/third_party/merchant/user/new', third_party_merchants.createUser);      //创建商户信息


    app.get('/spider/third_party/merchant/user/list', third_party_merchants.getMerchantUserList);      //创建商户信息


    app.put('/spider/third_party/merchant/api/new', third_party_merchants.createSpiderApi);      //创建第三方商户需要爬取的api

    app.get('/spider/third_party/merchant/login', third_party_merchants.login);      //登陆 商户登陆

    app.get('/spider/third_party/merchant/implement/once/task', third_party_merchants.startImplementOnceTask);      //开始执行一次爬取任务


    //-------------------------------经营分析/营业统计---------------------------
    app.get('/spider/third_party/business/statistics/info', third_party_merchants.getBusinessStatisticsInfo);      //获取营业信息

};