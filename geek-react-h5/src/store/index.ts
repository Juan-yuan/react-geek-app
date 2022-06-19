import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension"
import reducer from './reducer'
import { getTokenInfo } from "@/utils/storage"
import { ThunkAction } from 'redux-thunk'
import { HomeAction } from './reducer/home'
import { LoginAction } from "./reducer/login"
import { ProfileAction } from "./reducer/profile"

const store = createStore(
    reducer, 
    {
        login: getTokenInfo()
    },
    composeWithDevTools(applyMiddleware(thunk))
)

type RootAction = HomeAction | LoginAction | ProfileAction
export type RootState = ReturnType<typeof store.getState>

export type RootThunkAction = ThunkAction<Promise<void>, RootState, unknown, RootAction>

export default store;