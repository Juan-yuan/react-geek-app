import request from '@/utils/request'

export const sendCode = (mobile) => {
    return async () => {
        await request({
            url: `/sms/codes/${mobile}`,
            method: 'get'
        })
    }
}