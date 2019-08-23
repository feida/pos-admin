/**
 * @author wxh on 2018/11/13
 * @copyright
 * @desc
 */

const payment = require('../../controller/constant/payment');
const constant = require('../../controller/constant/constant');

exports.map = function (app) {
    //--------------------支付常量--------------------
    app.put('/constant/payment', payment.newPaymentConstant);   //添加
    app.get('/constant/payment/list', payment.getPaymentConstantList);   //获取支付项列表

    app.get('/constant/list', constant.getConstantListByType);   //根据type 获取常量
};