import React from 'react'
import ClassChild from './ClassChild'
import { Provider } from 'react-redux'
import store from './store'

export default class ClassDemo extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <div>
                    <h1>我是根组件</h1>
                    <ClassChild></ClassChild>
                </div>
            </Provider>
        )
    }
}