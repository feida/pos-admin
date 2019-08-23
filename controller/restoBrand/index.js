/**
 * @author wxh on 2018/9/20
 * @copyright
 * @desc
 */

const restoBrandModel = require('../../public/model/restoBrand/index');


const brandCurrencyModel = require('../../public/model/brandCurrency/index');
const brandCurrencyOrderModel = require('../../public/model/brandCurrency/order');
const emqPushModel = require('../../public/model/emq/newpos');

const recordAdminModel = require('../../public/model/admin/record');
const constantAdminModel = require('../../public/model/admin/constant');
const aliyModel = require('../../public/model/admin/aliy');


const orderNewPosModel = require('../../public/model/newpos/order');

const domainRecordsModel = require('../../public/model/alicloud/domainRecords');



const utilLib = require('../../lib/util');

const async = require('async');
const lodash = require('lodash');
const moment = require('moment');

const util = require('util');


exports.getShopDetailList = function (req, res, next) {

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;
    let order = req.query.order;


    if(order && order!=`desc` && order!=`asc`) {
        return next(new BadRequestError('order can only desc or asc'))
    }

    let condition = `where sd.state = 1 and b.state = 1`;
    if(req.query.content){
        condition += ` and  (sd.name like "%${req.query.content}%" or  b.brand_name like "%${req.query.content}%" or sm.name  like "%${req.query.content}%") `;
    }

    let sort = ``;
    if(req.query.prop){
        sort += ` order by ${req.query.prop} ${req.query.order}`
    }


    async.parallel({
        count: (done)=>{
            let sql = `select count(*) count from shop_detail sd 
                left join brand  b on b.id = sd.brand_id 
                left join shop_mode sm on sm.id = sd.shop_mode
                ${condition} `;
            restoBrandModel.getOneCustomSqlInfo(sql,done)
        },
        list: (done)=>{
            let sql = `select sm.name mode, sd.*,b.brand_name,b.brand_sign from shop_detail sd 
                left join brand  b on b.id = sd.brand_id 
                left join shop_mode sm on sm.id = sd.shop_mode
                ${condition} ${sort}  limit ${pageSize} offset ${pageSkip}`;
            restoBrandModel.getAllCustomSqlInfo(sql,done)
        },
        server_ip: (done)=>{
            aliyModel.getAliyColonyServerConfigAll({},done)
        },
    },function(err, results){
        if(err)  return next(err);

        let brand_sign_arr = lodash.uniqBy(results.list, 'brand_sign')
        let server_ip = results.server_ip;
        let config_domain =[];
        async.map(brand_sign_arr, (arr, cb) => {
            domainRecordsModel.getDomainRecordsBySubDomain(`${arr.brand_sign}.restoplus.cn`,(err,res_d)=>{
                if(err)  cb(null);
                if(res_d.DomainRecords.Record.length>0 && lodash.find(server_ip, { 'ip': res_d.DomainRecords.Record[0].Value})){
                    config_domain.push({brand_sign:arr.brand_sign,name:lodash.find(server_ip, { 'ip': res_d.DomainRecords.Record[0].Value}).name})
                };
                cb(null);
            })
        }, (err, result) => {
            if(err)  return next(err);
            results.list.map((value) => {
                value.is_open                   = value.is_open                     ?(value.is_open.toJSON()).data[0]               :1; //默认开启
                value.pos_waitred_envelope      = value.pos_waitred_envelope        ?(value.pos_waitred_envelope.toJSON()).data[0]  :0;
                value.ali_pay                   = value.ali_pay                     ?(value.ali_pay.toJSON()).data[0]               :0;
                value.is_meal_fee               = value.is_meal_fee                 ?(value.is_meal_fee.toJSON()).data[0]           :0;
                value.is_choice_mode            = value.is_choice_mode              ?(value.is_choice_mode.toJSON()).data[0]        :1;
                value.auto_alert_appraise       = value.auto_alert_appraise         ?(value.auto_alert_appraise.toJSON()).data[0]   :1;
                value.auto_print_total          = value.auto_print_total            ?(value.auto_print_total.toJSON()).data[0]      :0;
                value.is_use_recommend          = value.is_use_recommend            ?(value.is_use_recommend.toJSON()).data[0]      :0;
                value.print_type                = value.print_type                  ?(value.print_type.toJSON()).data[0]            :0;
                value.is_print_pay_after        = value.is_print_pay_after          ?(value.is_print_pay_after.toJSON()).data[0]    :0;
                value.is_use_service_price      = value.is_use_service_price        ?(value.is_use_service_price.toJSON()).data[0]  :0;
                value.is_push                   = value.is_push                     ?(value.is_push.toJSON()).data[0]               :0;
                value.is_new_qrcode             = value.is_new_qrcode               ?(value.is_new_qrcode.toJSON()).data[0]         :0;
                value.is_user_identity          = value.is_user_identity            ?(value.is_user_identity.toJSON()).data[0]      :0;
                value.is_use_service_prices     = value.is_use_service_prices       ?(value.is_use_service_prices.toJSON()).data[0] :0;
                value.open_union_pay            = value.open_union_pay              ?(value.open_union_pay.toJSON()).data[0]        :0;
                value.open_money_pay            = value.open_money_pay              ?(value.open_money_pay.toJSON()).data[0]        :0;
                value.open_shanhui_pay          = value.open_shanhui_pay            ?(value.open_shanhui_pay.toJSON()).data[0]      :0;
                value.integral_pay              = value.integral_pay                ?(value.integral_pay.toJSON()).data[0]          :0;
                value.pos_open_table            = value.pos_open_table              ?(value.pos_open_table.toJSON()).data[0]        :0;
                value.open_pos_ali_pay          = value.open_pos_ali_pay            ?(value.open_pos_ali_pay.toJSON()).data[0]      :0;
                value.open_pos_union_pay        = value.open_pos_union_pay          ?(value.open_pos_union_pay.toJSON()).data[0]    :0;
                value.open_pos_money_pay        = value.open_pos_money_pay          ?(value.open_pos_money_pay.toJSON()).data[0]    :0;
                value.open_pos_shanhui_pay      = value.open_pos_shanhui_pay        ?(value.open_pos_shanhui_pay.toJSON()).data[0]  :0;
                value.open_pos_integral_pay     = value.open_pos_integral_pay       ?(value.open_pos_integral_pay.toJSON()).data[0] :0;
                value.open_pos_charge           = value.open_pos_charge             ?(value.open_pos_charge.toJSON()).data[0]       :0;
                value.modify_order_print_receipt= value.modify_order_print_receipt  ?(value.modify_order_print_receipt.toJSON()).data[0]:0;
                value.modify_order_print_kitchen= value.modify_order_print_kitchen  ?(value.modify_order_print_kitchen.toJSON()).data[0]:0;
                value.open_pos_pay_order        = value.open_pos_pay_order          ?(value.open_pos_pay_order.toJSON()).data[0]    :0;
                value.open_order_remark         = value.open_order_remark           ?(value.open_order_remark.toJSON()).data[0]     :0;
                value.open_pos_wechat_pay       = value.open_pos_wechat_pay         ?(value.open_pos_wechat_pay.toJSON()).data[0]   :0;
                value.template_type             = value.template_type               ?(value.template_type.toJSON()).data[0]         :0;
                value.wait_remind_switch        = value.wait_remind_switch          ?(value.wait_remind_switch.toJSON()).data[0]    :0;
                value.is_turntable              = value.is_turntable                ?(value.is_turntable.toJSON()).data[0]          :0;
                value.open_bad_appraise_print_order = value.open_bad_appraise_print_order   ? (value.open_bad_appraise_print_order.toJSON()).data[0]:0;
                value.bad_appraise_print_kitchen    = value.bad_appraise_print_kitchen      ?(value.bad_appraise_print_kitchen.toJSON()).data[0]    :0;
                value.bad_appraise_print_receipt    = value.bad_appraise_print_receipt      ?(value.bad_appraise_print_receipt.toJSON()).data[0]    :0;
                value.is_takeout                = value.is_takeout                  ?(value.is_takeout.toJSON()).data[0]:0;
                value.open_pos_discount         = value.open_pos_discount           ?(value.open_pos_discount.toJSON()).data[0]     :0;
                value.is_open_scan_code_number  = value.is_open_scan_code_number    ?(value.is_open_scan_code_number.toJSON()).data[0]:0;
                value.open_consumer_rebate      = value.open_consumer_rebate        ?(value.open_consumer_rebate.toJSON()).data[0]  :0;
                value.consumption_rebate        = value.consumption_rebate          ?(value.consumption_rebate.toJSON()).data[0]    :0;
                value.open_bad_warning          = value.open_bad_warning            ?(value.open_bad_warning.toJSON()).data[0]      :0;
                value.service_type              = value.service_type                ?(value.service_type.toJSON()).data[0]          :0;


                value.is_open_tableware_fee     = value.is_open_tableware_fee       ?(value.is_open_tableware_fee.toJSON()).data[0] :1;
                value.is_open_towel_fee         = value.is_open_towel_fee           ?(value.is_open_towel_fee.toJSON()).data[0]     :1;
                value.is_open_sauce_fee         = value.is_open_sauce_fee           ?(value.is_open_sauce_fee.toJSON()).data[0]     :1;
                value.auto_print_consume_order  = value.auto_print_consume_order    ?(value.auto_print_consume_order.toJSON()).data[0]:1;
                value.auto_print_checkout_order = value.auto_print_checkout_order   ?(value.auto_print_checkout_order.toJSON()).data[0]:1;


                value.open_group_buy            = value.open_group_buy              ?(value.open_group_buy.toJSON()).data[0]        :0;
                value.open_cash_coupon_buy      = value.open_cash_coupon_buy        ?(value.open_cash_coupon_buy.toJSON()).data[0]  :0;
                value.open_pos_cash_coupon_buy  = value.open_pos_cash_coupon_buy    ?(value.open_pos_cash_coupon_buy.toJSON()).data[0]:0;
                value.open_rpay                 = value.open_rpay                   ?(value.open_rpay.toJSON()).data[0]             :0;

                value.print_out_details         = value.print_out_details           ?(value.print_out_details.toJSON()).data[0]     :1;
                value.is_open_add_print_total   = value.is_open_add_print_total     ?(value.is_open_add_print_total.toJSON()).data[0]:1;
                value.is_open_user_sign         = value.is_open_user_sign           ?(value.is_open_user_sign.toJSON()).data[0]     :0;
                value.is_open_emq_push          = value.is_open_emq_push            ?(value.is_open_emq_push.toJSON()).data[0]      :0;


                value.colony = lodash.find(config_domain, { 'brand_sign': value.brand_sign}) ? lodash.find(config_domain, { 'brand_sign': value.brand_sign}).name :'未知集群'
            });



            res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: '',
                    data:{
                        count:results.count.count,
                        list:results.list
                    }
                }
            });
        });
    });
};

