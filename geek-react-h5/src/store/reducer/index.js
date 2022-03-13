const { combineReducers } = require('redux')

function user(state = 0, action) {
    return state
}

const reducer = combineReducers({
    user
})

export default reducer