/**
 * @author wxh on 2018/11/19
 * @copyright
 * @desc
 */


const async = require('async');
const util = require('util');
const moment = require('moment');
const {bigHump} = require('../../lib/util');
const thirdPartyMerchantsModel = require('../../public/model/spider/third_party_merchants');


/**
 * 第三方商户平台登陆
 * @param req
 * @param res
 * @param next
 */
exports.login = function (req, res, next) {

    if (!req.query.platform_type)  return next(new BadRequestError('商户平台类型为必填'));


    thirdPartyMerchantsModel.getBeautifulGroupToken((err,ss)=>{

    })

    // thirdPartyMerchantsModel.login("",(err,ss)=>{
    //     res.json({
    //         flag: '0000',
    //         msg: '',
    //         result: {
    //             ok: ``,
    //             message: ``,
    //             admin_id: ``
    //         }
    //     });
    // })
};


/**
 * 创建第三方商户登陆账户
 * @param req
 * @param res
 * @param next
 */
exports.createUser = function (req, res, next) {

    if (!req.body.user_name)  return next(new BadRequestError('商户用户名为必填'));

    if (!req.body.user_password)  return next(new BadRequestError('商户用户密码为必填'));

    if (!req.body.platform_type)  return next(new BadRequestError('商户平台类型为必填'));

    if (!req.body.merchant_brand)  return next(new BadRequestError('商户品牌为必填'));

    let merchantUser = {
        user_name:req.body.user_name,
        user_password:req.body.user_password,
        platform_type:req.body.platform_type,
        merchant_brand:req.body.merchant_brand
    };

    thirdPartyMerchantsModel.createUser(merchantUser,(err,merchant_user_id)=>{
        if (err)  return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!merchant_user_id,
                message: merchant_user_id ? '创建成功' : '创建失败',
                merchant_user_id: merchant_user_id
            }
        });
    })
};

/**
 * 获取商业用户信息
 * @param req
 * @param res
 * @param next
 */
exports.getMerchantUserList = function (req, res, next) {

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    let condition = {};

    async.parallel({
        count: function (cb) {
            thirdPartyMerchantsModel.getMerchantUserTotal(condition, cb);
        },
        list: function (cb) {
            thirdPartyMerchantsModel.getMerchantUserList(condition,pageSkip,pageSize, cb)
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
                    list: results.list
                },
            }
        });
    });
};

/**
 * 获取营业信息
 * @param req
 * @param res
 * @param next
 */
exports.getBusinessStatisticsInfo = function (req, res, next) {

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    let condition = {};

    async.parallel({
        count: function (cb) {
            thirdPartyMerchantsModel.getBusinessStatisticsInfoTotal(condition, cb);
        },
        list: function (cb) {
            thirdPartyMerchantsModel.getBusinessStatisticsInfo(condition,pageSkip,pageSize, cb)
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
                    list: results.list
                },
            }
        });
    });
};


/**
 * 创建第三方商户需要爬取的api
 * @param req
 * @param res
 * @param next
 */
exports.createSpiderApi = function (req, res, next) {

    if (!req.body.url)  return next(new BadRequestError('URL为必填'));

    if (!req.body.method)  return next(new BadRequestError('请求的类型为必填'));

    if (!req.body.table_name)  return next(new BadRequestError('表名必填'));


    if (!req.body.platform_type)  return next(new BadRequestError('商户平台类型为必填'));


    let spiderApi = {
        url:req.body.url,
        method:req.body.method,
        platform_type:req.body.platform_type,
        table_name:req.body.table_name
    };

    thirdPartyMerchantsModel.createSpiderApi(spiderApi,(err,spider_api_id)=>{
        if (err)  return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!spider_api_id,
                message: spider_api_id ? '创建成功' : '创建失败',
                spider_api_id: spider_api_id
            }
        });
    })
};


/**
 * 开始执行一次爬取任务
 * @param req
 * @param res
 * @param next
 */
exports.startImplementOnceTask = function (req, res, next) {

    let merchant_user_id = req.query.merchant_user_id || null;

    let getTaskFurthestUserAndUpdate = util.promisify(thirdPartyMerchantsModel.getTaskFurthestUserAndUpdate);     //获取任务间隔最长的用户并更新

    let getSpiderApiByPlatform = util.promisify(thirdPartyMerchantsModel.getSpiderApiByPlatform);     //根据平台获取需要爬取的url

    (async function () {
        try {
            let getTaskFurthestUserAndUpdateResult = await getTaskFurthestUserAndUpdate(merchant_user_id);

            if(
                getTaskFurthestUserAndUpdateResult.login_token &&
                getTaskFurthestUserAndUpdateResult.login_token.token &&
                getTaskFurthestUserAndUpdateResult.login_token.expire >new Date()
            ){  //token 有效
                //美团用户
                if(getTaskFurthestUserAndUpdateResult.platform_type != 2){
                    return res.json({
                        flag: '0000',
                        msg: '',
                        result: {
                            ok: true,
                            message: `暂时只支持美团用户`,
                            data: getTaskFurthestUserAndUpdateResult
                        }
                    });
                }

                let getSpiderApiByPlatformResult = await getSpiderApiByPlatform(getTaskFurthestUserAndUpdateResult.platform_type);
                if(getSpiderApiByPlatformResult.length == 0 ) {
                    return  res.json({
                        flag: '0000',
                        msg: '',
                        result: {
                            ok: true,
                            message: `未找到需要爬取的url`,
                            data: getTaskFurthestUserAndUpdateResult
                        }
                    });
                }
                async.map(getSpiderApiByPlatformResult, (item, cb) => {
                    let content = {
                        url:item.url,
                        method:item.method,
                        table_name:bigHump(item.table_name),
                        merchant_user_id:getTaskFurthestUserAndUpdateResult._id,
                        token:getTaskFurthestUserAndUpdateResult.login_token.token
                    };
                    if(content.method == "GET"){
                        thirdPartyMerchantsModel.beautifulGroupDataStorageByGetUrl(content,cb)
                    }else {
                        cb(null);
                    }
                }, (error) => {
                    if(error) return next(error);
                    res.json({
                        flag: '0000',
                        msg: '',
                        result: {
                            ok: true,
                            message: `爬取完成`,
                            data: getTaskFurthestUserAndUpdateResult
                        }
                    });
                });
            }else {
                res.json({
                    flag: '0000',
                    msg: '',
                    result: {
                        ok: true,
                        message: `不满足条件`,
                        data: getTaskFurthestUserAndUpdateResult
                    }
                });
            }
        } catch (err) {
            return next(err);
        }
    })();
};
