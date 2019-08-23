/**
 * @author wxh on 2019/3/13
 * @copyright
 * @desc
 */

const restoNotifyModel = require('../../public/model/notify/pushQueue');

//保存订单Id到任务队列
exports.addOrderIdToMessageQueue = function (req, res, next) {

    let brandId = req.body.brand_id;
    let shopId = req.body.shop_id;
    let orderId = req.body.order_id;

    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!shopId) return next(new BadRequestError('shopId is null'));

    if (!orderId) return next(new BadRequestError('order_id is null'));

    restoNotifyModel.addOrderIdToMessageQueue(orderId,brandId,shopId,(err,result)=>{
        if (err)  return next(err);
        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: `队列添加成功！`,
                data:{
                    brand_id:brandId,
                    shop_id:shopId,
                    order_id:orderId,
                }
            }
        });
    })
};


//保存订单Id到任务队列
exports.addOrderIdPaymentItemToMessageQueue = function (req, res, next) {

    let brandId = req.body.brand_id;
    let shopId = req.body.shop_id;
    let orderId = req.body.order_id;

    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!shopId) return next(new BadRequestError('shopId is null'));

    if (!orderId) return next(new BadRequestError('order_id is null'));

    restoNotifyModel.addOrderIdPaymentItemToMessageQueue(orderId,brandId,shopId,(err,result)=>{
        if (err)  return next(err);
        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: `支付项队列添加成功！`,
                data:{
                    brand_id:brandId,
                    shop_id:shopId,
                    order_id:orderId,
                }
            }
        });
    })
};