import React from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import classNames from 'classnames'
import { Switch, Route } from 'react-router-dom'
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
  const params = useParams()
  return (
    <div className={styles.root}>
      <div className="tab-content">
        <Switch>
          <Route path="/home" component={Home} exact></Route>
          <Route path="/home/qa" component={QA}></Route>
          <Route path="/home/video" component={Video}></Route>
          <Route path="/home/profile" component={Profile}></Route>
        </Switch>
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
