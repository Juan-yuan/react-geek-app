import React, { useReducer } from 'react'
import Child from './Child'

const initialState = { count: 0}
function reducer(state, action) {
  switch(action.type) {
    case 'add':
      return {count: state.count + 1};
    case 'sub':
      return {count: state.count - 1};
    default:
      return state;
  }
}
export const Context = React.createContext()

export default function UseReducerDemo() {
    const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{state, dispatch}}>
      <div>
          <div>{state.count}</div>
          <h1>根组件</h1>
          <hr />
          <Child state={state} dispatch={dispatch} />
      </div>
    </Context.Provider>
  )
}
