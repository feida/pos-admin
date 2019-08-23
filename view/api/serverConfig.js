/**
 * @author wxh on 2019/3/27
 * @copyright
 * @desc
 */

import request from '@/utils/request'
import {URL} from '@/config/index'

//阿里云集群服务器信息获取
export function getAliyColonyServerConfig(params) {
    return request({url: URL + '/aliy/colony/server/config', method: 'get',params: params})
}

//阿里云集群服务器信息创建
export function updateAliyColonyServerConfig(data) {
    return request({url: URL + '/aliy/colony/server/config', method: 'post', data})
}

//阿里云集群服务器信息删除
export function deleteAliyColonyServerConfigById(data) {
    return request({url: URL + '/aliy/colony/server/config', method: 'delete', data})
}