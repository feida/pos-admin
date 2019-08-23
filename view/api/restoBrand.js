import request from '@/utils/request'
import {URL} from '@/config/index'

export function getShopDetailList(params) {
    return request({url: URL+'/resto/brand/shop/detail/list', method: 'get',params: params})
}

export function getShopOrderListByBrandIdAndShopId(params) {
    return request({url: URL+'/resto/brand/shop/order/list', method: 'get',params: params})
}

export function getBrandShopAll(params) {
    return request({url: URL+'/resto/brand/shop/all', method: 'get',params: params})
}
//获取订单数据
export function getShopOrderDetailsByBrandIdAndOrderId(params) {
    return request({url: URL+'/resto/brand/shop/order/details', method: 'get',params: params})
}

//获取订单支付数据
export function getShopOrderPaymentDetailsByBrandIdAndOrderId(params) {
    return request({url: URL+'/resto/brand/shop/order/payment/details', method: 'get',params: params})
}

//更新订单、支付数据
export function updateShopOrderDetailsByBrandIdAndTableAndId(data) {
    return request({url: URL + '/resto/brand/shop/order/details', method: 'post', data})
}

//新增更新订单、支付数据
export function creatorShopOrderDetailsByBrandIdAndTableAndId(data) {
    return request({url: URL + '/resto/brand/shop/order/details', method: 'put', data})
}

//获取顾客列表
export function getCustomerInfoList(params) {
    return request({url: URL + '/resto/brand/customer/list', method: 'get', params})
}

//根据顾客id获取顾客信息
export function getCustomerInfoById(params) {
    return request({url: URL + '/resto/brand/customer/id', method: 'get', params})
}

//获取微信会员订单信息
export function getWeChatOrderByCustomerIdOrPhone(params) {
    return request({url: URL + '/resto/brand/customer/order/list', method: 'get', params})
}

//获取微信会员充值信息
export function getWeChatChargeByCustomerIdOrPhone(params) {
    return request({url: URL + '/resto/brand/customer/charge/list', method: 'get', params})
}

//获取微信会员评论信息
export function getWeChatAppraiseByCustomerIdOrPhone(params) {
    return request({url: URL + '/resto/brand/customer/appraise/list', method: 'get', params})
}

//获取微信会员优惠卷信息
export function getWeChatCouponByCustomerIdOrPhone(params) {
    return request({url: URL + '/resto/brand/customer/coupon/list', method: 'get', params})
}

//更新微信缓存加菜验证
export function newWehChatAddOrderVerification(data) {
    return request({url: URL + '/resto/brand/wehchat/add/order/verification', method: 'put', data})
}


//获取门店异常订单
export function getShopOrderAbnormalInfoListByBrandId(params) {
    return request({url: URL + '/resto/brand/shop/order/abnormal/list', method: 'get', params})
}

//根据微信用户id 清除购物车
export function deleteWeChatShoppingCartByCustomerId(data) {
    return request({url: URL + '/resto/brand/customer/shopping/cart', method: 'delete', data})
}

//同步mongodb订单到mysql
export function orderSyncToMysql(params) {
    return request({url: URL + '/resto/brand/order/sync/to/mysql', method: 'get', params})
}