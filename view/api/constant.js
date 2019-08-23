/**
 * @author wxh on 2018/11/13
 * @copyright
 * @desc
 */

import request from '@/utils/request'
import {URL} from '@/config/index'

//创建支付常量
export function newPaymentConstant(data) {
    return request({url: URL + '/constant/payment', method: 'put', data})
}

//获取支付常量列表
export function getPaymentConstantList() {
    return request({url: URL + '/constant/payment/list', method: 'get'})
}

//获取常量列表
export function getConstantList(params) {
    return request({url: URL + '/constant/list', method: 'get',params})
}