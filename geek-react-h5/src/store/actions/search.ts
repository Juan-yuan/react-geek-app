import request from "@/utils/request"
import { RootThunkAction } from './../index';

type SuggestListRes = {
    options: string[]
}
export function getSuggestList(keyword: string): RootThunkAction {
    return async dispatch => {
        const res = await request.get<SuggestListRes>('/suggestion?q=' + keyword)
        let options = res.data.options
        if(!options[0]) {
            options = []
        }
        dispatch({
            type: 'search/saveSuggestions',
            payload: options,
        })
    }
}