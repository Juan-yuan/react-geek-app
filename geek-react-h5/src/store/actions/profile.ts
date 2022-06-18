import http from '@/utils/request'
import { User, Profile, ProfileAction } from '../reducer/profile'
import { Dispatch } from 'redux'
import { RootThunkAction } from '..'

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
export const getUser = (): RootThunkAction => {
    return async (dispatch) => {
        const res = await http.get('/user')
        dispatch(saveUser(res.data))
    }
}

/**
 * 
 * @returns get profile details
 */
export const getProfile = (): RootThunkAction => {
    return async (dispatch) => {
        const res = await http.get('/user/profile')
        dispatch(saveProfile(res.data))
    }
}

type PartialProfile = Partial<Profile>
export const updateProfile = (data: PartialProfile): RootThunkAction => {
    return async (dispatch) => {
        await http.patch('/user/profile', data)
        dispatch(getProfile())
    }
}
export const updatePhoto = (formDate: FormData): RootThunkAction => {
    return async (dispatch) => {
        //http.patch('/user/photo', formDate) upload to database
        await http.patch('/user/photo', formDate);
        // dispatch(getProfile) get new iamge from database
        dispatch(getProfile())
    }
}