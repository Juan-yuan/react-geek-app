import Icon from '@/components/Icon'
import styles from './index.module.scss'

const CommentFooter = () => {
  return (
    <div className={styles.root}>
      <div className="input-btn">
        <Icon type="iconbianji" />
        <span>去评论</span>
      </div>
        <>
          <div className="action-item">
            <Icon type="iconbtn_comment" />
            <p>评论</p>
             <span className="bage">0</span>
          </div>
          <div className="action-item" >
            <Icon
              type='iconbtn_like_sel'
            />
            <p>点赞</p>
          </div>
        </>

      <div className="action-item">
        <Icon type='iconbtn_collect_sel' />
        <p>收藏</p>
      </div>
      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
