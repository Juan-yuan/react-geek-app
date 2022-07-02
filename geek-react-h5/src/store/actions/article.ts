import { RootThunkAction } from ".."
import request from '@/utils/request'

export function getArticleDetail(id: string): RootThunkAction {
    return async (dispatch) => {
        const res = await request.get('/articles/' + id)
        dispatch({
            type: 'article/saveDetail',
            payload: res.data,
        })
    }
}

export function getCommentList(id: string): RootThunkAction {
    return async (dispatch) => {
        const res = await request.get('/comments', {
            params: {
                type: 'a',
                source: id
            }
        })
        dispatch({
            type: 'article/saveComment',
            payload: res.data
        })
    }
}