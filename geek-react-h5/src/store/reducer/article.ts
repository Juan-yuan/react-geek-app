type Detail = {
    art_id: string,
    attitude: number,
    aut_id: string,
    aut_name: string,
    aut_photo: string,
    comm_count: number,
    content: string,
    is_collected: boolean,
    is_followed: boolean,
    like_count: number,
    pubdate: string,
    read_count: number,
    title: string,
}

type ArticleType = {
    detail: Detail
    comment: CommentType
}

export type Comment = {
    aut_id: string
    aut_name: string
    aut_photo: string
    com_id: string
    content: string
    is_followed: boolean
    is_liking: boolean
    like_count: number
    pubdate: string
    reply_count: number
}
type CommentType = {
    end_id: string
    last_id: string
    total_count: number
    results: Comment[]
}

export type ArticleAction = {
    type: 'article/saveDetail',
    payload: Detail,
} | {
    type: 'article/saveComment',
    payload: CommentType
}

const initValue: ArticleType = {
    detail: {},
    comment: {},
} as ArticleType

export default function article(state = initValue, action: ArticleAction) {
    if( action.type === 'article/saveDetail') {
        return {
            ...state,
            detail: action.payload
        }
    }
    if(action.type === 'article/saveComment') {
        return {
            ...state,
            comment: action.payload
        }
    }
    return state
}