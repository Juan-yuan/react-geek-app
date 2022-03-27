import request from '@/utils/request'

export const sendCode = (mobile) => {
    return async () => {
        await request({
            method: 'get',
            url: `/sms/codes/${mobile}`
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
    return async dispatch => {
        const res = await request({
            method: 'post',
            url: '/authorizations',
            data
        })
        // save token to redux
        dispatch(saveToken(res.data))
    }
}