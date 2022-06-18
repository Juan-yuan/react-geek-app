import { createStore, applyMiddleware, AnyAction } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension"
import reducer from './reducer'
import { getTokenInfo } from "@/utils/storage"
import { ThunkAction } from 'redux-thunk'

const store = createStore(
    reducer, 
    {
        login: getTokenInfo()
    },
    composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof store.getState>

export type RootThunkAction = ThunkAction<Promise<void>, RootState, unknown, AnyAction>

export default store;