/**
 * @author wxh on 2019/3/13
 * @copyright
 * @desc
 */
import request from '@/utils/request'
import {URL} from '@/config/index'


//添加订单Id到队列中
export function addOrderIdToMessageQueue(data) {
    return request({url: URL + '/resto/notify/order/new', method: 'put', data})
}

//添加已支付订单Id到队列中
export function addOrderIdPaymentItemToMessageQueue(data) {
    return request({url: URL + '/resto/notify/order/payment/new', method: 'put', data})
}