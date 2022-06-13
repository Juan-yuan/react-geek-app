// import { SAVE_USER, SAVE_PROFILE } from '@/store/action_types/profile'

type User = {
    id: string
    name: string
    photo: string
    art_count: number
    follow_count: number
    fans_count: number
    like_count: number
}

type Profile = {
    id: string
    photo: string
    mobile: string
    gender: number
    birthday: string
}

type InitType = {
    user: User
    profile: Profile
}

type ProfileAction = {
    type: 'profile/user',
    payload: User
} | {
    type: 'profile/profile'
    payload: Profile
}

const initValue: InitType = {
    user: {},
    profile: {}
} as InitType

export default function reducer(state = initValue, action: ProfileAction) {
    // const { type, payload } = action
    if(action.type === 'profile/user') {
        return {
            ...state,
            user: action.payload,
        }
    }
    if(action.type === 'profile/profile') {
        return {
            ...state,
            profile: action.payload,
        }
    }
    return state
}