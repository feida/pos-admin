/**
 * @author wxh on 2018/12/4
 * @copyright
 * @desc
 */


const orderNewPosModel = require('../../public/model/newpos/order');

const async = require('async');
const _ = require('lodash');

/**
 *  @desc 创建或更新newpos订单数据
 * */
exports.createNewposrder = function (req, res, next) {

    let brandId = req.body.brand_id;
    let shopId = req.body.shop_id;

    let tb_order = req.body.tb_order || [];
    let tb_order_item = req.body.tb_order_item ||[];
    let tb_order_payment_item = req.body.tb_order_payment_item ||[];

    if (!brandId) return next(new BadRequestError('brand_id is null'));

    if (!shopId) return next(new BadRequestError('shop_id is null'));

    async.parallel({
        tb_order: (done)=>{
            async.map(tb_order, (item, cb)=>{
                item.brand_id = brandId;
                item.update_time = new Date();
                orderNewPosModel.createNewposOrder(item.id,item,cb);
            }, done);
        },
        tb_order_item: (done)=>{
            async.map(tb_order_item, (item, cb)=>{
                item.brand_id = brandId;
                item.shop_detail_id = shopId;
                item.update_time = new Date();
                orderNewPosModel.createNewposOrderItem(item.id,item,cb);
            }, done);
        },
        tb_order_payment_item: (done)=>{
            async.map(tb_order_payment_item, (item, cb)=>{
                item.brand_id = brandId;
                item.shop_detail_id = shopId;
                item.update_time = new Date();
                orderNewPosModel.createNewposOrderPaymentItem(item.id,item,cb);
            }, done);
        },
    },(err, results)=>{
        if (err)  return next(err);
        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '更新订单数据成功！'
            }
        });
    });

};


/**
 * 获取newpos订单列表ByBrandIdShopId
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getOrderListByBrandIdShopId = function (req, res, next) {

    let brandId = req.query.brand_id;
    let shopId = req.query.shop_id;
    let content = req.query.content;
    let condition ={};

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    if(content){
        condition = {
            $or : [
                {id : new RegExp(content, 'i')},
                {serial_number : new RegExp(content, 'i')},
                {parent_order_id : new RegExp(content, 'i')},
            ]
        };
    }
    if(brandId){
        condition.brand_id = brandId
    }
    if(shopId){
        condition.shop_detail_id = shopId
    }

    async.parallel({
        count: function(cb) {
            orderNewPosModel.getOrderCountByCondition(condition,cb)
        },
        list: function(cb) {
            orderNewPosModel.getOrderListByCondition(condition,pageSkip,pageSize,cb)
        }
    }, function (err, results) {
        if (err)  return next(err);
        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '成功!',
                data:results
            }
        });

    })
};


/**
 * 根据pos订单id 获取订单内容
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.getPosOrderDetailsByOrderId = function (req, res, next) {

    let orderId = req.query.order_id;

    if (!orderId) return next(new BadRequestError('order_id is null'));

    let condition ={};

    let data = {
        orderList:[],
        articleList:[],
        paymentList:[]
    };
    async.waterfall([
        (done)=>{
            condition = {
                $or : [
                    {id : orderId},
                    {parent_order_id : orderId},
                ]
            };
            orderNewPosModel.getOrderDetailsByCondition(condition,(err,res_result)=>{
                data.orderList.push(...res_result);
                let orderIdArr = _.map(res_result, 'id');
                done(err,{order_id :{ $in : orderIdArr}});
            })
        },
        (condition,done)=>{
            orderNewPosModel.getOrderItemPaymentDetailsByCondition(condition,(err,res_result)=>{
                data.articleList.push(...res_result);
                done(err,condition);
            })
        },
        (condition,done)=>{
            orderNewPosModel.getOrderPaymentDetailsByCondition(condition,(err,res_result)=>{
                data.paymentList.push(...res_result);
                done(err);
            })
        },
    ],(err)=>{
        if(err)  return next(err);
        res.json({
            flag: "0000",
            msg: '',
            result: {
                ok: true,
                message: '',
                data:data
            }
        });
    });
};


