/**
 * @author wxh on 2019/1/21
 * @copyright
 * @desc
 */


const wechatModel = require('../../public/model/restoBrand/wechat');
const authorizeModel = require('../../public/model/admin/authorize');

const moment = require('moment');

/*
 * @desc 更新微信缓存加菜验证
 * */
exports.newWehChatAddOrderVerification = function (req,res,next) {

    let orderId = req.body.order_id;
    let status = req.body.status || false;

    if (!orderId) return next(new BadRequestError('orderId is null'));

    wechatModel.storageWehChatAddOrderVerification(orderId,status,(err,result)=>{
        if (err)  return next(err);
        return res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '更新订单加菜验证成功！',
                date:{
                    order_id:orderId,
                    status:status
                }
            }
        })
    })


};

/*
 * @desc 获取微信缓存加菜验证
 * */
exports.getWehChatAddOrderVerification = function (req,res,next) {

    let orderId = req.query.order_id;

    if (!orderId) return next(new BadRequestError('orderId is null'));

    wechatModel.storageWehChatGetOrderVerification(orderId,(err,result)=>{
        if (err)  return next(err);
        console.log(`-------获取微信缓存加菜验证-------`,result);
        return res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '获取订单加菜验证成功！',
                date:{
                    order_id:orderId,
                    status:result || false
                }
            }
        })
    })


};


/*
 * @desc 查询菜品库存
 * */
exports.getWehChatArticleStockByArticleId = function (req,res,next) {

    let articleId = req.query.article_id;

    if (!articleId) return next(new BadRequestError('article_id is null'));

    wechatModel.getWehChatArticleStockByArticleId(articleId,(err,result)=>{
        if (err)  return next(err);

        return res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: '获取订单加菜验证成功！',
                date:{
                    article_id:articleId,
                    stock:result || 0
                }
            }
        })
    })


};