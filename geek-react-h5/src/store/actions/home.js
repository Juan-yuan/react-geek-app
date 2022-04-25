import request from '@/utils/request';
import { SAVE_CHANNELS } from '../action_types/home'

export const getUserChannels = () => {
    return async dispatch => {
        const res = await request.get('/user/channels');
        dispatch(saveUserChannels(res.data.channels))
    }
}

export const saveUserChannels = (payload) => {
    return {
        type: SAVE_CHANNELS,
        payload
    }
}