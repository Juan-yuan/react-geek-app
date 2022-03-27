import { Toast } from 'antd-mobile'
import axios from 'axios'

const instance = axios.create({
    timeout: 5000,
    baseURL: 'http://geek.itheima.net/v1_0/',
})

instance.interceptors.request.use(config => {    
    return config
}, error => {
    return Promise.reject(error)
})

instance.interceptors.response.use(response => {
    return response.data
}, err => {
    if(err.response) {
        Toast.info(err.response.data.message)
    } else {
        Toast.info('Please try again')
    }
    return Promise.reject(err)
})

export default instance