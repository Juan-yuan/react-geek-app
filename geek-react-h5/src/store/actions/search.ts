import { RootThunkAction } from './../index';
import request from "@/utils/request"

export function getSuggestList(keyword: string): RootThunkAction {
    return async dispatch => {
        const res = await request({
            url: '/suggestion',
            method: 'get',
            params: {
            q: keyword
            }
        })
        dispatch({
            type: 'search/saveSuggestions',
            payload: res.data.options
        })
        console.log(res)
    }
}