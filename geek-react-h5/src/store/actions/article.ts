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

export function getMoreCommentList(id: string, offset: string): RootThunkAction {
    return async (dispatch) => {
        const res = await request.get('/comments', {
            params: {
                type: 'a',
                source: id,
                offset
            }
        })
        dispatch({
            type: 'article/saveMoreComment',
            payload: res.data
        })
    }
}

export function likeArticle(id: string, attitude: number) : RootThunkAction {
    return async (dispatch) => {
        if(attitude === 1) {
            // 取消点赞
            await request.delete('/article/likings/' + id)
        } else {
            await request.post('/article/likings', { target: id})
        }
        // 重新加载下文章，刷新页面
        dispatch(getArticleDetail(id))
    }
}