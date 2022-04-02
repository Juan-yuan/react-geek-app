import http from '@/utils/request'
import { SAVE_USER } from '@/store/action_types/profile'

/**
 * 
 * @param {保存用户信息} payload 
 * @returns 
 */
export const saveUser = (payload) => {
    return {
        type: SAVE_USER,
        payload
    }
}

/**
 * 
 * @returns get user inofrmation
 */
export const getUser = () => {
    return async dispatch => {
        const res = await http.get('/user')
        dispatch(saveUser(res.data))
    }
}