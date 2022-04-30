import React from 'react'
import Node from './Node'

export default function Child({state, dispatch}) {
  console.log('state', state)
    const add = () => {
        dispatch({type: 'add'})
    }
    const sub = () => {
        dispatch({type: 'sub'})
    }
  return (
    <div>
        <h2>我是Child组件-{state.count}</h2>
        <button onClick={add}>+1</button>
        <button onClick={sub}>-1</button>
        <hr />
        <Node></Node>
    </div>
  )
}
