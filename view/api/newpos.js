/**
 * @author wxh on 2018/12/24
 * @copyright
 * @desc
 */
import request from '@/utils/request'
import {URL} from '@/config/index'

export function getOrderListByBrandIdShopId(params) {
    return request({url: URL+'/newpos/order/list', method: 'get',params: params})
}

export function getPosOrderDetailsByOrderId(params) {
    return request({url: URL+'/newpos/pos/order/details', method: 'get',params: params})
}