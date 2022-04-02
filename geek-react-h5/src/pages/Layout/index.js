import React from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'

export default function Home() {
  return (
    <div className={styles.root}>
      <div className="tab-content"></div>
      <div className="tabbar">
        <div className="tabbar-item tabbar-item-active">
          <Icon type="iconbtn_home_sel" />
          <span>首页</span>
        </div>
        <div className="tabbar-item">
          <Icon type="iconbtn_qa" />
          <span>问答</span>
        </div>
        <div className="tabbar-item">
          <Icon type="iconbtn_video" />
          <span>视频</span>
        </div>
        <div className="tabbar-item">
          <Icon type="iconbtn_mine" />
          <span>我的</span>
        </div>      
      </div>
    </div>
  )
}
