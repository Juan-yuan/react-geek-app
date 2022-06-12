import { Toast } from 'antd-mobile'
import axios, { AxiosError } from 'axios'
import { getTokenInfo, setTokenInfo } from './storage'
import history from './history'
import store from '@/store'
import { saveToken, logout } from '@/store/actions/login'

const baseURL = 'http://geek.itheima.net/v1_0/'
const instance = axios.create({
    timeout: 5000,
    baseURL,
})

// 配置拦截器
instance.interceptors.request.use(config => {  
    const token = getTokenInfo().token
    if(token) {
        config.headers!.Authorization = 'Bearer ' + token
    }  
    return config
}, error => {
    return Promise.reject(error)
})

instance.interceptors.response.use(response => {
    return response.data
}, async (err: AxiosError) => {
    // 1. 如果因为网络原因，response没有，给消息提示
    if(!err.response) {
        Toast.info('Please try again')
        return Promise.reject(err)
    }

    // 2. 网络没问题，有response，但是状态码不是 401
    const { response, config } = err
    if(response.status !== 401) {
        Toast.info(response.data.message)
        return Promise.reject(err)
    }

    // 3. 网络没问题，且是 401， token失效的问题
    // 1. 判断有没有刷新 token
    const { refresh_token} = getTokenInfo()
    if(!refresh_token) {
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
    // 尝试发请求，获取新的token，注意：刷新token发送请求，不能使用封装的 instance，不然又会走到响应拦截器里
    
    try {
        const res = await axios({
            method: 'put',
            url: baseURL + 'authorizations',
            headers: {
                Authorization: 'Bearer ' + refresh_token
            }
        })
        // 刷新成功，保存新的 token        
        const tokenInfo = {
            token: res.data.data.token,
            refresh_token: refresh_token
        }
        // 保存到redux中，然后保存到 localstorage 中
        store.dispatch(saveToken(tokenInfo))
        setTokenInfo(tokenInfo)

        // token 刷新成功后，重新把最开始失败的请求重新发一次
        return instance(config)   // 返回一个 promise，所以要返回出去
    } catch {
        store.dispatch(logout())
        history.push({
            pathname: '/login',
            state: {
                from: history.location.pathname
            }
        })
        Toast.info('The login information is invalid, please log in again~')
       // 刷新token失败 
       return Promise.reject(err)
    }
})

export default instance