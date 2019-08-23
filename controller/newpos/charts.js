/**
 * @author wxh on 2019/1/25
 * @copyright
 * @desc
 */


const restoBrandModel = require('../../public/model/restoBrand/index');
const brandCurrencyModel = require('../../public/model/brandCurrency/index');
const brandCurrencyOrderModel = require('../../public/model/brandCurrency/order');


const chartsModel = require('../../public/model/newpos/charts');
const paymentModel = require('../../public/model/admin/payment');

const util = require('../../lib/util');

const moment = require('moment');
const async = require('async');
const _ = require('lodash');

/**
 * 获取日 营业统计
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getDayBusinessStatisticsByDate = function (req, res, next) {

    let brandId = req.query.brand_id;
    let shopId = req.query.shop_id;
    let date = req.query.date ||`${moment().format('YYYY-MM-DD')}`;

    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!shopId) return next(new BadRequestError('shopId is null'));

    let condition ={date};



    async.parallel({
        payment_list: (done)=>{
            paymentModel.constantList({type:1},done);
        },
        getDayBusinessStatisticsByDate: (done)=>{
            chartsModel.getDayBusinessStatisticsOneByCondition(condition,done);
        },
        getLastYesterdayBusinessStatisticsByDate: (done)=>{ //昨天
            condition.date = `${moment(date).subtract(1,'days').format('YYYY-MM-DD')}`;
            chartsModel.getDayBusinessStatisticsOneByCondition(condition,done);
        },
        getLastWeekDayBusinessStatisticsByDate: (done)=>{   //7天前
            condition.date = `${moment(date).subtract(7,'days').format('YYYY-MM-DD')}`;
            chartsModel.getDayBusinessStatisticsOneByCondition(condition,done);
        }
    },(err, results)=>{

        if (err)  return next(err);
        let real_payment = [];                                  //实际收入支付项
        let discount_payment = [];                              //折扣收入支付项


        if(results.getDayBusinessStatisticsByDate){
            _.map(results.getDayBusinessStatisticsByDate.payment_details || [],(o)=>{
                o.pay_value = +(+o.pay_value).toFixed(2);
                o.name = (_.find(results.payment_list, { 'code': o.payment_mode_id})).name;
                if([2,3,7,8,11,17,26,28].indexOf(o.payment_mode_id)!=-1){
                    let discount_data = _.find(discount_payment, { 'payment_mode_id': o.payment_mode_id});
                    discount_data ? discount_data.pay_value+=o.pay_value : discount_payment.push(o);
                }else {
                    let real_data = _.find(real_payment, { 'payment_mode_id': o.payment_mode_id});
                    real_data ? real_data.pay_value+=o.pay_value : real_payment.push(o);
                }
            });
        }


        let currentData     = results.getDayBusinessStatisticsByDate;             //当天数据
        let yesterdayDate   = results.getLastYesterdayBusinessStatisticsByDate;   //昨天数据
        let lastWeekDate    = results.getLastWeekDayBusinessStatisticsByDate;     //上周当天数据

        let discount_total = currentData?+currentData.discount.toFixed(2):0;

        let payment_discount_total = _.sumBy(discount_payment,'pay_value');

        if(discount_total>0 && discount_total>payment_discount_total){
            discount_payment.push({
                "pay_value": +(discount_total - payment_discount_total).toFixed(2),
                "payment_mode_id": 0,
                "name": "POS折扣"
            })
        }
        let obj  = {
            turnover_total:currentData?currentData.turnover_total: 0 ,                                                                                  //总营业额
            last_week_turnover_total:+((currentData?currentData.turnover_total: 0)       - (lastWeekDate?lastWeekDate.turnover_total: 0)).toFixed(2),        //同比上周营业额

            effective_orders:currentData?currentData.effective_orders : 0,                                                                              //有效订单
            last_week_effective_orders:+((currentData?currentData.effective_orders : 0)  - (lastWeekDate?lastWeekDate.effective_orders:0)).toFixed(2),       //同比上周有效订单

            customer_number:currentData?currentData.customer_number: 0,                                                                                 //顾客数量
            last_week_customer_number:(currentData?currentData.customer_number:0)        - (lastWeekDate?lastWeekDate.customer_number : 0),                  //同比上周顾客数量

            customer_score:currentData?currentData.customer_score :0,                                                                                   //顾客满意度
            ayer_customer_score:+((currentData?currentData.customer_score :0)       - (yesterdayDate?yesterdayDate.customer_score :0)).toFixed(2),        //同比昨天顾客满意度

            real_payment_details        :real_payment,                                                                                 //实际支付项详情
            discount_payment_details    :discount_payment,                                                                            //折扣支付项详情

            real_income:currentData?+currentData.real_income.toFixed(2) :0,                                                                             //实际收入
            ayer_real_income:+((currentData?currentData.real_income :0)       - (yesterdayDate?yesterdayDate.real_income :0)).toFixed(2),               //同比昨天实际收入

            discount:currentData?+currentData.discount.toFixed(2) :0,                                                                                   //折扣收入
            ayer_discount:+((currentData?currentData.discount :0)       - (yesterdayDate?yesterdayDate.discount :0)).toFixed(2),                        //同比昨天折扣收入

            add_appraise:currentData?(currentData.customer_score_details).length:0,                                                                     //今日新增评论
            ayer_add_appraise:+(currentData?(currentData.customer_score_details).length:0) -  (yesterdayDate?(yesterdayDate.customer_score_details).length:0), //同比昨天新增评论

            add_appraise_rank:currentData?(_.filter(currentData.customer_score_details, (o)=> { return o.level>=3})).length:0,                          //今日新增1-3星评论
            ayer_add_appraise_rank:+(currentData?(_.filter(currentData.customer_score_details, (o)=> { return o.level>=3})).length:0) - (yesterdayDate?(_.filter(yesterdayDate.customer_score_details, (o)=> { return o.level>=3})).length:0), //同比昨天新增1-3星评论

        };

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '成功!',
                data:obj
            }
        });
    });
};

/**
 * 根据日期获取两周前趋势分析
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getTrendAnalysisTwoWeeksByDate = function (req, res, next) {

    let brandId = req.query.brand_id;
    let shopId = req.query.shop_id;
    let date = req.query.date ||`${moment().format('YYYY-MM-DD')}`;

    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!shopId) return next(new BadRequestError('shopId is null'));

    let condition ={
        date:{$gte: `${moment(date).subtract(13,'days').format('YYYY-MM-DD')}`, $lte: date}
    };
    console.log(`-----condition------`,condition)
    chartsModel.getBusinessStatisticsByCondition(condition,(err,result)=>{
        if (err)  return next(err);
        let xAxis = {
            type : 'category',
            boundaryGap : false,
            data : util.getBetweenDateStr(`${moment(date).subtract(13,'days').format('YYYY-MM-DD')}`,date)
        };
        let series = [
            {
                name:'营业额',
                type:'line',
                data:[]
            },
            {
                name:'满意度',
                type:'line',
                data:[]
            },
            {
                name:'单均',
                type:'line',
                data:[]
            },
            {
                name:'人均',
                type:'line',
                data:[]
            },
        ];
        _.map(xAxis.data,(o)=>{
            let obj = _.find(result, { 'date': o});
            if(obj){
                series[0].data.push(obj.turnover_total);
                series[1].data.push(obj.customer_score);
                series[2].data.push(obj.order_average);
                series[3].data.push(obj.customer_average);
            }else {
                series[0].data.push(0);
                series[1].data.push(0);
                series[2].data.push(0);
                series[3].data.push(0);
            }
        });
        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '成功!',
                data:{
                    xAxis:xAxis,
                    series:series
                }
            }
        });

    });
};


/**
 * 根据日期获取当日分时趋势分析
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getTrendAnalysisTimeSharingByDate = function (req, res, next) {

    let brandId = req.query.brand_id;
    let shopId = req.query.shop_id;
    let date = req.query.date ||`${moment().format('YYYY-MM-DD')}`;

    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!shopId) return next(new BadRequestError('shopId is null'));

    let condition ={
        date:date,
        shopId:shopId
    };

    let sql = `SELECT d.*,b.brand_sign from brand  b left join database_config d on d.id = b.database_config_id where b.id = '${brandId}'`;

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

        brandCurrencyModel.getAllPaidOrdersInfo(database,condition,(err,order_list)=>{
            if(err) return next(err);

            let timeArr =  ((_.range(0, 25, 2)).splice(3)).concat(_.range(0, 25, 2).splice(0,3));
            let xAxis = {
                type : 'category',
                boundaryGap : false,
                data :_.map(timeArr,(o)=>`${o}点`)
            };

            let series = [
                {
                    name:'营业额',
                    type:'line',
                    data:[]
                },
                {
                    name:'订单数',
                    type:'line',
                    data:[]
                }];

            for (var i=0;i<timeArr.length;i++){
                let st = timeArr[i == 0?timeArr.length-1:i-1];
                let et = timeArr[i];

                let data_t = _.filter(order_list,  (o)=> {
                    let startTime = new Date(`${date} ${st<10?'0'+st:st}:00:00`);
                    let endTime = new Date(`${date} ${et<10?'0'+et:et}:00:00`)
                    if(o.create_time >= startTime && o.create_time < endTime ){
                        return o;
                    }
                });

                let yee = _.sumBy(data_t, (o)=> {
                    if(+o.amount_with_children>0){
                        return (+o.amount_with_children)+(+o.discount)
                    }else {
                        return (+o.order_money)+(+o.discount)
                    }
                });
                series[0].data.push(+yee.toFixed(2));
                series[1].data.push(data_t.length)
            }
            res.json({
                flag: '0000',
                msg: '',
                result: {
                    ok: true,
                    message: '成功!',
                    data:{
                        xAxis:xAxis,
                        series:series
                    }
                }
            });

        })

    })

};



/**
 * 根据日期获取菜品统计
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getTrendAnalysisArticleStatisticsByDate = function (req, res, next) {

    let brandId = req.query.brand_id;
    let shopId = req.query.shop_id;
    let date = req.query.date ||`${moment().format('YYYY-MM-DD')}`;

    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!shopId) return next(new BadRequestError('shopId is null'));

    let condition ={
        date:date,
        shopId:shopId
    };

    let sql = `SELECT d.*,b.brand_sign from brand  b left join database_config d on d.id = b.database_config_id where b.id = '${brandId}'`;

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

        brandCurrencyOrderModel.getAllPaidOrderArticleNameInfoByDate(database,condition,(err,article_list)=>{
            if(err) return next(err);


            async.map(article_list, (article, cb)=>{
                condition.article_name = article.article_name;
                brandCurrencyOrderModel.getOnePaidOrderArticleAppraiseInfoByDate(database,condition,(err,res_d)=>{
                    if(err) return cb(err);
                    article.count           = +article.count;
                    article.total_price     = +((+article.total_price).toFixed(2));
                    article.appraise_count  = res_d.appraise_count;
                    cb()
                })
            }, (err)=>{
                if(err)  return next(err);
                res.json({
                    flag: '0000',
                    msg: '',
                    result: {
                        ok: true,
                        message: '成功!',
                        data:article_list
                    }
                });
            });




        })

    })

};