type SearchType = {
    suggestions: string[]
}

const initValue: SearchType = {
    suggestions: []
}

export type SearchAction = {
    type: 'search/saveSuggestions'
    payload: string[]
}

export default function reducer(state = initValue, action: SearchAction) {
    if(action.type === 'search/saveSuggestions'){
        return {
            ...state,
            suggestions: action.payload
        }
    }
    return state
}