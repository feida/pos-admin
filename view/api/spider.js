/**
 * @author wxh on 2018/11/26
 * @copyright
 * @desc
 */

import request from '@/utils/request'
import {URL} from '@/config/index'

//获取商业用户列表
export function getMerchantUserList(params) {
    return request({url: URL + '/spider/third_party/merchant/user/list', method: 'get',params: params})
}

//获取营业信息
export function getBusinessStatisticsInfo(params) {
    return request({url: URL + '/spider/third_party/business/statistics/info', method: 'get',params: params})
}

//开始执行一次爬取任务
export function startImplementOnceTask(params) {
    return request({url: URL + '/spider/third_party/merchant/implement/once/task', method: 'get',params: params})
}