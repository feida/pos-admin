/**
 * @author wxh on 2019/3/13
 * @copyright
 * @desc
 */


const notifyResto = require('../../controller/notify/pushQueue');


exports.map = function(app){

    //--------------------notify-------------------- 通知发布测试

    app.put('/resto/notify/order/new',  notifyResto.addOrderIdToMessageQueue);     //保存订单到任务队列

    app.put('/resto/notify/order/payment/new',  notifyResto.addOrderIdPaymentItemToMessageQueue);     //保存订单后支付到任务队列

};