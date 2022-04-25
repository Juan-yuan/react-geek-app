import { useState } from 'react'
import Icon from '@/components/Icon'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'
import differenceBy from 'lodash/differenceBy'
import classNames from 'classnames'

const Channels = ({index, onClick, onChange, onClose}) => {
    const userChannels = useSelector(state => state.home.userChannels);
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
    onChange(i);
    onClose();
  }

  const [editing, setEditing] = useState(false)
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
                          <Icon type="iconbtn_tag_close" />
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
                <span className="channel-list-item" key={item.id}>+ {item.name}</span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
