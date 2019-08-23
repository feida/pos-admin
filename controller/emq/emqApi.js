/**
 * @author wxh on 2018/12/24
 * @copyright
 * @desc
 */

const emqApiModel = require('../../public/model/emq/emqApi');

/**
 * 根据client 查找订阅
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.findSubscriptionByClient = function (req, res, next) {

    let client = req.query.client;

    if (!client) return next(new BadRequestError('client is null'));

    emqApiModel.findSubscriptionByClient(client,(err,result)=> {
        if(err)  return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: err?false:true,
                message: err?`失败`:`成功`,
                data:JSON.parse(result)
            }
        });
    })
};
