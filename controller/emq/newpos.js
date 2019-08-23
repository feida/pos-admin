/**
 * @author wxh on 2018/10/22
 * @copyright
 * @desc
 */

const newposModel = require('../../public/model/emq/newpos');
const restoBrandModel = require('../../public/model/restoBrand/index');
const brandCurrencyModel = require('../../public/model/brandCurrency/index');

const async = require('async');
const util = require('util');
const moment = require('moment');


exports.newposPush = function (req, res, next) {

    let brand_id = req.body.brand_id;
    let shop_id = req.body.shop_id;
    let group = req.body.group;
    let action = req.body.action;
    let id = req.body.id;
    let content = req.body.content;

    if (!brand_id) return next(new BadRequestError('brand_id is null'));

    if (!shop_id) return next(new BadRequestError('shop_id is null'));

    if (!group) return next(new BadRequestError('group is null'));

    if (!action) return next(new BadRequestError('action is null'));

    if (!id) return next(new BadRequestError('id is null'));

    if (!content) return next(new BadRequestError('content is null'));
    if(typeof content != 'string' && typeof content != 'object') return res.json({
        flag: '0000',
        msg: '',
        result: {
            ok: true,
            message: '格式不正确'
        }
    });
    try {

        let obj= typeof content == 'object' ? content:JSON.parse(content);
        if(typeof obj == 'object' && obj ){
            let sql = `SELECT pos_version from shop_detail where id = '${shop_id}'`;
            restoBrandModel.getOneCustomSqlInfo(sql,(err,result_data)=>{
                if(err)  return next(err);
                newposModel.currencyPosPush(result_data.pos_version == 2?`winPos`:`newPos`,brand_id,shop_id,group,action,id,obj,(err,result)=> {
                    if(err)  return next(err);
                    res.json({
                        flag: '0000',
                        msg: '',
                        result: {
                            ok: true,
                            message: '发送成功',
                            data:result

                        }
                    });
                })
            });


        }else{
            res.json({
                flag: '0000',
                msg: '',
                result: {
                    ok: true,
                    message: '格式不正确'
                }
            });
        }
    } catch(e) {
        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '格式不正确'
            }
        });
    }


};
/**
 * 修改
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.javaNewposPushUpdateInfo = function (req, res, next) {

    let brandId = req.body.brand_id;
    let shopId = req.body.shop_id;
    let table = req.body.table;
    let id = req.body.id;

    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!shopId) return next(new BadRequestError('shop_id is null'));
    if (!table) return next(new BadRequestError('table is null'));
    if (!id) return next(new BadRequestError('id is null'));

    let getBrandMysqlDatabaseCacheInfoByBrandId = util.promisify(restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId);   //获取数据库连接信息
    let getTableInfoByInfo = util.promisify(brandCurrencyModel.getTableInfoByInfo);
    let javaNewPosPush = util.promisify(newposModel.javaNewPosPush);

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

            let tableInfo = await getTableInfoByInfo(database,table,id);
            if(table == `tb_order`){

                //订单状态
                console.log(tableInfo.order_state);
                console.log(tableInfo.production_status);
                console.log(tableInfo.parent_order_id);

                //折扣部分

                console.log(tableInfo.order_pos_discount_money);
                console.log(tableInfo.pos_discount);

                //抹零及按金额优惠
                console.log(tableInfo.real_erase_money);    //erase_money+reduce_money
                console.log(tableInfo.erase_money); //抹零
                console.log(tableInfo.reduce_money); //按金额优惠


                //订单金额
                console.log(tableInfo.order_money);
                console.log(tableInfo.amount_with_children);

                let sql = `update tb_order set order_state = ${tableInfo.order_state>=10 ? 2:tableInfo.order_state},production_status =${tableInfo.production_status},parent_order_id = ${tableInfo.parent_order_id ?"'"+tableInfo.parent_order_id+"'" :null},order_pos_discount_money = ${tableInfo.order_pos_discount_money},pos_discount = ${parseInt(tableInfo.pos_discount)},real_erase_money = ${tableInfo.real_erase_money},erase_money = ${tableInfo.erase_money},reduce_money = ${tableInfo.reduce_money},order_money = ${tableInfo.order_money},amount_with_children = ${tableInfo.amount_with_children} where id = '${id}' `;
                let newPosPushResult = await javaNewPosPush(brandId,shopId,sql);

                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: newPosPushResult.success,
                        message: newPosPushResult.message
                    }
                });
            }else if(table == `tb_order_payment_item`){

                let sql = `update tb_order_payment_item set payment_mode_id =${tableInfo.payment_mode_id},pay_value=${tableInfo.pay_value} where id = '${id}'`;

                let newPosPushResult = await javaNewPosPush(brandId,shopId,sql);

                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: newPosPushResult.success,
                        message: newPosPushResult.message
                    }
                });
            }else if(table == `tb_order_item`){
                let create_time = `${moment(tableInfo.create_time).format('x')}`;
                let sql =`UPDATE tb_order_item SET order_id = '${tableInfo.order_id}',article_id = '${tableInfo.article_id}',article_name = '${tableInfo.article_name}', count = '${tableInfo.count}',original_price = '${tableInfo.original_price}',no_discount_price = '${tableInfo.original_price}',unit_price = '${tableInfo.unit_price}',final_price = '${tableInfo.final_price}',remark = '100',sort = '${tableInfo.sort}',status = '${tableInfo.status}',type = ${tableInfo.type},parent_id = ${tableInfo.parent_id? `'${tableInfo.parent_id}'`:''},create_time = '${create_time}',meal_item_id = '${tableInfo.meal_item_id}',kitchen_id = ${tableInfo.kitchen_id},recommend_id = '${tableInfo.recommend_id}',orgin_count = '${tableInfo.orgin_count}',refund_count = '${tableInfo.refund_count}',grant_count = '${tableInfo.grant_count}',meal_fee_number = '${tableInfo.meal_fee_number}',change_count = '${tableInfo.change_count}',print_fail_flag = '${tableInfo.print_fail_flag}',pos_discount = '${tableInfo.pos_discount?tableInfo.pos_discount:100}',weight = '${tableInfo.weight}',need_remind = ${tableInfo.need_remind?1:0} WHERE id = '${tableInfo.id}';`;

                let newPosPushResult = await javaNewPosPush(brandId,shopId,sql);

                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: newPosPushResult.success,
                        message: newPosPushResult.message
                    }
                });
            } else {
                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: false,
                        message: `暂不支持操作此表${table}`
                    }
                });
            }
        } catch (err) {
            return next(err);
        }
    })();
};

/**
 * 插入
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.javaNewposPushInsertInfo = function (req, res, next) {

    let brandId = req.body.brand_id;
    let shopId = req.body.shop_id;
    let table = req.body.table;
    let id = req.body.id;

    if (!brandId) return next(new BadRequestError('brand_id is null'));
    if (!shopId) return next(new BadRequestError('shop_id is null'));
    if (!table) return next(new BadRequestError('table is null'));
    if (!id) return next(new BadRequestError('id is null'));

    let getBrandMysqlDatabaseCacheInfoByBrandId = util.promisify(restoBrandModel.getBrandMysqlDatabaseCacheInfoByBrandId);   //获取数据库连接
    let getTableInfoByInfo = util.promisify(brandCurrencyModel.getTableInfoByInfo);
    let javaNewPosPush = util.promisify(newposModel.javaNewPosPush);

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
            let tableInfo = await getTableInfoByInfo(database,table,id);
            if(table == `tb_order`){
                // let sql = `update tb_order set order_state = ${tableInfo.order_state>=10 ? 2:tableInfo.order_state},production_status =${tableInfo.production_status},parent_order_id = ${tableInfo.parent_order_id ?tableInfo.parent_order_id :null},order_pos_discount_money = ${tableInfo.order_pos_discount_money},pos_discount = ${parseInt(tableInfo.pos_discount)},real_erase_money = ${tableInfo.real_erase_money},erase_money = ${tableInfo.erase_money},reduce_money = ${tableInfo.reduce_money},order_money = ${tableInfo.order_money},amount_with_children = ${tableInfo.amount_with_children} where id = '${id}' `;
                // let newPosPushResult = await javaNewPosPush(brandId,shopId,sql);
                //
                // return res.json({
                //     flag: "0000",
                //     msg: '',
                //     result: {
                //         ok: newPosPushResult.success,
                //         message: newPosPushResult.message
                //     }
                // });
            }else if(table == `tb_order_payment_item`){

                let pay_time = `${moment(tableInfo.pay_time).format('x')}`;
                let sql =`INSERT INTO tb_order_payment_item ('id', 'order_id', 'payment_mode_id', 'pay_value', 'pay_time', 'remark', 'result_data', 'is_use_bonus', 'to_pay_id') VALUES ('${id}', '${tableInfo.order_id}', ${tableInfo.payment_mode_id}, ${tableInfo.pay_value}, '${pay_time}', 'pos-adminServer insert', NULL, NULL, NULL);`;

                let newPosPushResult = await javaNewPosPush(brandId,shopId,sql);

                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: newPosPushResult.success,
                        message: newPosPushResult.message
                    }
                });
            }else if(table == `tb_order_item`){
                let create_time = `${moment(tableInfo.create_time).format('x')}`;
                let sql =`INSERT INTO tb_order_item ('id','order_id','article_id','article_name','count','original_price','no_discount_price','unit_price','final_price','remark','sort','status','type','parent_id','create_time','meal_item_id','kitchen_id','recommend_id','orgin_count','refund_count','grant_count','meal_fee_number','change_count','print_fail_flag','pos_discount','weight','need_remind') VALUES ('${id}', '${tableInfo.order_id}', '${tableInfo.article_id}', '${tableInfo.article_name}','${tableInfo.count}','${tableInfo.original_price}',${tableInfo.original_price}, '${tableInfo.unit_price}','${tableInfo.final_price}','100','${tableInfo.sort}','${tableInfo.status}','${tableInfo.type}','${tableInfo.parent_id}','${create_time}','${tableInfo.meal_item_id}','${tableInfo.kitchen_id}','${tableInfo.recommend_id}','${tableInfo.orgin_count}','${tableInfo.refund_count}','0','${tableInfo.meal_fee_number}','${tableInfo.change_count}','${tableInfo.print_fail_flag}','${tableInfo.pos_discount}','${tableInfo.weight}','${tableInfo.need_remind}');`;
                // console.log(sql);
                // console.log(sql)
                // let sql =`INSERT INTO tb_order_item ('id','order_id','article_id','article_name','count','original_price','no_discount_price','unit_price','final_price','remark','sort','status','type','parent_id','create_time','meal_item_id','kitchen_id','recommend_id','orgin_count','refund_count','grant_count','meal_fee_number','change_count','print_fail_flag','pos_discount','weight','need_remind') VALUES ('5b86f81f426e4a2099f5552db360ceb8', 'c19535b4c22b4412a5d228522be4301b', 'b0d357b62adf4543a88d4d19beb44856', '片鸭7', 1, 10, NULL, 8, 8, '100', 0, 1, 1, NULL, '1543459717246', '0', '', '', 1, 0, 0, 0, 0, 0, 100, 0.0, 0);`;
                let newPosPushResult = await javaNewPosPush(brandId,shopId,sql);

                // console.log(tableInfo)

                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: newPosPushResult.success,
                        message: newPosPushResult.message
                    }
                });
            }else{
                return res.json({
                    flag: "0000",
                    msg: '',
                    result: {
                        ok: false,
                        message: `暂不支持操作此表${table}`
                    }
                });
            }
        } catch (err) {
            return next(err);
        }
    })();
};