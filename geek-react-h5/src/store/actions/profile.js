import http from '@/utils/request'
import { SAVE_USER, SAVE_PROFILE } from '@/store/action_types/profile'

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

export const saveProfile = (payload) => {
    return {
        type: SAVE_PROFILE,
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

/**
 * 
 * @returns get profile details
 */
export const getProfile = () => {
    return async dispatch => {
        const res = await http.get('/user/profile')
        dispatch(saveProfile(res.data))
    }
}