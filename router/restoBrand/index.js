/**
 * @author wxh on 2018/9/20
 * @copyright
 * @desc
 */

const restoBrand = require('../../controller/restoBrand');

const restoBrandCustomer = require('../../controller/restoBrand/customer');

const restoBrandWechat = require('../../controller/restoBrand/wechat');


exports.map = function(app){

    app.get('/resto/brand/shop/all',  restoBrand.getBrandShopAll);    //获取店铺集合根据 brandId

    app.get('/resto/brand/shop/detail',  restoBrand.getBrandShopDetailByShopId);    //根据shopId 获取店铺详情

    app.get('/resto/brand/shop/detail/list',  restoBrand.getShopDetailList);    //获取所有店铺列表

    app.get('/resto/brand/shop/order/list',  restoBrand.getShopOrderListByBrandIdAndShopId);      //获取所有店铺订单列表

    app.get('/resto/brand/shop/order/details',  restoBrand.getShopOrderDetailsByBrandIdAndOrderId);      //获取订单详情

    app.post('/resto/brand/shop/order/details',  restoBrand.updateShopOrderDetailsByBrandIdAndTableAndId);      //修改订单、支付数据

    app.put('/resto/brand/shop/order/details',  restoBrand.creatorShopOrderDetailsByBrandIdAndTableAndId);      //新增订单、支付数据

    app.get('/resto/brand/shop/order/payment/details',  restoBrand.getShopOrderPaymentDetailsByBrandIdAndOrderId);      //获取订单支付项详情

    // app.get('/resto/brand/configure/detail/',  restoBrand.getBrandConfigureByBrandId);

    app.get('/resto/brand/shop/article/list',  restoBrand.getArticleInfoListByBrandId);

    app.get('/resto/brand/shop/order/abnormal/list',  restoBrand.getShopOrderAbnormalInfoListByBrandId);            //获取门店异常订单

    app.get('/resto/brand/order/sync/to/mysql', restoBrand.orderSyncToMysql);      //同步mongodb订单到mysql

    //--------------------动态品牌切换数据库并查询品牌订单--------------------


    app.get('/resto/brand/customer/list',  restoBrandCustomer.getCustomerInfoList);     //获取微信会员信息

    app.get('/resto/brand/customer/id',  restoBrandCustomer.getCustomerInfoById);       //根据id获取微信会员信息

    app.get('/resto/brand/customer/order/list',  restoBrandCustomer.getWeChatOrderByCustomerIdOrPhone);     //获取微信会员订单信息

    app.get('/resto/brand/customer/charge/list',  restoBrandCustomer.getWeChatChargeByCustomerIdOrPhone);     //获取微信会员充值信息

    app.get('/resto/brand/customer/appraise/list',  restoBrandCustomer.getWeChatAppraiseByCustomerIdOrPhone);     //获取微信会员评论信息

    app.get('/resto/brand/customer/coupon/list',  restoBrandCustomer.getWeChatCouponByCustomerIdOrPhone);     //获取微信会员优惠卷信息

    app.delete('/resto/brand/customer/shopping/cart',  restoBrandCustomer.deleteWeChatShoppingCartByCustomerId);  //根据微信用户id 清除购物车




    // app.get('/listlist',  restoBrand.testTest);     //测试专用

    //--------------------微信redis数据创建并查询--------------------

    app.put('/resto/brand/wehchat/add/order/verification',  restoBrandWechat.newWehChatAddOrderVerification);     //更新微信缓存加菜验证

    app.get('/resto/brand/wehchat/add/order/verification',  restoBrandWechat.getWehChatAddOrderVerification);     //获取微信缓存加菜验证

    app.get('/resto/brand/wehchat/article/stock',  restoBrandWechat.getWehChatArticleStockByArticleId);     //查询菜品库存




};