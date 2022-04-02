import { SAVE_USER } from '@/store/action_types/profile'

const initValue = {
    user: {},
    profile: {}
}

export default function reducer(state = initValue, action) {
    const { type, payload } = action
    if(type === SAVE_USER) {
        return {
            ...state,
            user: payload,
        }
    }
    return state
}