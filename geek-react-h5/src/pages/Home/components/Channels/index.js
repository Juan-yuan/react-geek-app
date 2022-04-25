import { useEffect, useState } from 'react'
import Icon from '@/components/Icon'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import differenceBy from 'lodash/differenceBy'
import classNames from 'classnames'
import { addChannel, delChannel } from '@/store/actions/home'
import { Toast } from 'antd-mobile'

const Channels = ({index, onClick, onChange, onClose}) => {
    const [editing, setEditing] = useState(false)
    const userChannels = useSelector(state => state.home.userChannels);
    const dispatch = useDispatch();
    // 推荐
    const recommendChannels = useSelector( state => {
      const { userChannels, allChannels } = state.home;
      // return allChannels.filter(item => {
      //   return userChannels.findIndex(v => v.id === item.id) === -1
      // })
      // 第二种方法： 使用 lodash 来比较两个数组，获取数组里不重复的值
      return differenceBy(allChannels, userChannels, 'id')
    });

  // 点击切换频道
  const changeChannel = (i) => {
    if(editing) return;   // 如果是编辑状态，不允许跳转
    onChange(i);
    onClose();
  }

  const del = (channel, i) => {
    if(userChannels.length <= 4) {
      Toast.info('至少保留4个频道哦~')
    }
    dispatch(delChannel(channel))
    // 删除时需要处理高亮
    // 高亮处理：
    // 1. 如果删除的 i 和 index相等，默认让推荐 0 高亮
    // 2. 如果删除的 i 小于 index，默认让 i - 1 高亮
    // 3. 如果删除的 i 大于 index，不做处理 
    if(i === index) {
      onChange(0)
    }
    if(i < index) {
      onChange( index - 1)
    }
  }

  const add = async (channel) => {
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
