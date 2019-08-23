/**
 * @author wxh on 2018/12/26
 * @copyright
 * @desc
 */
const restoBrandModel = require('../../public/model/restoBrand/index');
const brandCurrencyModel = require('../../public/model/brandCurrency/index');
const brandCurrencyCustomerModel = require('../../public/model/brandCurrency/customer');


const async = require('async');
const _ = require('lodash');
const moment = require('moment');

const util = require('util');

/**
 * 获取微信会员信息
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getCustomerInfoList = function (req, res, next) {

    let brandId = req.query.brand_id;
    let sex = req.query.sex;  // 1 男、2女 3未知

    let content = req.query.content;  // 手机号码或昵称

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    let condition = "";

    if (!brandId) return next(new BadRequestError('brand_id is null'));

    if (sex) {
        condition += `c.sex in (${sex.join(',')}) `;
    }

    if (content) {
        condition += `${sex ? 'and ' : ''} (c.id like '%${content}%' or c.telephone like  '%${content}%' or c.nickname like  '%${content}%') `;
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
        async.parallel({
            count: (done) => {
                let sql = `select count(*) count from tb_customer c ${condition ? 'where ' + condition + ' and ' : 'where '} id is not null and id !=""`;
                brandCurrencyModel.getOneCustomSqlInfoNew(database, sql, done)
            },
            list: (done) => {
                let sql = `SELECT c.id,c.nickname,c.telephone,c.is_bind_phone,c.regiest_time,c.city,c.sex,c.account_id ,c.share_customer,c.customer_detail_id ,c.bind_phone_time ,c.last_login_time   from tb_customer c ${condition ? 'where ' + condition + ' and ' : 'where '} id is not null and id !=""  order by c.last_login_time limit ${pageSize} offset ${pageSkip}`;
                brandCurrencyModel.getAllCustomSqlInfoNew(database, sql, (err, customer_list) => {
                    if (err) return done(err);
                    let arr_customer_id = [];
                    let arr_account_id = [];
                    let arr_share_customer = [];
                    let arr_customer_detail_id = [];

                    if (customer_list.length == 0) return done(null, customer_list);
                    _.forEach(customer_list, (value) => {
                        arr_customer_id.push(`'${value.id}'`);
                        arr_account_id.push(`'${value.account_id}'`);
                        arr_account_id.push(`'${value.account_id}'`);
                        arr_share_customer.push(`'${value.share_customer}'`);
                        arr_customer_detail_id.push(`'${value.customer_detail_id}'`)

                    });
                    async.parallel({    //余额
                        remain: (cb) => {
                            let remain_sql = `SELECT id,remain FROM tb_account WHERE id in (${arr_account_id.join(',')})`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, remain_sql, cb)
                        },
                        share_telephone: (cb) => { //被邀请人手机号码
                            let share_telephone_sql = `SELECT id,telephone share_telephone  FROM tb_customer WHERE  id in (${arr_share_customer.join(',')})`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, share_telephone_sql, cb)
                        },
                        customer_detail: (cb) => { //用户详情
                            let customer_detail_sql = `SELECT id,birth_date  FROM tb_customer_detail WHERE  id in (${arr_customer_detail_id.join(',')})`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, customer_detail_sql, cb)
                        },
                        coupon_count: (cb) => { //用户礼品卷总数
                            let coupon_count_sql = `SELECT customer_id, count(*) coupon_count FROM tb_coupon where customer_id in (${arr_customer_id.join(',')}) GROUP BY customer_id`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, coupon_count_sql, cb)
                        },
                        appraise_count: (cb) => { //用户评论总数
                            let appraise_count_sql = `SELECT customer_id, count(*) appraise_count  FROM tb_appraise where customer_id in (${arr_customer_id.join(',')}) GROUP BY customer_id`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, appraise_count_sql, cb)
                        },
                        order_money_count: (cb) => { //用户金额总量
                            let order_money_count_sql = `SELECT customer_id,  sum(order_money) order_money_count  FROM tb_order where customer_id in (${arr_customer_id.join(',')}) and order_state !=9 and production_status !=6 GROUP BY customer_id`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, order_money_count_sql, cb)
                        },
                        order_count: (cb) => { //用户订单总量
                            let order_count_sql = `SELECT customer_id,  count(*) order_count  FROM tb_order where customer_id in (${arr_customer_id.join(',')}) and (parent_order_id is null or parent_order_id !='' )  and  order_state !=9 and production_status !=6  GROUP BY customer_id`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, order_count_sql, cb)
                        }
                    }, (err, customer_results) => {
                        if (err) return next(err);

                        _.forEach(customer_list, (value) => {
                            let remain_result = _.find(customer_results.remain, {id: value.account_id});
                            if (remain_result) {
                                value.remain = remain_result.remain;
                            }

                            let share_telephone_result = _.find(customer_results.share_telephone, {id: value.share_customer});
                            if (share_telephone_result) {
                                value.share_telephone = share_telephone_result.share_telephone;
                            } else {
                                value.share_telephone = '';
                            }

                            let customer_detail_result = _.find(customer_results.customer_detail, {id: value.customer_detail_id});
                            if (customer_detail_result) {
                                value.birth_date = customer_detail_result.birth_date;
                            } else {
                                value.birth_date = '';
                            }

                            let coupon_count_result = _.find(customer_results.coupon_count, {customer_id: value.id});
                            if (coupon_count_result) {
                                value.coupon_count = coupon_count_result.coupon_count;
                            } else {
                                value.coupon_count = 0;
                            }

                            let appraise_count_result = _.find(customer_results.appraise_count, {customer_id: value.id});
                            if (appraise_count_result) {
                                value.appraise_count = appraise_count_result.appraise_count;
                            } else {
                                value.appraise_count = 0;
                            }

                            let order_money_count_result = _.find(customer_results.order_money_count, {customer_id: value.id});
                            if (order_money_count_result) {
                                value.order_money_count = order_money_count_result.order_money_count;
                            } else {
                                value.order_money_count = 0;
                            }

                            let order_count_result = _.find(customer_results.order_count, {customer_id: value.id});

                            if (order_count_result) {
                                value.order_count = order_count_result.order_count;
                            } else {
                                value.order_count = 0;
                            }

                            value.mean = value.order_count == 0 ? 0 : (value.order_money_count / value.order_count).toFixed(2);

                            value.is_bind_phone = (value.is_bind_phone.toJSON()).data[0];

                            if (value.telephone) {
                                value.telephone = value.telephone.substr(0, 3) + "****" + value.telephone.substr(7)
                            }

                            if (value.share_telephone) {
                                value.share_telephone = value.share_telephone.substr(0, 3) + "****" + value.share_telephone.substr(7)
                            }

                            value.wechat_url_qp = `http://${database_info.brand_sign}.restoplus.cn/wechat/index?web=open&qiehuan=qiehuan&userId=${value.id}`;

                        });
                        return done(null, customer_list)
                    });
                })
            },
        }, function (err, results) {
            if (err) return next(err);
            res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: '',
                    data: {
                        count: results.count.count,
                        list: results.list
                    }
                }
            });
        });
    });
};


/**
 * 根据Id获取微信会员信息
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getCustomerInfoById = function (req, res, next) {

    let brandId = req.query.brand_id;
    let customer_id = req.query.customer_id;  // id

    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!customer_id) return next(new BadRequestError('customer_id is null'));

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
            count: (done) => {
                let sql = `select count(*) count from tb_customer c where c.id ='${customer_id}'`;
                brandCurrencyModel.getOneCustomSqlInfoNew(database, sql, done)
            },
            list: (done) => {
                let sql = `SELECT c.id,c.nickname,c.telephone,c.is_bind_phone,c.regiest_time,c.city,c.sex,c.account_id ,c.share_customer,c.customer_detail_id ,c.bind_phone_time ,c.last_login_time   from tb_customer c where c.id ='${customer_id}'`;
                brandCurrencyModel.getAllCustomSqlInfoNew(database, sql, (err, customer_list) => {
                    if (err) return done(err);
                    let arr_customer_id = [];
                    let arr_account_id = [];
                    let arr_share_customer = [];
                    let arr_customer_detail_id = [];

                    if (customer_list.length == 0) return done(null, customer_list);
                    _.forEach(customer_list, (value) => {
                        arr_customer_id.push(`'${value.id}'`);
                        arr_account_id.push(`'${value.account_id}'`);
                        arr_account_id.push(`'${value.account_id}'`);
                        arr_share_customer.push(`'${value.share_customer}'`);
                        arr_customer_detail_id.push(`'${value.customer_detail_id}'`)

                    });
                    async.parallel({    //余额
                        remain: (cb) => {
                            let remain_sql = `SELECT id,remain FROM tb_account WHERE id in (${arr_account_id.join(',')})`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, remain_sql, cb)
                        },
                        share_telephone: (cb) => { //被邀请人手机号码
                            let share_telephone_sql = `SELECT id,telephone share_telephone  FROM tb_customer WHERE  id in (${arr_share_customer.join(',')})`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, share_telephone_sql, cb)
                        },
                        customer_detail: (cb) => { //用户详情
                            let customer_detail_sql = `SELECT id,birth_date  FROM tb_customer_detail WHERE  id in (${arr_customer_detail_id.join(',')})`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, customer_detail_sql, cb)
                        },
                        coupon_count: (cb) => { //用户礼品卷总数
                            let coupon_count_sql = `SELECT customer_id, count(*) coupon_count FROM tb_coupon where customer_id in (${arr_customer_id.join(',')}) GROUP BY customer_id`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, coupon_count_sql, cb)
                        },
                        appraise_count: (cb) => { //用户评论总数
                            let appraise_count_sql = `SELECT customer_id, count(*) appraise_count  FROM tb_appraise where customer_id in (${arr_customer_id.join(',')}) GROUP BY customer_id`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, appraise_count_sql, cb)
                        },
                        order_money_count: (cb) => { //用户金额总量
                            let order_money_count_sql = `SELECT customer_id,  sum(order_money) order_money_count  FROM tb_order where customer_id in (${arr_customer_id.join(',')}) and order_state !=9 and production_status !=6 GROUP BY customer_id`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, order_money_count_sql, cb)
                        },
                        order_count: (cb) => { //用户订单总量
                            let order_count_sql = `SELECT customer_id,  count(*) order_count  FROM tb_order where customer_id in (${arr_customer_id.join(',')}) and (parent_order_id is null or parent_order_id !='' )  and  order_state !=9 and production_status !=6  GROUP BY customer_id`;
                            brandCurrencyModel.getAllCustomSqlInfoNew(database, order_count_sql, cb)
                        }
                    }, (err, customer_results) => {
                        if (err) return next(err);

                        _.forEach(customer_list, (value) => {
                            let remain_result = _.find(customer_results.remain, {id: value.account_id});
                            if (remain_result) {
                                value.remain = remain_result.remain;
                            }

                            let share_telephone_result = _.find(customer_results.share_telephone, {id: value.share_customer});
                            if (share_telephone_result) {
                                value.share_telephone = share_telephone_result.share_telephone;
                            } else {
                                value.share_telephone = '';
                            }

                            let customer_detail_result = _.find(customer_results.customer_detail, {id: value.customer_detail_id});
                            if (customer_detail_result) {
                                value.birth_date = customer_detail_result.birth_date;
                            } else {
                                value.birth_date = '';
                            }

                            let coupon_count_result = _.find(customer_results.coupon_count, {customer_id: value.id});
                            if (coupon_count_result) {
                                value.coupon_count = coupon_count_result.coupon_count;
                            } else {
                                value.coupon_count = 0;
                            }

                            let appraise_count_result = _.find(customer_results.appraise_count, {customer_id: value.id});
                            if (appraise_count_result) {
                                value.appraise_count = appraise_count_result.appraise_count;
                            } else {
                                value.appraise_count = 0;
                            }

                            let order_money_count_result = _.find(customer_results.order_money_count, {customer_id: value.id});
                            if (order_money_count_result) {
                                value.order_money_count = order_money_count_result.order_money_count;
                            } else {
                                value.order_money_count = 0;
                            }

                            let order_count_result = _.find(customer_results.order_count, {customer_id: value.id});

                            if (order_count_result) {
                                value.order_count = order_count_result.order_count;
                            } else {
                                value.order_count = 0;
                            }

                            value.mean = value.order_count == 0 ? 0 : (value.order_money_count / value.order_count).toFixed(2);

                            value.is_bind_phone = (value.is_bind_phone.toJSON()).data[0];

                            if (value.telephone) {
                                value.telephone = value.telephone.substr(0, 3) + "****" + value.telephone.substr(7)
                            }

                            if (value.share_telephone) {
                                value.share_telephone = value.share_telephone.substr(0, 3) + "****" + value.share_telephone.substr(7)
                            }

                            value.wechat_url_qp = `http://${database_info.brand_sign}.restoplus.cn/wechat/index?web=open&qiehuan=qiehuan&userId=${value.id}`;

                        });
                        return done(null, customer_list)
                    });
                })
            },
        }, function (err, results) {
            if (err) return next(err);
            res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: '',
                    data: {
                        count: results.count.count,
                        list: results.list
                    }
                }
            });
        });
    });
};


/**
 * 根据 customer_id 或手机号码 获取订单信息
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.getWeChatOrderByCustomerIdOrPhone = function (req, res, next) {

    let brandId = req.query.brand_id;
    let content = req.query.content;
    let condition = {};

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    if (!brandId) return next(new BadRequestError('brand_id is null'));


    if (content) {
        condition = {
            $or: [
                {id: {"$like": `${content}%`}},
                {telephone: {"$like": `${content}%`}}
            ]
        };
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

        brandCurrencyCustomerModel.getOneCustomerInfo(database, condition, pageSkip, pageSize, (err, customer) => {
            if (err) return next(err);
            if (!customer) {
                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: true,
                        message: '未查询到该用户信息',
                        count: 0,
                        list: []
                    }
                });
            }

            async.parallel({
                store: (done) => {
                    let sql = `select sm.name mode, sd.*,b.brand_name,b.brand_sign from shop_detail sd 
                        left join brand  b on b.id = sd.brand_id 
                        left join shop_mode sm on sm.id = sd.shop_mode
                        where   sd.brand_id = '${brandId}';`;
                    restoBrandModel.getAllCustomSqlInfo(sql, done)
                },
                count: (done) => {
                    let sql = `SELECT count(id) count from tb_order WHERE customer_id = '${customer.id}' `;
                    brandCurrencyModel.getOneCustomSqlInfoNew(database, sql, done)
                },
                list: (done) => {
                    let sql = `SELECT * from tb_order WHERE customer_id = '${customer.id}' order by create_time DESC limit ${pageSize} offset ${pageSkip}`;
                    brandCurrencyModel.getAllCustomSqlInfoNew(database, sql, done)
                }
            }, function (err, results) {
                if (err) return next(err);
                results.list.map((value) => {
                    let store = _.find(results.store, {'id': value.shop_detail_id});
                    value.brand_name = store.brand_name;
                    value.shop_name = store.name;
                    value.shop_mode = store.mode;

                    value.allow_cancel = value.allow_cancel ? (value.allow_cancel.toJSON()).data[0] : 1;
                    value.allow_appraise = value.allow_appraise ? (value.allow_appraise.toJSON()).data[0] : 0;
                    value.closed = value.closed ? (value.closed.toJSON()).data[0] : 0;
                    value.allow_continue_order = value.allow_continue_order ? (value.allow_continue_order.toJSON()).data[0] : 0;
                    value.is_get_share_coupon = value.is_get_share_coupon ? (value.is_get_share_coupon.toJSON()).data[0] : 0;
                    value.is_pos_pay = value.is_pos_pay ? (value.is_pos_pay.toJSON()).data[0] : 0;
                    value.is_use_new_service = value.is_use_new_service ? (value.is_use_new_service.toJSON()).data[0] : 0;
                    value.need_confirm_order_item = value.need_confirm_order_item ? (value.need_confirm_order_item.toJSON()).data[0] : 0;
                    value.sync_state = value.sync_state ? (value.sync_state.toJSON()).data[0] : 0;
                    value.use_product_coupon = value.use_product_coupon ? (value.use_product_coupon.toJSON()).data[0] : 0;
                    value.open_article_library = value.open_article_library ? (value.open_article_library.toJSON()).data[0] : 0;
                });
                res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: true,
                        message: '',
                        data: {
                            count: results.count.count,
                            list: results.list
                        }
                    }
                });
            });
        })

    });
};


/**
 * 根据 customer_id 或手机号码 获取充值信息
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.getWeChatChargeByCustomerIdOrPhone = function (req, res, next) {

    let brandId = req.query.brand_id;
    let content = req.query.content;
    let condition = {};

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    if (!brandId) return next(new BadRequestError('brand_id is null'));


    if (content) {
        condition = {
            $or: [
                {id: {"$like": `%${content}%`}},
                {telephone: {"$like": `%${content}%`}}
            ]
        };
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

        brandCurrencyCustomerModel.getOneCustomerInfo(database, condition, pageSkip, pageSize, (err, customer) => {
            if (err) return next(err);
            if (!customer) {
                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: true,
                        message: '未查询到该用户信息',
                        count: 0,
                        list: []
                    }
                });
            }

            async.parallel({
                store: (done) => {
                    let sql = `select sm.name mode, sd.*,b.brand_name,b.brand_sign from shop_detail sd 
                        left join brand  b on b.id = sd.brand_id 
                        left join shop_mode sm on sm.id = sd.shop_mode
                        where    sd.brand_id = '${brandId}';`;
                    restoBrandModel.getAllCustomSqlInfo(sql, done)
                },
                count: (done) => {
                    let sql = `SELECT count(id) count from tb_charge_order WHERE customer_id = '${customer.id}' and order_state = 1`;
                    brandCurrencyModel.getOneCustomSqlInfoNew(database, sql, done)
                },
                list: (done) => {
                    let sql = `SELECT * from tb_charge_order WHERE customer_id = '${customer.id}' and order_state = 1 order by create_time DESC limit ${pageSize} offset ${pageSkip}`;
                    brandCurrencyModel.getAllCustomSqlInfoNew(database, sql, done)
                }
            }, function (err, results) {
                if (err) return next(err);
                results.list.map((value) => {
                    let store = _.find(results.store, {'id': value.shop_detail_id});
                    value.brand_name = store.brand_name;
                    value.shop_name = store.name;
                    value.shop_mode = store.mode;

                    let m1 = moment(new Date(value.create_time)),
                        m2 = moment(new Date(value.finish_time)),
                        du = moment.duration(m2 - m1, 'ms');
                    value.arrival_days = du.locale('zh-cn').days()
                });
                res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: true,
                        message: '',
                        data: {
                            count: results.count.count,
                            list: results.list
                        }
                    }
                });
            });
        })

    });
};

/**
 * 根据 customer_id 或手机号码 获取评论信息
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.getWeChatAppraiseByCustomerIdOrPhone = function (req, res, next) {

    let brandId = req.query.brand_id;
    let content = req.query.content;
    let condition = {};

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    if (!brandId) return next(new BadRequestError('brand_id is null'));


    if (content) {
        condition = {
            $or: [
                {id: {"$like": `${content}%`}},
                {telephone: {"$like": `${content}%`}}
            ]
        };
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

        brandCurrencyCustomerModel.getOneCustomerInfo(database, condition, pageSkip, pageSize, (err, customer) => {
            if (err) return next(err);
            if (!customer) {
                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: true,
                        message: '未查询到该用户信息',
                        count: 0,
                        list: []
                    }
                });
            }

            async.parallel({
                store: (done) => {
                    let sql = `select sm.name mode, sd.*,b.brand_name,b.brand_sign from shop_detail sd 
                        left join brand  b on b.id = sd.brand_id 
                        left join shop_mode sm on sm.id = sd.shop_mode
                        where   sd.brand_id = '${brandId}';`;
                    restoBrandModel.getAllCustomSqlInfo(sql, done)
                },
                count: (done) => {
                    let sql = `SELECT count(id) count from tb_appraise WHERE customer_id = '${customer.id}' and status = 1`;
                    brandCurrencyModel.getOneCustomSqlInfoNew(database, sql, done)
                },
                list: (done) => {
                    let sql = `SELECT ap.* ,o.serial_number FROM tb_appraise ap left JOIN tb_order o on ap.order_id = o.id  WHERE ap.customer_id = '${customer.id}' and ap.status =  1  order by create_time DESC limit ${pageSize} offset ${pageSkip}`;
                    brandCurrencyModel.getAllCustomSqlInfoNew(database, sql, done)
                }
            }, function (err, results) {
                if (err) return next(err);
                results.list.map((value) => {
                    let store = _.find(results.store, {'id': value.shop_detail_id});
                    value.brand_name = store.brand_name;
                    value.shop_name = store.name;
                    value.shop_mode = store.mode;
                });
                res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: true,
                        message: '',
                        data: {
                            count: results.count.count,
                            list: results.list
                        }
                    }
                });
            });
        })
    });
};


/**
 * 根据 customer_id 或手机号码 获取优惠卷信息
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.getWeChatCouponByCustomerIdOrPhone = function (req, res, next) {

    let brandId = req.query.brand_id;
    let content = req.query.content;
    let condition = {};

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    if (!brandId) return next(new BadRequestError('brand_id is null'));


    if (content) {
        condition = {
            $or: [
                {id: {"$like": `%${content}%`}},
                {telephone: {"$like": `%${content}%`}}
            ]
        };
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

        brandCurrencyCustomerModel.getOneCustomerInfo(database, condition, pageSkip, pageSize, (err, customer) => {
            if (err) return next(err);
            if (!customer) {
                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: true,
                        message: '未查询到该用户信息',
                        count: 0,
                        list: []
                    }
                });
            }

            async.parallel({
                store: (done) => {
                    let sql = `select sm.name mode, sd.*,b.brand_name,b.brand_sign from shop_detail sd 
                        left join brand  b on b.id = sd.brand_id 
                        left join shop_mode sm on sm.id = sd.shop_mode
                        where    sd.brand_id = '${brandId}';`;
                    restoBrandModel.getAllCustomSqlInfo(sql, done)
                },
                count: (done) => {
                    let sql = `SELECT count(id) count from tb_coupon WHERE customer_id = '${customer.id}'`;
                    brandCurrencyModel.getOneCustomSqlInfoNew(database, sql, done)
                },
                list: (done) => {
                    let sql = `SELECT * from tb_coupon WHERE customer_id = '${customer.id}'  order by add_time DESC limit ${pageSize} offset ${pageSkip}`;
                    brandCurrencyModel.getAllCustomSqlInfoNew(database, sql, done)
                }
            }, function (err, results) {
                if (err) return next(err);
                results.list.map((value) => {
                    if (value.shop_detail_id) {
                        let store = _.find(results.store, {'id': value.shop_detail_id});
                        value.shop_name = store.name;
                    } else {
                        value.shop_name = null;
                    }

                    if (value.brand_id) {
                        let store_brand = _.find(results.store, {'brand_id': value.brand_id});
                        value.brand_name = store_brand.brand_name;
                    } else {
                        value.brand_name = null;
                    }
                    value.is_used = value.is_used ? (value.is_used.toJSON()).data[0] : 0;
                    value.use_with_account = value.use_with_account ? (value.use_with_account.toJSON()).data[0] : 1;


                });
                res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: true,
                        message: '',
                        data: {
                            count: results.count.count,
                            list: results.list
                        }
                    }
                });
            });
        })
    });
};



/**
 * 根据微信用户id 清除购物车
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.deleteWeChatShoppingCartByCustomerId = function (req, res, next) {

    let brandId = req.body.brand_id;
    let customerId = req.body.customer_id;

    if (!brandId) return next(new BadRequestError('brand_id is null'));

    if (!customerId) return next(new BadRequestError('customer_id is null'));

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
        let sql = `delete from tb_shop_cart where customer_id = '${customerId}'`;

        brandCurrencyModel.deleteCustomSqlInfo(database, sql, (err)=>{
            if (err) return next(err);
            res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: '购物车清除成功！'
                }
            });
        })

    });
};