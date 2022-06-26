type SearchType = {
    suggestions: string[]
    histories: string[]
}

const initValue: SearchType = {
    suggestions: [],
    histories: []
}

export type SearchAction = {
    type: 'search/saveSuggestions'
    payload: string[]
} | {
    type: 'search/clearSuggestions'
} | {
    type: 'search/saveHistories',
    payload: string[]
} | {
    type: 'search/clearHistories'
}

export default function reducer(state = initValue, action: SearchAction) {
    if(action.type === 'search/saveSuggestions'){
        return {
            ...state,
            suggestions: action.payload
        }
    }
    if(action.type === 'search/clearSuggestions'){
        return {
            ...state,
            suggestions: []
        }
    }
    if(action.type === 'search/saveHistories') {
        return {
            ...state,
            histories: action.payload
        }
    }
    if(action.type === 'search/clearHistories') {
        return {
            ...state,
            histories: []
        }
    }
    return state
}