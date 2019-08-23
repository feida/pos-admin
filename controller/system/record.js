/**
 * @author wxh on 2018/9/29
 * @copyright
 * @desc
 */


const restoBrandModel = require('../../public/model/restoBrand/index');

const brandCurrencyModel = require('../../public/model/brandCurrency/index');





const recordModel = require('../../public/model/admin/record');

const async = require('async');
const util = require('util');
const _ = require('lodash');


/**
 *  @desc 获取用户记录列表
 * */
exports.getAdministratorRecordList = function (req, res, next) {

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    let condition = {};

    if (req.query.content) {
        condition = {
            $or: [
                {admin_name: new RegExp(req.query.content, 'i')}
            ]
        };
        // condition["admin_id.admin_mobile"] = new RegExp(req.query.content, 'i');
    }
    async.parallel({
        count: function (cb) {
            recordModel.getAdministratorRecordTotal(condition, cb);
        },
        list: function (cb) {
            recordModel.getAdministratorRecordList(condition, pageSkip, pageSize, cb)
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
                    list: results.list,
                    // list: results.list.filter(item => item.admin_id)
                },
            }
        });
    })
};




/**
 *  @desc 获取订单更新记录列表
 * */
exports.getOrderUpdateRecordList = function (req, res, next) {

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    let condition = {};

    if (req.query.content) {
        // condition = {
        //     $or: [
        //         {admin_name: new RegExp(req.query.content, 'i')}
        //     ]
        // };
    }
    async.parallel({
        count: function (cb) {
            recordModel.getOrderUpdateRecordTotal(condition, cb);
        },
        list: function (cb) {
            recordModel.getOrderUpdateRecordList(condition, pageSkip, pageSize, cb)
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
                    list: results.list,
                },
            }
        });
    })
};


/**
 *  @desc 获取支付项操作记录列表
 * */
exports.getOrderPaymentItemUpdateRecordList = function (req, res, next) {

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    let condition = {

    };

    async.parallel({
        count: function (cb) {
            recordModel.getOrderPaymentItemUpdateRecordTotal(condition, cb);
        },
        list: function (cb) {
            recordModel.getOrderPaymentItemUpdateRecordList(condition, pageSkip, pageSize, cb)
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
                    list: results.list,
                },
            }
        });
    })
};


/**
 *  @desc 根据订单id获取所有操作记录
 * */
exports.getOrderRecordDetailsByOrderId = function (req, res, next) {


    if (!req.query.order_id) return next(new BadRequestError('order_id is null'));
    if (!req.query.brand_id) return next(new BadRequestError('brand_id is null'));

    let brandId = req.query.brand_id;
    let orderId = req.query.order_id;

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;





    let getBrandMysqlDatabaseCacheInfoByBrandId  = util.promisify(restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId);   //获取数据库名
    let getOrderInfo                        = util.promisify(brandCurrencyModel.getOrderInfo);                      //获取主、子订单信息

    let getOrderUpdateRecordList            = util.promisify(recordModel.getOrderUpdateRecordList);                      //获取主、子订单记录
    let getOrderPaymentItemUpdateRecordList = util.promisify(recordModel.getOrderPaymentItemUpdateRecordList);            //获取主、子订单支付记录

    (async function () {
        try {
            let database_info = await getBrandMysqlDatabaseCacheInfoByBrandId(brandId);
            if (!database_info) {
                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: true,
                        message: '',
                        data: {
                            customer: {
                                count: 0,
                                rows: []
                            }
                        }
                    }
                });
            }
            let database = database_info.mysql_client;

            let  orderCondition = {
                $or : [
                    {id : {"$like":`%${orderId}%`}},
                    {parent_order_id : {"$like":`%${orderId}%`}},
                ]
            };

            let getOrderInfoResult = await getOrderInfo(database,orderCondition);

            let orderIdArr = _.map(getOrderInfoResult, 'id');

            let  condition =  {'order_id':{ '$in':orderIdArr}};

            let getOrderUpdateRecordListResult              = await getOrderUpdateRecordList(condition,pageSkip,pageSize);
            let getOrderPaymentItemUpdateRecordListResult   = await getOrderPaymentItemUpdateRecordList(condition,pageSkip,pageSize);

            return res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: ``,
                    data: {
                        getOrderUpdateRecordList            :getOrderUpdateRecordListResult,
                        getOrderPaymentItemUpdateRecordList :getOrderPaymentItemUpdateRecordListResult,
                    }
                }
            });
        } catch (err) {
            return next(err);
        }
    })();
};