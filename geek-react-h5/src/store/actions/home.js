import request from '@/utils/request';
import { hasToken, getLocalChannels, setLocalChannels } from '@/utils/storage';
import { SAVE_CHANNELS, SAVE_ALL_CHANNELS } from '../action_types/home'

export const getUserChannels = () => {
    return async dispatch => {
        if(hasToken) {
            const res = await request.get('/user/channels');
            dispatch(saveUserChannels(res.data.channels));
        } else {
            const channels = getLocalChannels();
            if(channels) {
                // 没有 token，但本地有 channels数据，就把localstorage的存储到redux
                dispatch(saveUserChannels(channels))
            } else {
                // 如果没有token，且本地没有channels数据，则发请求获取基本的channels数据
                const res = await request.get('/user/channels');
                dispatch(saveUserChannels(res.data.channels));
                // save to localstorage
                setLocalChannels(res.data.channels)
            }
        }
    }
}

export const saveUserChannels = (payload) => {
    return {
        type: SAVE_CHANNELS,
        payload
    }
}

// action获取所有频道 
export const getAllChannels = () => {
    return async dispatch => {
        const res = await request.get('/channels');
        dispatch(saveAllChannels(res.data.channels))
    }
}

export const saveAllChannels = (payload) => {
    return {
        type: SAVE_ALL_CHANNELS,
        payload
    }
}

// 删除频道
export const delChannel = (channel) => {
    return async (dispatch, getState) => {
        const userChannels = getState().home.userChannels
        if(hasToken()) {
            dispatch(
                saveUserChannels(userChannels.filter(item => item.id !== channel.id))
            )
        } else {
            // 没有登录 
            // 修改本地，修改 redux
            const result = userChannels.filter(item => item.id !== channel.id);
            setLocalChannels(result);
            dispatch(saveUserChannels(result));
        }
    }
}

// 添加频道
export const addChannel = (channel) => {
    return async (dispatch, getState) => {
        const channels = [
            ...getState().home.userChannels,
            channel
        ]
        if(hasToken()) {
            await request.patch('/user/channels', {
                channels: [channel],
            })
            dispatch(saveUserChannels(channels))
        } else {
            dispatch(saveUserChannels(channels))
            setLocalChannels(channels)
        }
    }
}