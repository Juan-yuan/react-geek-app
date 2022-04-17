import React from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useHistory, useLocation, Switch, Route } from 'react-router-dom'
import classNames from 'classnames'
import AuthRoute from '@/components/AuthRoute'
const Home = React.lazy(() => import('@/pages/Home')) 
const QA = React.lazy(() => import('@/pages/QA')) 
const Video = React.lazy(() => import('@/pages/Video')) 
const Profile = React.lazy(() => import('@/pages/Profile'))

const tabBar = [
  {
    title: '首页',
    icon: 'iconbtn_home',
    path: '/home'
  },
  {
    title: '问答',
    icon: 'iconbtn_qa',
    path: '/home/qa'
  },
  {
    title: '视频',
    icon: 'iconbtn_video',
    path: '/home/video'
  },
  {
    title: '我的',
    icon: 'iconbtn_mine',
    path: '/home/profile'
  }
]

export default function Layout() {
  const history = useHistory()
  const location = useLocation()
  return (
    <div className={styles.root}>
      <div className="tab-content">
        <React.Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route path="/home" component={Home} exact></Route>
            <Route path="/home/qa" component={QA}></Route>
            <Route path="/home/video" component={Video}></Route>
            <AuthRoute path="/home/profile" component={Profile}></AuthRoute>
          </Switch>
        </React.Suspense>        
      </div>
      <div className="tabbar">
        
        {
          tabBar.map((item, index) => {
            return (
              <div 
                className={classNames(
                  'tabbar-item', 
                  location.pathname === item.path ? 'tabbar-item-active' : ''
                )} 
                key={item.title} 
                onClick={() => history.push(item.path)}
              >
                <Icon 
                  type={location.pathname === item.path ? `${item.icon}_sel` : item.icon} 
                />
                <span>{item.title}</span>
              </div>
            )
          })
        }      
      </div>
    </div>
  )
}
