import React from 'react'
import ClassNode from './ClassNode'

export default class ClassChild extends React.Component {
    render() {    
      return (
        <div>
            <h2>我是Child组件</h2>
            <hr />
            <ClassNode></ClassNode>
        </div>
      )
    }
}

