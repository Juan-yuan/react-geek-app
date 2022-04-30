import React, { Component } from 'react'
import { connect } from 'react-redux'

class ClassNode extends Component {
  render() {
    const {count, add, sub} = this.props
    return (
      <div>
          <h3>我是Node组件---{count}</h3>
          <button onClick={add}>+1</button>
          <button onClick={sub}>-1</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    count: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add() {
      dispatch({type: 'add'})
    },
    sub() {
      dispatch({type: 'sub'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassNode)