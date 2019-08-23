/**
 * @author wxh on 2019/1/22
 * @copyright
 * @desc
 */
const restoBrandModel = require('../../public/model/restoBrand/index');

const brandCurrencyModel = require('../../public/model/brandCurrency/index');


const dailyKnotsModel = require('../../public/model/newpos/dailyKnots');
const uuid = require('uuid/v4');
const async = require('async');
const _ = require('lodash');
const moment = require('moment');


/**
 *  @desc newpos请求结店
 * */
exports.newPosDailyKnotsRecord = function (req, res, next) {

    let brandId = req.body.brand_id;
    let shopId = req.body.shop_id;
    let date = req.body.date;
    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!shopId) return next(new BadRequestError('shop_id is null'));

    if (!date  ||!(date.match(/^(\d{4})(-)(\d{2})(-)(\d{2})$/))) return next(new BadRequestError('date is null or 如:2017-01-01'));
    let id = uuid().replace(new RegExp("-","g"),"");
    let obj = {
        brand_id:brandId,
        type:1,
        date:date,
        create_time:new Date(),
        shop_detail_id:shopId,
        update_time:new Date()
    };

    restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId(brandId, (err, database_info) => {
        if (err) return next(err);
        if (!database_info) {
            return res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: '失败成功！未找到对应的库'
                }
            });
        }
        let database = database_info.mysql_client;

        async.parallel({
            createPosDailyKnots: (done)=>{
                dailyKnotsModel.updatePosDailyKnots(id,obj,done)
            },
            statistics: (done)=>{
                async.parallel({
                    resto: (af)=>{   //堂吃/外带
                        let sql = `SELECT id,distribution_mode_id,customer_id,customer_count,order_state,production_status,order_money,amount_with_children, (erase_money+order_pos_discount_money+member_discount_money+exemption_money) discount  
                         from tb_order WHERE (parent_order_id =''  or parent_order_id is null) and order_state in(2,10,11) and production_status !=6 
                         and  accounting_time = '${date}' and shop_detail_id = '${shopId}' order by create_time asc`;
                        brandCurrencyModel.getAllCustomSqlInfo(database,`${sql}`,(err,order_info)=>{
                            if(err)  return af(err);
                            let tc_turnover_total = _.sumBy(order_info,(o)=>{                   //营业额  -总
                                return (+o.amount_with_children || +o.order_money)+ (+o.discount)
                            });
                            let tc_effective_orders =  order_info.length;               //有效订单
                            let tc_order_average = +(tc_turnover_total / (tc_effective_orders == 0? 1:tc_effective_orders)).toFixed(2); //订单平均
                            let tc_customer_number = _.sumBy(order_info,'customer_count');      //顾客数
                            let tc_customer_average = +(tc_turnover_total / (tc_customer_number == 0? 1:tc_customer_number)).toFixed(2); //顾客平均
                            let week_day = `${moment(`${date}`).format('d')}`;          //周几

                            let arr_master_id = _.map(order_info, (o)=>`'${o.id}'`);
                            let payment_details = [];

                            let tc_real_income = 0;                                             //实际收入

                            let tc_discount = _.sumBy(order_info,(o)=>+o.discount);              //折扣收入

                            let customer_score = 0;                                             //顾客评分
                            let customer_score_details = [];                                    //顾客评分详情

                            async.waterfall([
                                (cb)=>{ //查询顾客评分数据
                                    let appraise_sql = `SELECT o.distribution_mode_id,a.level FROM tb_appraise a
                                    left join tb_order o on o.id = a.order_id WHERE a.shop_detail_id = '${shopId}'  and o.accounting_time = '${date}'`;
                                    brandCurrencyModel.getAllCustomSqlInfo(database,`${appraise_sql}`,(err,resl)=>{
                                        if(err) return  cb(err);
                                        customer_score = (((_.sumBy(resl,'level') ||1) /(resl.length == 0? 1:resl.length * 5)) * 100).toFixed(2) ; //顾客评分
                                        customer_score_details.push(...resl);
                                        cb()
                                    })
                                },
                                (cb)=>{ //查询子订单id
                                    if(arr_master_id.length == 0) return cb(null,[]);
                                    let son_sql = `SELECT id from tb_order WHERE parent_order_id in (${arr_master_id.join(',')})`;
                                    brandCurrencyModel.getAllCustomSqlInfo(database,`${son_sql}`,cb)
                                },
                                (order_son_id,cb)=>{ //查询支付项
                                    arr_master_id.push(..._.map(order_son_id,(o)=>`'${o.id}'`));

                                    if(arr_master_id.length == 0) return cb(null,[]);
                                    let pay_sql = `SELECT pay_value,payment_mode_id FROM tb_order_payment_item  WHERE order_id in(${arr_master_id.join(',')}) and payment_mode_id not in (13,14,15)`;
                                    brandCurrencyModel.getAllCustomSqlInfo(database,`${pay_sql}`,cb)
                                }
                            ],(err, pay_result)=>{
                                if(err) return  af(err);

                                payment_details.push(...pay_result);
                                _.filter(pay_result,  (o)=>{
                                    if([2,3,7,8,11,17,26,28].indexOf(o.payment_mode_id)!=-1){
                                        tc_discount += +o.pay_value;
                                    }else {
                                        tc_real_income += +o.pay_value;
                                    }
                                });

                                let obj = {
                                    type:1,
                                    turnover_total:tc_turnover_total,
                                    effective_orders:tc_effective_orders,
                                    order_average:tc_order_average,
                                    customer_number:tc_customer_number,
                                    customer_average:tc_customer_average,
                                    week_day:week_day,
                                    real_income:tc_real_income,
                                    discount:tc_discount,
                                    payment_details:payment_details,
                                    customer_score:customer_score,
                                    customer_score_details:customer_score_details,
                                    brand_id:brandId,
                                    shop_detail_id:shopId,
                                    date:date,
                                    create_time:new Date(),
                                    update_time:new Date()
                                };
                                let where = {
                                    type:1,
                                    date:date,
                                    brand_id:brandId,
                                    shop_detail_id:shopId
                                };
                                dailyKnotsModel.createPosBusinessStatistics(where,obj,af);      //存储堂吃信息
                            });
                        });
                    },
                    delivery: (af)=>{ //外卖
                        af(null, '2')
                    },
                },done);
            },
        },(err)=>{

            if (err)  return next(err);
            res.json({
                flag: '0000',
                msg: '',
                result: {
                    ok: true,
                    message: '结店成功！'
                }
            });
        });
    });
};