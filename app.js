/**
 * @author wxh on 2017/11/16
 * @copyright
 * @desc
 */
const WEBPACK = process.env.WEBPACK;

const express = require('express');
const path = require('path');
const io = require('socket.io');


const config = require('./config');
const logger = require('./lib/logger');
const error = require('./lib/error');

const log = logger(config.log);

const app = express();


let onlineUser={};
let onlineCount=0;
//设置全局变量
global.logger = log;
global.onlineUser = onlineUser;
global.onlineCount = onlineCount;
global.brand_currency_mysql =[];    //{brand_id:'ssss',mysql_client:xxxx} 存放品牌库连接信息
global.HttpError = error.HttpError;
global.BadRequestError = error.BadRequestError;
global.UnauthorizedError = error.UnauthorizedError;
global.NotFoundError = error.NotFoundError;
global.InternalServerError = error.InternalServerError;



//设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('express-art-template'));
app.set('view options', config.template);
app.set('view engine', 'html');

//======================================
const body = require('body-parser');
const cookie = require('cookie-parser');
const timeout = require('connect-timeout');
const compression = require('compression');


app.use(compression());
app.use(timeout('20s'));
app.use(cookie());
app.use(body.json());
app.use(body.urlencoded({
    extended: true
}));



//webpack================================
if(WEBPACK === 'dev'){
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');
    const webpackHot = require('./middleware/webpack/hot');
    const webpackDev = require('./middleware/webpack/dev');
    const compiler = webpack(webpackConfig);
    app.use(webpackDev(compiler, webpackConfig));
    app.use(webpackHot(compiler, webpackConfig));
    app.use('/socket',express.static(path.join(__dirname, 'client')));
}else {
    app.use(express.static(path.join(__dirname, 'static')));
}

//=======================================
const apilog = require('./middleware/log/index');
const pagging = require('./middleware/paging/index');
const session = require('./middleware/session/index');


app.use(apilog());
app.use(session());
app.use(pagging());



//路由设置=======================================

const socket = require('./router/socket');			//引入socket的路由
const system = require('./router/system');
const auth = require('./router/auth');
const upload = require('./router/upload');
const restoBrand = require('./router/restoBrand');
const emq = require('./router/emq');
const constant = require('./router/constant');
const spider = require('./router/spider');
const newpos = require('./router/newpos');
const notify = require('./router/notify');
const serverConfig = require('./router/serverConfig');


socket.map(app);									//注册socket的页面路由
system.map(app);
auth.map(app);
upload.map(app);
restoBrand.map(app);
emq.map(app);
constant.map(app);
spider.map(app);
newpos.map(app);
notify.map(app);
serverConfig.map(app);


//传入socket的参数和路由信息
app.socket = {
    io: io,
    routers: [socket]
};

//=======================================
const errorHandler = require('./middleware/error/index');
process.on('uncaughtException',(err)=>{
    console.log(err)
});
app.use(errorHandler.notFoundHandler());
app.use(errorHandler.serverErrorHandler());


module.exports = app;