/**
 * 根据shopId 获取店铺详情
 * @param req
 * @param res
 * @param next
 */
exports.getBrandShopDetailByShopId = function (req, res, next) {
    let shopId = req.query.shop_id;
    if (!shopId) return next(new BadRequestError('shop_id is null'));

    let sql = `SELECT rb.brand_name,sd.* from shop_detail sd left join brand rb on rb.id = sd.brand_id where sd.id = '${shopId}'`;

    restoBrandModel.getOneCustomSqlInfo(sql,(err,shop_info)=>{
        if(err)  return next(err);


        return res.json({
            flag: "0000",
            msg: '',
            result: {
                ok: true,
                message: '',
                data:shop_info
            }
        });

    })

};
exports.getArticleInfoListByBrandId = function (req, res, next) {

    let brandId = req.query.brand_id;

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    if (!brandId) return next(new BadRequestError('brand_id is null'));

    restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId(brandId, (err, database_info) => {
        if (err) return next(err);
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

        brandCurrencyModel.getAllArticleInfo(database,{"name": "手擀面"},pageSkip,pageSize,(err,article)=>{
            if(err)  return next(err);

            res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: '',
                    data:{
                        article:article
                    }
                }
            });
        })

    });
};


exports.getShopOrderListByBrandIdAndShopId = function (req, res, next) {

    let brandId = req.query.brand_id;
    let shopId = req.query.shop_id;
    let content = req.query.content;
    let condition ={};

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    if (!brandId) return next(new BadRequestError('brand_id is null'));

    if(req.query.order && req.query.order!=`desc` && req.query.order!=`asc`) {
        return next(new BadRequestError('order can only desc or asc'))
    }

    if(content){
        condition = {
            $or : [
                {id : {"$like":`${content}%`}},
                {serial_number : {"$like":`${content}%`}},
                {parent_order_id : {"$like":`${content}%`}}
            ]
        };
    }
    let sort = [];
    if(req.query.prop){
        sort.push([`${req.query.prop}`, `${req.query.order}`])
    }

    if(shopId){
        condition.shop_detail_id = shopId
    }

    restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId(brandId, (err, database_info) => {
        if (err) return next(err);
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

        brandCurrencyModel.getAllOrderInfoAndSort(database,condition,sort,pageSkip,pageSize,(err,order)=>{
            if(err)  return next(err);

            res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: '',
                    data:{
                        order:order
                    }
                }
            });
        })

    });
};

