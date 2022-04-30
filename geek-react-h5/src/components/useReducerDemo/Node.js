import React, { useContext } from 'react'
import { Context } from './index'

export default function Node() {
    const { state, dispatch} = useContext(Context)
  return (
    <div>我是Node组件-{state.count}</div>
  )
}
