import Icon from '@/components/Icon'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'
import differenceBy from 'lodash/differenceBy'

const Channels = ({tabActiveIndex, onClick, onChannelClick, onClose}) => {
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
    // 删除频道

    // 添加频道

  // 点击切换频道
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose}/>
      </div>
      <div className="channel-content">
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              点击频道
            </span>
            <span className="channel-item-edit" >
              保存
            </span>
          </div>
          <div className="channel-list">
              {
                  userChannels.map( (item) => (
                      <span className='channel-list-item' key={item.id}>
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
