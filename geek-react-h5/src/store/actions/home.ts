import request from '@/utils/request';
import { hasToken, getLocalChannels, setLocalChannels } from '@/utils/storage';
import { Dispatch } from 'redux';
import { SAVE_CHANNELS, SAVE_ALL_CHANNELS, SAVE_ARTICLE_LIST } from '../action_types/home';
import { Channel, HomeAction, ArticlePayload, MoreAction } from '../reducer/home'
import { RootThunkAction } from '..'

export const getUserChannels = ():RootThunkAction => {
    return async (dispatch) => {
        if(hasToken()) {
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

export const saveUserChannels = (payload: Channel[]): HomeAction => {
    return {
        type: 'home/saveChannels',
        payload
    }
}

// action获取所有频道 
export const getAllChannels = ():RootThunkAction => {
    return async (dispatch) => {
        const res = await request.get('/channels');
        dispatch(saveAllChannels(res.data.channels))
    }
}

export const saveAllChannels = (payload: Channel[]): HomeAction => {
    return {
        type: 'home/saveAllChannels',
        payload
    }
}

// 删除频道
export const delChannel = (channel: Channel):RootThunkAction => {
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
export const addChannel = (channel: Channel):RootThunkAction => {
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

// 获取文章列表数据
export const getArticleList = (channelId:number, timestamp: string, loadMore = false):RootThunkAction => {
    return async (dispatch) => {
        const res = await request({
            url: '/articles',
            method: 'get',
            params: {
                channel_id: channelId,
                timestamp: timestamp
            }
        })
        dispatch(setArticleList({
            channelId,
            timestamp: res.data.pre_timestamp,
            list: res.data.results,
            loadMore
        }))
    }
}

export const setArticleList = (payload: ArticlePayload): HomeAction => {
    return {
        type: 'home/saveArticleList',
        payload
    }
}

export const setMoreAction = (payload: MoreAction): HomeAction => {
    return {
        type: 'home/setMoreAction',
        payload
    }
}

export const unLikeArticle = (articleId: string, loadMore = false): RootThunkAction => {
    return async (dispatch, getState) => {
        await request({
            method: 'post',
            url: '/article/dislikes',
            data: {
                target: articleId
            }
        })
        const channelId = Number(getState().home.moreAction.articleId)
        const articles = getState().home.articles[channelId]
        dispatch(
            setArticleList({
                channelId,
                timestamp: articles.timestamp,
                list: articles.list.filter((item) => item.art_id !== articleId),
                loadMore
            })
        )
    }
}

export const reportArticle = (articleId: number, reportId: number, loadMore = false) :RootThunkAction => {
    return async (dispatch, getState) => {
        await request({
            method: 'post',
            url: '/article/reports',
            data: {
                target: articleId,
                type: reportId
            }
        })
        const channelId = getState().home.moreAction.channelId
        const articles = getState().home.articles[channelId]
        dispatch(
            setArticleList({
                channelId,
                timestamp: articles.timestamp,
                list: articles.list.filter((item) => Number(item.art_id) !== articleId),
                loadMore
            })
        )
    }
}