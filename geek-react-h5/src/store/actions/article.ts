import { ArticleAction } from './../reducer/article';
import { RootThunkAction } from ".."
import request from '@/utils/request'
import { Comment } from '../reducer/article'

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

 export function collectArticle(id: string, is_collected: boolean):RootThunkAction {
    return async dispatch => {
        if(is_collected) {
            // 取消收藏
            await request.delete('/article/collections/' + id)
        } else {
            await request.post('/article/collections/', {
                target: id
            })
        }
        await dispatch(getArticleDetail(id))
    }
}

export function addComment(aritcleId: string, content: string):RootThunkAction {
    return async (dispatch, getState) => {
        const res = await request.post('/comments', {
            target: aritcleId,
            content
        })
        dispatch({
            type: 'article/saveNewComment',
            payload: res.data.new_obj
        })
        dispatch(getArticleDetail(getState().article.detail.art_id))
    }
}

export function updateComment(comment: Comment):ArticleAction {
    return {
        type: 'article/updateComment',
        payload: comment,
    }
}