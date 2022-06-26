import { removeLocalHistories } from './../../utils/storage';
import { SearchAction } from './../reducer/search';
import request from "@/utils/request"
import { RootThunkAction } from './../index';
import { setLocalHistories } from '@/utils/storage';

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

export function clearSuggestions(): SearchAction {
    return {
        type: 'search/clearSuggestions'
    }
}

export function addSearchList(keyword: string): RootThunkAction {
    return async (dispatch, getState) => {
        let histories = getState().search.histories
        histories = histories.filter( item => item !== keyword )
        histories = [keyword, ...histories]
        if (histories.length > 10) {
            histories = histories.slice(0, 10)
        }
        dispatch({
            type: 'search/saveHistories',
            payload: histories
        })
        setLocalHistories(histories)
    }
}

export function clearHistories(): RootThunkAction {
    return async (dispatch) => {
        removeLocalHistories()
        dispatch({
            type: 'search/clearHistories',
        })
    }
}