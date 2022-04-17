import { Toast } from 'antd-mobile'
import axios from 'axios'
import { getTokenInfo } from './storage'
import history from './history'

const instance = axios.create({
    timeout: 5000,
    baseURL: 'http://geek.itheima.net/v1_0/',
})

// 配置拦截器
instance.interceptors.request.use(config => {  
    const token = getTokenInfo().token
    if(token) {
        config.headers.Authorization = 'Bearer ' + token
    }  
    return config
}, error => {
    return Promise.reject(error)
})

instance.interceptors.response.use(response => {
    return response.data
}, err => {
    // 1. 如果因为网络原因，response没有，给消息提示
    if(!err.response) {
        Toast.info('Please try again')
        return Promise.reject(err)
    }

    // 2. 网络没问题，有response，但是状态码不是 401
    const { response } = err
    if(response.status !== 401) {
        Toast.info(response.data.message)
        return Promise.reject(err)
    }

    // 3. 网络没问题，且是 401， token失效的问题
    // 1. 判断有没有刷新 token
    const {token, refresh_token} = getTokenInfo()
    if(!token || !refresh_token) {
        // 没有token，跳转到登录页
        history.push({
            pathname: '/login',
            state: {
                from: history.location.pathname
            }
        })
        return Promise.reject(err)
    }

    // 是 401错误，且有刷新token，就刷新 token
    
})

export default instance