import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from './reducer'
import { getTokenInfo } from "@/utils/storage";

const store = createStore(
    reducer, 
    {
        login: getTokenInfo()
    },
    composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof store.getState>
export default store;