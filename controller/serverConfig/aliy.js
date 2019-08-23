/**
 * @author wxh on 2019/3/26
 * @copyright
 * @desc
 */


const aliyServerConfigModel = require('../../public/model/admin/aliy');
const async = require('async');


/**
 *  @desc 阿里云集群服务器信息创建
 * */
exports.updateAliyColonyServerConfig = function (req, res, next) {

    if (!req.body.ip)  return next(new BadRequestError('ip is null'));

    let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

    if(!reg.test(req.body.ip)) return next(new BadRequestError('不是合法的IP地址！'));

    if (!req.body.name)  return next(new BadRequestError('name is null'));

    if (!req.body.pos_http_url)  return next(new BadRequestError('pos_http_url is null'));

    if (!req.body.receive_platform)  return next(new BadRequestError('pos_mqtt_url is null'));

    if (!req.body.publish_theme_resto)  return next(new BadRequestError('publish_theme_resto is null'));

    if (!req.body.publish_theme_pos_admin)  return next(new BadRequestError('publish_theme_pos_admin is null'));

    if (!req.body.pos_web_url)  return next(new BadRequestError('pos_web_url is null'));


    req.body.receive_platform = req.body.receive_platform.split(",");

    let serverConfig = {
        ip: req.body.ip,
        name: req.body.name,
        pos_http_url: req.body.pos_http_url,
        http_path: req.body.http_path ||`/v1`,
        pos_mqtt_url: req.body.pos_mqtt_url,
        receive_platform: req.body.receive_platform,
        publish_theme_resto: req.body.publish_theme_resto,
        publish_theme_pos_admin: req.body.publish_theme_pos_admin,
        pos_web_url: req.body.pos_web_url,
    };
    aliyServerConfigModel.updateAliyColonyServerConfig(serverConfig,  (err, config_id)=> {
        if (err)  return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: !!config_id,
                message: config_id ? '成功' : '失败',
                admin_id: config_id
            }
        });

    })

};



/**
 *  @desc 阿里云集群服务器信息获取
 * */
exports.getAliyColonyServerConfig = function (req, res, next) {

    let pageSkip = req.query.page_skip,
        pageSize = req.query.page_size;

    let condition = {};

    async.parallel({
        count: (cb)=> {
            aliyServerConfigModel.getAliyColonyServerConfigTotal(condition, cb);
        },
        list: (cb) =>{
            aliyServerConfigModel.getAliyColonyServerConfigList(condition,pageSkip,pageSize,cb)
        }
    },  (err, results)=> {
        if (err) return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: ``,
                data: {
                    count: results.count,
                    rows: results.list
                },
            }
        });

    })

};


/**
 *  @desc 阿里云集群服务器信息删除
 * */
exports.deleteAliyColonyServerConfigById = function (req, res, next) {

    let id = req.body.id;

    if (!id)  return next(new BadRequestError('id is null'));

    aliyServerConfigModel.deleteAliyColonyServerConfigById(id, (err,result)=>{
        if (err) return next(err);

        res.json({
            flag: '0000',
            msg: '',
            result: {
                ok: true,
                message: ``,
                data: result
            }
        });
    });

};