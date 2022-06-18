import { SAVE_CHANNELS, SAVE_ALL_CHANNELS, SAVE_ARTICLE_LIST } from '@/store/action_types/home'

type Channel = {
    id: number
    name: string
}

type MoreAction = {
    visible: boolean
    articleId: string
    channelId: number
}

type Ariticle = {
    art_id: string
    title: string
    aut_id: string
    aut_name: string
    comm_count: string
    pubdate: string
    cover: {
        type: string
        images: string[]
    }
}

type Articles = {
    [index: number]: {
        timestamp: string
        list: Ariticle[]
    }
}

type HomeType = {
    userChannels: Channel[]
    allChannels: Channel[]
    moreAction: MoreAction
    articles: Articles
}
const initValue:HomeType = {
    userChannels: [],
    allChannels: [],
    articles: {},
    moreAction: {
        visible: false,
        articleId: '',
        channelId: -1,
    }
} as HomeType

type ActionType = {
    type: 'home/saveChannels',
    payload: Channel[]
} | {
    type: 'home/saveAllChannels',
    payload: Channel[]
} | {
    type: 'home/saveArticleList',
    payload: {
        channelId: number
        timestamp: string
        loadMore: boolean
        list: Ariticle[]
    }
} | {
    type: 'home/setMoreAction',
    payload: MoreAction
}
export default function reducer(state = initValue, action: ActionType) {
    switch(action.type) {
        case 'home/saveChannels':
            return {
                ...state,
                userChannels: action.payload 
            }
        case 'home/saveAllChannels':
            return {
                ...state,
                allChannels: action.payload
            }
        case 'home/saveArticleList':
            // console.log(payload)
            // 如果loadMore为true，代码加载更多数据，不应该覆盖，应该追加
            const {list, timestamp, loadMore, channelId } = action.payload
            return {
                ...state,
                articles: {
                    ...state.articles,
                    [action.payload.channelId]: {
                        timestamp: timestamp,
                        list: loadMore ? [...state.articles[channelId].list, ...list] : list,
                    }
                }
            }
        case 'home/setMoreAction': {
            return {
                ...state,
                moreAction: action.payload
            }
        }
            
        default:
            return state;            
    }
}