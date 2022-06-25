import request from "@/utils/request"
import { RootThunkAction } from './../index';

type SuggestListRes = {
    options: string[]
}
export function getSuggestList(keyword: string): RootThunkAction {
    return async dispatch => {
        const res = await request.get<SuggestListRes>('/suggestion?q=' + keyword)
        dispatch({
            type: 'search/saveSuggestions',
            payload: res.data.options,
        })
        console.log(res)
    }
}