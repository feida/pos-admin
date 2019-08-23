import request from '@/utils/request'
import {URL} from '@/config/index'

export function getToken() {
    return request({url: URL+'/upload/qiniu/token', method: 'get'})
}
