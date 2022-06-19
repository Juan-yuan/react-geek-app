import { useState } from 'react'
import Icon from '@/components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import differenceBy from 'lodash/differenceBy'
import classNames from 'classnames'
import { addChannel, delChannel } from '@/store/actions/home'
import { Toast } from 'antd-mobile'
import { RootState } from '@/store'

type ChnannelsType = {
  index?: any
  onClick?: any
  onChange?: any
  onClose?: any 
}
const Channels = ({index,  onChange, onClose}: ChnannelsType) => {
    const [editing, setEditing] = useState(false)
    const userChannels = useSelector((state: RootState) => state.home.userChannels);
    const dispatch = useDispatch();
    // 推荐
    const recommendChannels = useSelector((state: RootState) => {
      const { userChannels, allChannels } = state.home;
      return differenceBy(allChannels, userChannels, 'id')
    });

  // 点击切换频道
  const changeChannel = (i: number) => {
    if(editing) return;
    onChange(i);
    onClose();
  }

  const del = (channel: any, i: number) => {
    if(userChannels.length <= 4) {
      Toast.info('至少保留4个频道哦~')
    }
    dispatch(delChannel(channel))
    if(i === index) {
      onChange(0)
    }
    if(i < index) {
      onChange( index - 1)
    }
  }

  const add = async (channel: any) => {
    await dispatch(addChannel(channel));
    Toast.success('添加成功', 1);
  }


  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose}/>
      </div>
      <div className="channel-content">
        <div className={classNames('channel-item',{edit: editing})} >
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              点击{editing? '删除':'进入'}频道
            </span>
            <span className="channel-item-edit" onClick={() => setEditing(!editing)}>
              {editing? '完成': '编辑'}
            </span>
          </div>
          <div className="channel-list">
              {
                  userChannels.map( (item, i) => (
                      <span className={classNames('channel-list-item', {selected: index === i} )} key={item.id} onClick={() => changeChannel(i)}>
                          {item.name}
                          {
                            item.id !== 0 && <Icon type="iconbtn_tag_close" onClick={() => del(item, i)} />
                          }
                      </span>
                  ))
              }

            {/* <span className="channel-list-item">开发者资讯</span> */}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
            {/* <span className="channel-item-edit">编辑</span> */}
          </div>
          <div className="channel-list">
            {
              recommendChannels.map(item => (
                <span className="channel-list-item" key={item.id} onClick={() => add(item)}>+ {item.name}</span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
