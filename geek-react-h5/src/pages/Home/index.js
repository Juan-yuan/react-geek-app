import React, { useEffect, useState } from 'react'
import { Drawer } from 'antd-mobile'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import Icon from '@/components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChannels, getAllChannels} from '@/store/actions/home'
import Channels from './components/Channels'

export default function Home() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannels())
    dispatch(getAllChannels())
  }, [dispatch])

  const onClose = () => {
    setOpen(false)
  }


  const tabs = useSelector(state => state.home.userChannels)
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs}></Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search"></Icon>
        <Icon type="iconbtn_channel" onClick={() =>  setOpen(true)}></Icon>
      </div>

      <Drawer 
        className='my-drawer'
        position="left" 
        children={''} 
        sidebar={open && <Channels onClose={onClose}></Channels>} 
        open={open}
      >

      </Drawer>
    </div>
  )
}
