import React, { Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.scss'
import AuthRoute from '@/components/AuthRoute'
import history from './utils/history'

const Home = React.lazy(() => import('@/pages/Layout'))
const Login = React.lazy(() => import('@/pages/Login'))
const ProfileEdit = React.lazy(() => import('@/pages/Profile/Edit') )
const ProfileChat = React.lazy(() =>  import('@/pages/Profile/Chat'))
const ProfileFeedback = React.lazy(() =>  import('@/pages/Profile/Feedback'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))
const Search = React.lazy(() => import('@/pages/Search'))
const SearchResult = React.lazy(() => import('@/pages/Search/Result'))
// const UseReducerDemo = React.lazy(() =>  import('@/components/useReducerDemo'))
// const ClassDemo = React.lazy(() =>  import('@/components/useReducerDemo/ClassDemo'))

export default function App() {
  return (
    <Router history={history}>
      <div className="app">
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
                <Redirect exact from="/" to="/home"></Redirect>
                <Route path="/login" component={Login}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/search" exact component={Search}></Route>
                <Route path="/search/result" exact component={SearchResult}></Route>

                {/* additional demo for useReducer and redux */}
                {/* <Route path="/demo" component={UseReducerDemo}></Route>
                <Route path="/classdemo" component={ClassDemo}></Route> */}

                {/* Need Auth */}
                <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
                <AuthRoute path="/profile/chat" component={ProfileChat}></AuthRoute>
                <AuthRoute path="/profile/feedback" component={ProfileFeedback}></AuthRoute>

                <Route component={NotFound}></Route>
            </Switch>
          </Suspense>
      </div>
    </Router>
  )
}
