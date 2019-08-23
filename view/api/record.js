/**
 * @author wxh on 2018/12/7
 * @copyright
 * @desc
 */
import request from '@/utils/request'
import {URL} from '@/config/index'

//获取订单操作记录列表
export function getOrderUpdateRecordList(params) {
    return request({url: URL + '/system/order/record/list', method: 'get',params})
}

//获取支付项操作记录列表
export function getOrderPaymentItemUpdateRecordList(params) {
    return request({url: URL + '/system/order_payment_item/record/list', method: 'get',params})
}

//根据订单id获取所有操作记录
export function getOrderRecordDetailsByOrderId(params) {
    return request({url: URL + '/system/order/all/record/details', method: 'get',params})
}