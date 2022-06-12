const TOKEN_KEY = 'geek-itcast'
const CHANNEL_KEY = 'geek-itcast-21-channels'

// get token
export const getTokenInfo = (): Token => {
    return JSON.parse(localStorage.getItem(TOKEN_KEY)!) || {}
}

// set token
type Token = {
    token: string
    refresh_token: string
}

type Channels = {
    id: number
    name: string
}[]
export const setTokenInfo = (tokenInfo: Token) => {
    return localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

// remove token
export const removeTokenInfo = () => {
    return localStorage.removeItem(TOKEN_KEY)
}

// has token
export const hasToken = () => {
    return !!getTokenInfo().token
}

/**
 * 
 * @param {*} channels 
 */
export const setLocalChannels = (channels: Channels) => {
    localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

// 获取本地频道数据，不要默认为空数组，因为如果没有数据，if判断出来空数组也是 true
export const getLocalChannels = ():Channels => {
    return JSON.parse(localStorage.getItem(CHANNEL_KEY)!)
}

export const removeLocalChannels = () => {
    localStorage.removeItem(CHANNEL_KEY)
}