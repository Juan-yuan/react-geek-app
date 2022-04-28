import React, { useEffect, useState } from 'react'
import { Drawer } from 'antd-mobile'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import Icon from '@/components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChannels, getAllChannels} from '@/store/actions/home'
import Channels from './components/Channels'
import ArticleList from './components/ArticleList'

export default function Home() {
  const [open, setOpen] = useState(false);
  // 控制高量
  const [active, setActive] = useState(0);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannels())
    dispatch(getAllChannels())
  }, [dispatch])

  const onClose = () => {
    setOpen(false)
  }

  const changeActive = e => {
    setActive(e)
  }
 
  const tabs = useSelector(state => state.home.userChannels);

  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} index={active} onChange={changeActive}>
        {
          tabs.map((item) => (
            <ArticleList key={item.id} channelId={item.id} activeId={tabs[active].id}></ArticleList>
          ))
        }
      </Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search"></Icon>
        <Icon type="iconbtn_channel" onClick={() =>  setOpen(true)}></Icon>
      </div>

      <Drawer 
        className='my-drawer'
        position="left" 
        children={''} 
        sidebar={open && <Channels onClose={onClose} index={active} onChange={changeActive}></Channels>} 
        open={open}
      >
      </Drawer>
    </div>
  )
}
