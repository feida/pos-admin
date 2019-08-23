/**
 * @author wxh on 2018/11/13
 * @copyright
 * @desc
 */

const paymentModel = require('../../public/model/admin/payment');


const util = require('util');

/**
 * 插入
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.newPaymentConstant = function (req, res, next) {

    let paymentCode = req.body.payment_code;
    let paymentName = req.body.payment_name;
    let paymentDescribe = req.body.payment_describe;


    if (!paymentCode) return next(new BadRequestError('payment_code is null'));
    if (!paymentName) return next(new BadRequestError('payment_name is null'));

    let newPaymentConstant = util.promisify(paymentModel.newPaymentConstant);   //创建支付项常量

    (async function () {
        try {
            let content = {
                payment_code:paymentCode,
                payment_name:paymentName,
                payment_describe:paymentDescribe,
            };
            let paymentInfo = await newPaymentConstant(content);

            return res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: `添加成功`
                }
            });
        } catch (err) {
            return next(err);
        }
    })();
};

/**
 * 获取支付项列表
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getPaymentConstantList = function (req, res, next) {

    let paymentConstantList = util.promisify(paymentModel.constantList);   //创建支付项常量

    (async function () {
        try {
            let constantList = await paymentConstantList({type:1});

            return res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: ``,
                    data:{
                        constantList:constantList
                    }
                }
            });
        } catch (err) {
            return next(err);
        }
    })();
};