const TOKEN_KEY = 'geek-itcast'

// get token
export const getTokenInfo = () => {
    return JSON.parse(localStorage.getItem(TOKEN_KEY)) || {}
}

// set token
export const setTokenInfo = (tokenInfo) => {
    return localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

// remove token
export const removeTokenInfo = (tokenInfo) => {
    return localStorage.removeItem(tokenInfo)
}

// has token
export const hasToken = () => {
    return !!getTokenInfo().token
}