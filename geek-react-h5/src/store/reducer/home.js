import { SAVE_CHANNELS, SAVE_ALL_CHANNELS, SAVE_ARTICLE_LIST } from '@/store/action_types/home'
const initValue = {
    userChannels: [],
    allChannels: [],
    articles: {},
    moreAction: {
        visible: false,
        articleId: ''
    }
}

export default function reducer(state = initValue, action) {
    const {type, payload} = action;
    switch(type) {
        case SAVE_CHANNELS:
            return {
                ...state,
                userChannels: payload 
            }
        case SAVE_ALL_CHANNELS:
            return {
                ...state,
                allChannels: payload
            }
        case SAVE_ARTICLE_LIST:
            // console.log(payload)
            // 如果loadMore为true，代码加载更多数据，不应该覆盖，应该追加
            const {list, timestamp, loadMore, channelId } = payload
            return {
                ...state,
                articles: {
                    ...state.articles,
                    [channelId]: {
                        timestamp: timestamp,
                        list: loadMore ? [...state.articles[channelId].list, ...list] : list,
                    }
                }
            }
        case 'home/setMoreAction': {
            return {
                ...state,
                moreAction: payload
            }
        }
            
        default:
            return state;            
    }
}