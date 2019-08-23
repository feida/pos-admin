import request from '@/utils/request'

import {URL} from '@/config/index'

//登陆
export function loginByUsername(username, password) {
    const data = {
        username,
        password
    };
    return request({url: URL+'/admin/login', method: 'post', data})
}
//退出登陆
export function logout() {
    return request({url: URL+'/admin/logout', method: 'delete'})
}
//获取用户信息
export function getUserInfo(token) {
    return request({url: URL+'/system/info', method: 'get', params: {token}})
}

//获取验证码
export function sendCode(username) {
  return request({url: URL+'/admin/login/mobile/verification/code', method: 'get', params: username})
}

