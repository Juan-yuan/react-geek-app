import request from '@/utils/request'

export const sendCode = (mobile) => {
    return async () => {
        await request({
            method: 'get',
            url: `/sms/codes/${mobile}`
        })
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
    }
}