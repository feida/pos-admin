/**
 * @author wxh on 2018/12/4
 * @copyright
 * @desc
 */
const order = require('../../controller/newpos/order');
const dailyKnots = require('../../controller/newpos/dailyKnots');
const charts = require('../../controller/newpos/charts');

exports.map = function (app) {


    app.put('/newpos/order/info/new', order.createNewposrder);      //创建或修改newpos订单数据

    app.get('/newpos/order/list', order.getOrderListByBrandIdShopId);      //获取订单列表

    app.get('/newpos/pos/order/details',  order.getPosOrderDetailsByOrderId);      //获取pos订单详情

    app.post('/newpos/pos/daily/knots/record',  dailyKnots.newPosDailyKnotsRecord);      //newpos请求结店开始统计数据


    app.get('/newpos/pos/charts/day/business/statistics',  charts.getDayBusinessStatisticsByDate);      //获取日 营业统计

    app.get('/newpos/pos/charts/trend/analysis/two/weeks',  charts.getTrendAnalysisTwoWeeksByDate);      //根据日期获取前两周趋势分析

    app.get('/newpos/pos/charts/trend/analysis/time/sharing',  charts.getTrendAnalysisTimeSharingByDate);      //根据日期获取分时段报表

    app.get('/newpos/pos/charts/trend/analysis/article/statistics',  charts.getTrendAnalysisArticleStatisticsByDate);      //根据日期获取菜品统计

}