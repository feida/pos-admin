import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['Pos-Admin-Token'] = getToken()
    }
    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.flag !== "0000") {
            Message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
            });
            // 50008:非法的token; 50012:其他客户端登录了;  50013:您的账户已经被锁定;50014:Token 过期了;
            if (res.flag === "50008" || res.flag === "50012" || res.flag === "50013" || res.flag === "50014") {
                Message({
                    message: res.msg,
                    type: 'error',
                    duration: 5 * 1000
                });
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
        } else {
            return response.data.result
        }
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error)
    });
export default service
