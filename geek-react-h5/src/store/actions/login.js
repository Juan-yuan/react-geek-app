import request from '@/utils/request'
import  { setTokenInfo, removeTokenInfo } from '@/utils/storage'

export const sendCode = (mobile) => {
    return async () => {
        await request({
            method: 'get',
            url: '/sms/codes/'+mobile
        })
    }
}

export const saveToken = (payload) => {
    return {
        type: 'login/token',
        payload
    }
}
/**
 * login
 * @param {*} data 
 * @returns 
 */
export const login = (data) => {
    return async (dispatch) => {
        const res = await request({
            method: 'post',
            url: '/authorizations',
            data
        })
        // save token to redux
        dispatch(saveToken(res.data))
        setTokenInfo(res.data)
    }
}

// logout
export const logout = () => {
    return dispatch => {
        // 移除本地token
        removeTokenInfo('geek-itcast')
        // 移除redux中的token
        dispatch({
            type: 'login/logout'
        })
    }
}
