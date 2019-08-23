/**
 * @author wxh on 2018/11/7
 * @copyright
 * @desc
 */
import request from '@/utils/request'
import {URL} from '@/config/index'

//给newpos推送修改信息
export function javaNewposPushUpdateInfo(data) {
    return request({url: URL + '/java/newpos/push/update', method: 'post', data})
}

//给newpos推送插入信息
export function javaNewposPushInsertInfo(data) {
    return request({url: URL + '/java/newpos/push/insert', method: 'post', data})
}

//给newpos推送自定义信息
export function newposPush(data) {
    return request({url: URL + '/emq/newpos/push', method: 'post', data})
}