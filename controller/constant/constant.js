/**
 * @author wxh on 2018/12/8
 * @copyright
 * @desc
 */

const constantModel = require('../../public/model/admin/constant');
const util = require('util');

/**
 * 获取常量列表
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getConstantListByType = function (req, res, next) {

    let type = req.query.type;

    let condition = {};
    if(type){
        condition.type = type;
    }

    let constantList = util.promisify(constantModel.constantList);   //获取常量

    (async function () {
        try {
            let constantListResult = await constantList(condition);

            return res.json({
                flag: "0000",
                msg: '',
                result: {
                    ok: true,
                    message: ``,
                    data:{
                        constantList:constantListResult
                    }
                }
            });
        } catch (err) {
            return next(err);
        }
    })();
};