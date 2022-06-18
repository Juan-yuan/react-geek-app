import request from '@/utils/request';
import { Dispatch } from 'redux';

import  { setTokenInfo } from '@/utils/storage'
import { LoginAction } from '../reducer/login';

export const sendCode = (mobile: string) => {
    return async () => {
        await request({
            method: 'get',
            url: '/sms/codes/'+mobile
        })
    }
}

type Token = {
    token: string
    refresh_token: string
}

export const saveToken = (payload: Token): LoginAction => {
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
export const login = (data: {mobile: string, code: string }) => {
    return async (dispatch: Dispatch) => {
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
export const logout = (payload: Token) => {
    // return (dispatch: Dispatch) => {
    //     // 移除本地token
    //     removeTokenInfo('geek-itcast')
    //     // 移除redux中的token
    //     dispatch({
    //         type: 'login/logout'
    //     })
    // }
    return {
        type: 'login/logout' as const,
        payload,
    }
}