/**
 * 根据订单id 获取订单内容
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.getShopOrderDetailsByBrandIdAndOrderId = function (req, res, next) {

    let brandId = req.query.brand_id;
    let shopId = req.query.shop_id;
    let orderId = req.query.order_id;

    if (!brandId) return next(new BadRequestError('brand_id is null'));

    if (!orderId) return next(new BadRequestError('order_id is null'));

    restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId(brandId, (err, database_info) => {
        if (err) return next(err);
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

        async.parallel({
            shopInfo: (done)=>{
                let sql = `select sm.name mode, sd.name,b.brand_name,b.id brand_id from shop_detail sd
                            left join brand  b on b.id = sd.brand_id
                            left join shop_mode sm on sm.id = sd.shop_mode
                            where sd.id = '${shopId}'`;
                restoBrandModel.getOneCustomSqlInfo(sql,done)
            },
            orderList: (done)=>{
               let  condition = {
                    $or : [
                        {id : {"$like":`${orderId}%`}},
                        {parent_order_id : {"$like":`${orderId}%`}},
                    ]
                };

                brandCurrencyModel.getOrderInfo(database,condition,done)
            },
        },(err, results)=>{

            if(err)  return next(err);

            let orderIdArr = lodash.map(results.orderList, 'id');

            let  condition = {order_id :{ $in : orderIdArr}};

            brandCurrencyModel.getOrderArticleInfo(database,condition,(err,article)=>{
                if(err)  return next(err);

                results.orderList.map((value) => {
                    value.allow_appraise = value.allow_appraise ? (value.allow_appraise.toJSON()).data[0] : 0;
                });
                res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: true,
                        message: '',
                        data:{
                            shopInfo:results.shopInfo,
                            orderList:results.orderList,
                            // paymentList:results.paymentList,
                            articleList:article,
                        }
                    }
                });
            });
        });
    });
};


/**
 * 获取订单支付项详情
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.getShopOrderPaymentDetailsByBrandIdAndOrderId = function (req, res, next) {

    let brandId = req.query.brand_id;
    let orderId = req.query.order_id;

    if (!brandId) return next(new BadRequestError('brand_id is null'));


    if (!orderId) return next(new BadRequestError('order_id is null'));

    let getBrandMysqlDatabaseCacheInfoByBrandId  = util.promisify(restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId);   //获取数据库连接信息
    let getOrderInfo                        = util.promisify(brandCurrencyModel.getOrderInfo);
    let getOrderPaymentInfo                 = util.promisify(brandCurrencyModel.getOrderPaymentInfo);
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
                            order: {
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
                    {id : {"$like":`${orderId}%`}},
                    {parent_order_id : {"$like":`${orderId}%`}},
                ]
            };

            let getOrderInfoResult = await getOrderInfo(database,orderCondition);

            let orderIdArr = lodash.map(getOrderInfoResult, 'id');

            let  paymentCondition = {order_id :{ $in : orderIdArr}};

            let getOrderPaymentInfoResult = await getOrderPaymentInfo(database,paymentCondition);

            return res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: ``,
                    data: {
                        paymentList:getOrderPaymentInfoResult,
                    }
                }
            });
        } catch (err) {
            return next(err);
        }
    })();
};

/**
 * 根据表和id 修改内容
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.updateShopOrderDetailsByBrandIdAndTableAndId = function (req, res, next) {

    let brandId = req.body.brand_id;
    let shopId = req.body.shop_id;
    let id = req.body.id;
    let table = req.body.table;
    let param = req.body;

    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!shopId) return next(new BadRequestError('shop_id is null'));
    if (!id) return next(new BadRequestError('id is null'));
    if (!table) return next(new BadRequestError('table is null'));

    //线上修改内容
    let content = {
        id:id
    };

    //newpos 推送内容
    let pushObj = {
        "newposData":{}
    };
    //当前时间
    let current_time = new Date();

    //日志
    let recordDoc = {
        _id             :req.session? req.session._id :null,
        create_time     :current_time,
        brand_id        :param.brand_id    ||"",
        brand_name      :param.brand_name    ||"",
        shop_id         :param.shop_id    ||"",
        shop_name       :param.shop_name    ||"",
        action_details  :[]
    };

    let getBrandMysqlDatabaseCacheInfoByBrandId     = util.promisify(restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId);   //获取数据连接信息
    let getTableInfoByInfo                          = util.promisify(brandCurrencyModel.getTableInfoByInfo);                //根据id、table 获取信息
    let upsertTableInfo                             = util.promisify(brandCurrencyModel.upsertTableInfo);                   //根据id、table 修改信息

    let getPosVersion                               = util.promisify(restoBrandModel.getOneCustomSqlInfo);                  //查询pos版本信息
    let upsertNewPosPush                            = util.promisify(emqPushModel.currencyPosPush);                       //推送给 newpos/或者winpos

    let createOrderUpdateRecord                     = util.promisify(recordAdminModel.createOrderUpdateRecord);             //tb_order 操作日志添加
    let createOrderPaymentItemUpdateRecord          = util.promisify(recordAdminModel.createOrderPaymentItemUpdateRecord);  //tb_order_payment_item 操作日志添加

    let constantListByType                          = util.promisify(constantAdminModel.constantList);           // 1 支付 2 订单 3 打印

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

            let getTableInfoByInfoResult = await getTableInfoByInfo(database,table,id); //查询修改之前的信息

            if(getTableInfoByInfoResult){
                for (let i in getTableInfoByInfoResult.dataValues) {
                    content[i] = getTableInfoByInfoResult.dataValues[i];
                    pushObj.newposData[utilLib.smallHump(i)] =getTableInfoByInfoResult.dataValues[i];
                }
            }


            if(table == 'tb_order_payment_item'){
                if (!req.body.order_id) return next(new BadRequestError('order_id is null'));

                //日志记录
                recordDoc.order_id                  = param.order_id   ||"";
                recordDoc.serial_number             = content.serial_number   ||"111";
                recordDoc.payment_mode_id           = content.payment_mode_id || 0;
                recordDoc.pay_value                 = content.pay_value      || 0;


                if(+param.payment_mode_id != +recordDoc.payment_mode_id){
                    let orderConstantList = await constantListByType({type:1});
                    let New = lodash.find(orderConstantList, {'code': +param.payment_mode_id});
                    recordDoc.action_details.push(`${getTableInfoByInfoResult?"":"新增"}支付项=>${New.name}`)
                }

                if(+param.pay_value != +recordDoc.pay_value){
                    recordDoc.action_details.push(`支付金额=>${param.pay_value}`)
                }

                //服务器修改内容
                content.payment_mode_id         = param.payment_mode_id;
                content.pay_value               = param.pay_value;
                content.order_id                = param.order_id;
                content.remark                  = param.remark;
                content.result_data             = param.result_data;
                content.is_use_bonus            = param.is_use_bonus || 0 ;
                content.coupon_article_id       = param.coupon_article_id || '' ;
                content.to_pay_id               = param.to_pay_id || '' ;

                //newpos修改内容
                pushObj.newposData.id           =  param.id;
                pushObj.newposData.paymentModeId=  param.payment_mode_id;
                pushObj.newposData.payValue     =  param.pay_value;
                pushObj.newposData.orderId      =  param.order_id;
                pushObj.newposData.remark       =  param.remark;
                pushObj.newposData.resultData   =  param.result_data;
                pushObj.newposData.isUseBonus   =  pushObj.newposData.isUseBonus ? 1:0;
                pushObj.newposData.payTime      =  pushObj.newposData.payTime?new Date(pushObj.newposData.payTime).getTime():new Date().getTime();

                //emq 推送格式
                pushObj.message_id              = current_time.getTime();
                pushObj.table                   = table;
                pushObj.data                    = [pushObj.newposData];

                let createOrderUpdateRecordResult = await createOrderPaymentItemUpdateRecord(recordDoc);

            }else if(table == 'tb_order'){
                //日志记录
                recordDoc.order_id                  = param.id   ||"";
                recordDoc.serial_number             = content.serial_number   ||"";
                recordDoc.order_state               = content.order_state;
                recordDoc.production_status         = content.production_status;
                recordDoc.order_money               = content.order_money;
                recordDoc.amount_with_children      = content.amount_with_children;
                recordDoc.order_pos_discount_money  = content.order_pos_discount_money;
                recordDoc.erase_money               = content.erase_money;
                recordDoc.allow_appraise            = content.allow_appraise;

                if(+param.order_state != +recordDoc.order_state){
                    let orderConstantList = await constantListByType({type:2});
                    let New = lodash.find(orderConstantList, {'code': +param.order_state});
                    recordDoc.action_details.push(`订单状态=>${New.name}`)
                }
                if(+param.production_status != +recordDoc.production_status){
                    let orderConstantList = await constantListByType({type:3});
                    let New = lodash.find(orderConstantList, {'code': +param.production_status});
                    recordDoc.action_details.push(`打印状态=>${New.name}`)
                }

                if(+param.order_money != +recordDoc.order_money){
                    recordDoc.action_details.push(`订单金额=>${param.order_money}`)
                }
                if(+param.amount_with_children != +recordDoc.amount_with_children){
                    recordDoc.action_details.push(`订单金额总计=>${param.amount_with_children}`)
                }

                if(param.order_pos_discount_money != recordDoc.order_pos_discount_money){
                    recordDoc.action_details.push(`pos端折扣金额=>${param.order_pos_discount_money}`)
                }

                if(param.erase_money != recordDoc.erase_money){
                    recordDoc.action_details.push(`抹零金额=>${param.erase_money}`)
                }

                if(param.allow_appraise != recordDoc.allow_appraise){
                    recordDoc.action_details.push(`评论状态=>${param.allow_appraise}`)
                }

                if(param.customer_count != recordDoc.customer_count){
                    recordDoc.action_details.push(`就餐人数=>${param.customer_count}`)
                }

                //服务器修改内容
                content.order_state             = param.order_state;
                content.customer_count          = param.customer_count;
                content.production_status       = param.production_status;
                content.order_money             = param.order_money;
                content.amount_with_children    = param.amount_with_children;
                content.order_pos_discount_money= param.order_pos_discount_money;
                content.erase_money             = param.erase_money;
                content.allow_appraise          = param.allow_appraise;
                content.real_erase_money        = Number(param.erase_money) +Number(param.reduce_money);

                //newpos推送内容

                pushObj.newposData.createTime       = new Date(pushObj.newposData.createTime).getTime();
                pushObj.newposData.pushOrderTime    = new Date(pushObj.newposData.pushOrderTime).getTime();
                pushObj.newposData.printOrderTime   = new Date(pushObj.newposData.printOrderTime).getTime();
                pushObj.newposData.confirmTime      = new Date(pushObj.newposData.confirmTime).getTime();
                pushObj.newposData.originMoney      = pushObj.newposData.originalAmount;
                pushObj.newposData.orderNumber      = 0;
                pushObj.newposData.callTimes        = 0;
                pushObj.newposData.posDiscount      = (pushObj.newposData.posDiscount * 100).toFixed(2);


                pushObj.newposData.orderState             = `${param.order_state>=10 ? 2:param.order_state}`;
                pushObj.newposData.productionStatus       = param.production_status;
                pushObj.newposData.orderMoney             = param.order_money;
                pushObj.newposData.allowAppraise          = param.allow_appraise;
                pushObj.newposData.customerCount          = param.customer_count;
                pushObj.newposData.amountWithChildren     = param.amount_with_children;
                pushObj.newposData.orderPosDiscountMoney  = param.order_pos_discount_money;
                pushObj.newposData.realEraseMoney         = Number(param.erase_money) +Number(param.reduce_money);

                //emq 推送格式
                pushObj.message_id                  = current_time.getTime();
                pushObj.table                       = table;
                pushObj.data                        = [pushObj.newposData];


                let createOrderUpdateRecordResult = await createOrderUpdateRecord(recordDoc);

                
            }else if(table == 'tb_order_item'){

                //服务器修改内容
                content.final_price             = param.final_price;
                content.grant_count             = param.grant_count;
                content.count                   = param.count;
                content.refund_count            = param.refund_count;

                //newpos推送内容
                pushObj.newposData.finalPrice   = param.final_price;
                pushObj.newposData.grantCount   = param.grant_count;
                pushObj.newposData.count        = param.count;
                pushObj.newposData.refundCount  = param.refund_count;
                pushObj.newposData.createTime   = new Date(pushObj.newposData.createTime).getTime();
                //emq 推送格式
                pushObj.message_id                  = current_time.getTime();
                pushObj.table                       = table;
                pushObj.data                        = [pushObj.newposData];
            }
            let result_data  =   await getPosVersion(`SELECT pos_version from shop_detail where id = '${shopId}'`);

            let upsertNewPosPushResult = await upsertNewPosPush(result_data.pos_version == 2?`winPos`:`newPos`,`${brandId}`,`${shopId}`,`instruct`,`upsert`,id,pushObj);

            let upsertTableInfoResult = await upsertTableInfo(database,table,content);


            return res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: ``
                }
            });
        } catch (err) {
            return next(err);
        }
    })();
};


/**
 * 新增订单、支付数据
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.creatorShopOrderDetailsByBrandIdAndTableAndId = function (req, res, next) {
    let brandId = req.body.brand_id;
    let shopId = req.body.shop_id;
    let table = req.body.table;
    let id = req.body.id;

    let param = req.body;


    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!shopId) return next(new BadRequestError('shop_id is null'));
    if (!id) return next(new BadRequestError('id is null'));
    if (!table) return next(new BadRequestError('table is null'));


    //线上修改内容
    let content = {
        id:id
    };

    //newpos 推送内容
    let pushObj = {
        "newposData":{}
    };
    //当前时间
    let current_time = new Date();

    //日志
    let recordDoc = {
        _id             :req.session? req.session._id :null,
        create_time     :current_time,
        brand_id        :param.brand_id    ||"",
        brand_name      :param.brand_name    ||"",
        shop_id         :param.shop_id    ||"",
        shop_name       :param.shop_name    ||"",
        action_details  :[]
    };


    let getBrandMysqlDatabaseCacheInfoByBrandId          = util.promisify(restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId);   //获取数据连接信息
    let upsertTableInfo                             = util.promisify(brandCurrencyModel.upsertTableInfo);                   //根据id、table 插入信息

    let getPosVersion                               = util.promisify(restoBrandModel.getOneCustomSqlInfo);                  //查询pos版本信息
    let upsertNewPosPush                            = util.promisify(emqPushModel.currencyPosPush);                       //推送给 newpos/或者winpos

    // let upsertNewPosPush                            = util.promisify(emqPushModel.newposPush);                              //推送给 newpos

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

            if(table == 'tb_order_payment_item'){

                if (!param.pay_time)        return next(new BadRequestError('pay_time is null'));
                if (!param.pay_value)       return next(new BadRequestError('pay_value is null'));
                if (!param.payment_mode_id) return next(new BadRequestError('payment_mode_id is null'));
                if (!param.order_id)        return next(new BadRequestError('order_id is null'));

                //线上
                content.pay_time                = param.pay_time;
                content.pay_value               = param.pay_value;
                content.payment_mode_id         = param.payment_mode_id;
                content.order_id                = param.order_id;

                content.result_data             = param.result_data;
                content.remark                  = param.remark;
                content.is_use_bonus            = param.is_use_bonus;
                content.to_pay_id               = param.to_pay_id;
                content.coupon_article_id       = param.coupon_article_id;


                //newpos新增内容
                pushObj.newposData.id           =  param.id;
                pushObj.newposData.orderId      =  param.order_id;
                pushObj.newposData.paymentModeId=  param.payment_mode_id;
                pushObj.newposData.payValue     =  param.pay_value;
                pushObj.newposData.payTime      =  new Date(param.pay_time).getTime();
                pushObj.newposData.remark       =  param.remark;
                pushObj.newposData.resultData   =  param.result_data;
                pushObj.newposData.isUseBonus   =  param.is_use_bonus;
                pushObj.newposData.toPayId      =  param.to_pay_id;

                //emq 推送格式
                pushObj.message_id              = current_time.getTime();
                pushObj.table                   = table;
                pushObj.data                    = [pushObj.newposData];


            }else if(table == 'tb_order'){

            }

            let result_data  =   await getPosVersion(`SELECT pos_version from shop_detail where id = '${shopId}'`);

            let upsertNewPosPushResult = await upsertNewPosPush(result_data.pos_version == 2?`winPos`:`newPos`,`${brandId}`,`${shopId}`,`instruct`,`upsert`,id,pushObj);

            let upsertTableInfoResult = await upsertTableInfo(database,table,content);

            return res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: ``
                }
            });
        } catch (err) {
            return next(err);
        }
    })();
};

exports.getBrandShopAll = function (req, res, next) {

    async.waterfall([
        (done)=>{
            let sql = `SELECT id value,brand_name label from brand where state = 1`;
            restoBrandModel.getAllCustomSqlInfo(sql,done)
        },
        (result, done)=>{
            let obj = [];
            async.eachLimit(result, 1,  (item, cb) =>{
                let sql =`SELECT  id value,name label  from shop_detail where state = 1 and brand_id = '${item.value}';`;
                restoBrandModel.getAllCustomSqlInfo(sql,(err,revl)=>{
                    if(err) return cb(err);
                    item.children = revl;
                    obj.push(item);
                    cb()
                });
            }, (err)=> {
                if(err) return done(err);
                done(null, obj)
            });
        },
    ],(err, result)=>{
        if(err)  return next(err);
        res.json({
            flag: "0000",
            msg: '',
            result: {
                ok: true,
                message: '',
                data:{
                    options:result,
                    defaultBrandId:result?`${result[0].value}`:``,
                    defaultShopId:result?`${result[0].children[0].value}`:``
                }
            }
        });
    });

};


/**
 * 测试专用
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.testTest = function (req, res, next) {

    let brandId = req.query.brand_id;
    let shopId = req.query.shop_id;
    let content = req.query.content;
    let condition ={};

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    if (!brandId) return next(new BadRequestError('brand_id is null'));


    if(content){
        condition = {
            $or : [
                {id : {"$like":`%${content}%`}},
                {serial_number : {"$like":`%${content}%`}},
                {parent_order_id : {"$like":`%${content}%`}},
            ]
        };
    }
    if(shopId){
        condition.shop_detail_id = shopId
    }

    restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId(brandId, (err, database_info) => {
        if (err) return next(err);
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


        brandCurrencyModel.getCountOrderInfo(database,condition,(err,order_cunt)=>{
            if(err)  return next(err);

            let index = Math.ceil(order_cunt/pageSize);

            let arr_item = [];
            for(var i=1768;i<=index;i++){
                arr_item.push(i);
            }

            async.mapLimit(arr_item,1, (arr, arr_cb) => {

                pageSkip = pageSize *  (arr -1);
                brandCurrencyModel.getAllOrderInfo(database,condition,pageSkip,pageSize,(err,order)=>{
                    async.eachLimit(order.rows, 1, function (item, cb) {
                        item = item.dataValues;
                        async.parallel({
                            getOrderPaymentInfo: (done)=>{
                                brandCurrencyModel.getOrderPaymentInfo(database,{order_id:item.id},done);
                            },
                            getOrderArticleInfo: function(done){
                                brandCurrencyModel.getOrderArticleInfo(database,{order_id:item.id},done);
                            },
                        },function(error, results){
                            if(error) return cb(error);
                            async.parallel({
                                tb_order: (done)=>{
                                    item.brand_id = brandId;
                                    item.update_time = new Date();
                                    orderNewPosModel.createNewposOrder(item.id,item,done);
                                },
                                tb_order_item: (done)=>{
                                    async.map(results.getOrderArticleInfo, (item_article, cb)=>{
                                        item_article = item_article.dataValues;
                                        item_article.brand_id = brandId;
                                        item_article.shop_detail_id = shopId;
                                        item_article.update_time = new Date();
                                        orderNewPosModel.createNewposOrderItem(item_article.id,item_article,cb);
                                    }, done);
                                },
                                tb_order_payment_item: (done)=>{
                                    async.map(results.getOrderPaymentInfo, (item_payment, cb)=>{
                                        item_payment = item_payment.dataValues;
                                        item_payment.brand_id = brandId;
                                        item_payment.shop_detail_id = shopId;
                                        item_payment.update_time = new Date();
                                        orderNewPosModel.createNewposOrderPaymentItem(item_payment.id,item_payment,cb);
                                    }, done);
                                },
                            },(err, results)=>{
                                if(err) return cb(err);
                                cb()
                            });
                        });
                    },function (err) {
                        if(err)  return next(err);

                        setTimeout(arr_cb,2000);
                    });

                });

            }, (err, result) => {

                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: true,
                        message: '完成',
                        data:{
                            index:index,
                        }
                    }
                });
            });
        })
    });
};




/**
 * 获取门店异常订单
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.getShopOrderAbnormalInfoListByBrandId = function (req, res, next) {

    let brandId = req.query.brand_id;
    let shopId = req.query.shop_id;
    let date = req.query.date ||`${moment().format('YYYY-MM-DD')}`;

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    if (!brandId) return next(new BadRequestError('brand_id is null'));
    let condition ={
        date:date,
        shopId:shopId
    };
    restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId(brandId, (err, database_info) => {
        if (err) return next(err);
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

        brandCurrencyOrderModel.getShopOrderAbnormalInfoListByBrandIdByDate(database,condition,(err,result)=>{
            if(err)  return next(err);

            res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: '',
                    data:{
                        order:{
                            count:result.length,
                            rows:result
                        }
                    }
                }
            });
        });

    });
};





//同步mongodb订单到mysql
exports.orderSyncToMysql = function (req, res, next) {

    let brandId = req.query.brand_id;

    let orderId = req.query.order_id;

    if (!brandId) return next(new BadRequestError('brand_id is null'));

    if (!orderId) return next(new BadRequestError('order_id is null'));

    let condition ={};

    let data = {
        orderList:[],
        articleList:[],
        paymentList:[]
    };

    restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId(brandId, (err, database_info) => {
        if (err) return next(err);
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

        async.waterfall([
            (done)=>{
                condition = {
                    $or : [
                        {id : orderId},
                        {parent_order_id : orderId},
                    ]
                };
                orderNewPosModel.getOrderDetailsByCondition(condition,(err,res_result)=>{
                    async.eachLimit(res_result, 1,  (item, cb)=> {
                        let obj = {
                            id:item.id,
                            table_number:item.table_number,
                            customer_count:item.customer_count,
                            accounting_time:item.accounting_time,
                            order_state:item.order_state,
                            production_status:item.production_status,
                            original_amount:item.original_amount,
                            reduction_amount:item.reduction_amount||0,
                            payment_amount:item.payment_amount,
                            order_money:item.order_money,
                            article_count:item.article_count,
                            serial_number:item.serial_number,
                            confirm_time:item.confirm_time,
                            print_times:item.print_times,
                            allow_cancel:item.allow_cancel,
                            allow_appraise:item.allow_appraise,
                            closed:item.closed,
                            create_time:new Date(+item.create_time),
                            operator_id:item.operator_id,
                            customer_id:item.customer_id,
                            customer_address_id:item.customer_address_id,
                            pos_discount:item.pos_discount,
                            erase_money:item.erase_money,
                            no_discount_money:item.no_discount_money,
                            group_id:item.group_id,
                            distribution_date:item.distribution_date,
                            distribution_time_id:item.distribution_time_id,
                            delivery_point_id:item.delivery_point_id,
                            shop_detail_id:item.shop_detail_id,
                            distribution_mode_id:item.distribution_mode_id,
                            ver_code:item.ver_code,
                            push_order_time:item.call_number_time?new Date(+item.push_order_time):null,
                            print_order_time:item.call_number_time?new Date(+item.print_order_time):null,
                            call_number_time: item.call_number_time?new Date(+item.call_number_time):null,
                            order_mode:item.order_mode,
                            brand_id:item.brand_id,
                            amount_with_children:item.amount_with_children,
                            parent_order_id:item.parent_order_id,
                            allow_continue_order:item.allow_continue_order,
                            count_with_child:item.count_with_child,
                            last_order_time:item.last_order_time,
                            person_count:item.person_count,
                            table_no:item.table_no,
                            employee_id:item.employee_id,
                            pay_mode:item.pay_mode,
                            service_price:item.service_price,
                            eleme_order_id:item.eleme_order_id,
                            base_money:item.base_money,
                            base_order_money:item.base_order_money,
                            base_customer_count:item.base_customer_count,
                            meal_fee_price:item.meal_fee_price,
                            meal_all_number:item.meal_all_number,
                            ali_pay_discount_money:item.ali_pay_discount_money,
                            need_scan:item.need_scan,
                            base_meal_all_count:item.base_meal_all_count,
                            pay_type:item.pay_type,
                            is_pay:item.is_pay,
                            is_confirm:item.is_confirm,
                            is_refund_order:item.is_refund_order,
                            is_get_share_coupon:item.is_get_share_coupon,
                            give_change:item.give_change,
                            is_pos_pay:item.is_pos_pay,
                            print_fail_flag:item.print_fail_flag,
                            print_kitchen_flag:item.print_kitchen_flag,
                            is_consumption_rebate:item.is_consumption_rebate,
                            rebate_time:item.rebate_time,
                            order_before:item.order_before,
                            before_id:item.before_id,
                            sauce_fee_count:item.sauce_fee_count,
                            sauce_fee_price:item.sauce_fee_price,
                            towel_fee_count:item.towel_fee_count,
                            towel_fee_price:item.towel_fee_price,
                            tableware_fee_count:item.tableware_fee_count,
                            tableware_fee_price:item.tableware_fee_price,
                            is_use_new_service:item.is_use_new_service,
                            pos_back_ups:item.pos_back_ups,
                            data_origin:item.data_origin,
                            order_pos_discount_money:item.order_pos_discount_money,
                            member_discount_money:item.member_discount_money,
                            member_discount:item.member_discount,
                            need_confirm_order_item:item.need_confirm_order_item,
                            reduce_money:item.reduce_money,
                            real_erase_money:item.real_erase_money,
                            exemption_money:item.exemption_money,
                            sync_state:item.sync_state,
                            last_sync_time:item.last_sync_time,
                            create_times:item.create_times,
                            is_add_report:item.is_add_report,
                            use_product_coupon:item.use_product_coupon,
                            order_remark_ids:item.order_remark_ids,
                            open_article_library:item.open_article_library,
                            grant_money:item.grant_money
                        }
                        brandCurrencyModel.upsertTableInfo(database,'tb_order',obj,cb)
                    }, (err)=> {
                        let orderIdArr = lodash.map(res_result, 'id');
                        done(err,{order_id :{ $in : orderIdArr}});
                    });
                })
            },
            (condition,done)=>{
                orderNewPosModel.getOrderItemPaymentDetailsByCondition(condition,(err,res_result)=>{
                    data.articleList.push(...res_result);
                    async.eachLimit(res_result, 1,  (item, cb)=> {
                        let obj = {
                            id:item.id,
                            article_name:item.article_name,
                            article_designation:item.article_designation,
                            count:item.count,
                            original_price:item.original_price,
                            unit_price:item.unit_price,
                            base_unit_price:item.base_unit_price,
                            final_price:item.final_price,
                            remark:item.remark,
                            pos_discount:item.pos_discount,
                            sort:item.sort,
                            status:item.status,
                            order_id:item.order_id,
                            article_library_id:item.article_library_id,
                            article_id:item.article_id,
                            type:item.type,
                            parent_id:item.parent_id,
                            create_time:new Date(+item.create_time),
                            meal_item_id:item.meal_item_id,
                            kitchen_id:item.kitchen_id,
                            recommend_id:item.recommend_id,
                            orgin_count:item.orgin_count,
                            refund_count:item.refund_count,
                            meal_fee_number:item.meal_fee_number,
                            change_count:item.change_count,
                            print_fail_flag:item.print_fail_flag,
                            customer_id:item.customer_id,
                            weight:item.weight,
                            need_remind:item.need_remind,
                            grant_count:item.grant_count,
                        }
                        brandCurrencyModel.upsertTableInfo(database,'tb_order_item',obj,cb)
                    }, (err)=> done(err,condition));
                })
            },
            (condition,done)=>{
                orderNewPosModel.getOrderPaymentDetailsByCondition(condition,(err,res_result)=>{
                    data.paymentList.push(...res_result);
                    async.eachLimit(res_result, 1,  (item, cb)=> {

                        let obj = {
                            id:item.id,
                            result_data:item.result_data,
                            pay_time:new Date(+item.pay_time),
                            pay_value:item.pay_value,
                            remark:item.remark,
                            payment_mode_id:item.payment_mode_id,
                            order_id:item.order_id,
                            is_use_bonus:item.is_use_bonus,
                            to_pay_id:item.to_pay_id,
                            coupon_article_id:item.coupon_article_id,
                            refund_source_id:item.refund_source_id,
                        }
                        brandCurrencyModel.upsertTableInfo(database,'tb_order_payment_item',obj,cb)
                    }, (err)=> done(err));

                })
            },
        ],(err)=>{
            if(err)  return next(err);

            res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: '同步到线上成功',
                    data:{
                        order_id:orderId
                    }
                }
            });
        });

    });


};
