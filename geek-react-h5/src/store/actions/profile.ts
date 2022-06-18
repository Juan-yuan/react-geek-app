import http from '@/utils/request'
import { User, Profile, ProfileAction } from '../reducer/profile'
import { Dispatch } from 'redux'

/**
 * 
 * @param {保存用户信息} payload 
 * @returns 
 */
export const saveUser = (payload: User): ProfileAction => {
    return {
        type: 'profile/user',
        payload
    }
}

export const saveProfile = (payload: Profile): ProfileAction => {
    return {
        type: 'profile/profile',
        payload
    }
}

/**
 * 
 * @returns get user inofrmation
 */
export const getUser = () => {
    return async (dispatch: Dispatch) => {
        const res = await http.get('/user')
        dispatch(saveUser(res.data))
    }
}

/**
 * 
 * @returns get profile details
 */
export const getProfile = () => {
    return async (dispatch: Dispatch) => {
        const res = await http.get('/user/profile')
        dispatch(saveProfile(res.data))
    }
}

type PartialProfile = Partial<Profile>
export const updateProfile = (data: PartialProfile) => {
    return async (dispatch: any) => {
        await http.patch('/user/profile', data)
        dispatch(getProfile())
    }
}
export const updatePhoto = (formDate: FormData) => {
    return async (dispatch: any) => {
        //http.patch('/user/photo', formDate) upload to database
        await http.patch('/user/photo', formDate);
        // dispatch(getProfile) get new iamge from database
        dispatch(getProfile())
    }
}