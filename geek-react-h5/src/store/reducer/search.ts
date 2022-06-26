type SearchType = {
    suggestions: string[]
}

const initValue: SearchType = {
    suggestions: []
}

export type SearchAction = {
    type: 'search/saveSuggestions'
    payload: string[]
} | {
    type: 'search/clearSuggestions'
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
    return state
}