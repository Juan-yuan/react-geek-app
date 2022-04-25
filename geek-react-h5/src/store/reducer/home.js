import { SAVE_CHANNELS, SAVE_ALL_CHANNELS } from '@/store/action_types/home'
const initValue = {
    userChannels: [],
    allChannels: [],
}

export default function reducer(state = initValue, action) {
    const {type, payload} = action;
    switch(type) {
        case SAVE_CHANNELS:
            return {
                ...state,
                userChannels: payload 
            }
        case SAVE_ALL_CHANNELS:
            return {
                ...state,
                allChannels: payload
            }
        default:
            return state;            
    }
}