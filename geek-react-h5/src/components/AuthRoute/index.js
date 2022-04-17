import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { hasToken } from '@/utils/storage'

export default function Index({component: Component, ...rest}) {
    const location = useLocation()
  return (
    <Route 
        {...rest}
        render={() => {
            if (hasToken()) {
                return <Component></Component>
            } else {
                return <Redirect to={{
                    pathname: '/login',
                    state: {
                        from: location.pathname
                    }
                }}></Redirect>
            }
        }}
    ></Route>
  )
}
