import Icon from '@/components/Icon'
import { setMoreAction, unLikeArticle, reportArticle } from '@/store/actions/home'
import { Modal, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

// feedbackType: normal / junk
const MoreAction = () => {
  // junk / normal
  const [feedbackType, setFeedbackType] = useState('normal')
  const dispatch = useDispatch()
  const moreAction = useSelector((state) => state.home.moreAction)

  const list = [
    {id: 0, title:'其他问题'},
    {id: 1, title:'标题夸张'},
    {id: 2, title:'低俗色情'},
    {id: 3, title:'错别字多'},
    {id: 4, title:'旧闻重复'},
    {id: 5, title:'广告软文'},
    {id: 6, title:'内容不实'},
    {id: 7, title:'涉嫌违法犯罪'},
    {id: 8, title:'侵权'},
  ]

  const onClose = () => {
    setFeedbackType('normal')
    dispatch(setMoreAction({
      visible: false,
      articleId: '',
    }))
  }

  const unLike = async () => {
    dispatch(unLikeArticle(moreAction.articleId))
    onClose()
    Toast.info('取消成功~')
  }

  const report = async (id) => {
    await dispatch(reportArticle(moreAction.articleId, id))
    onClose()
    Toast.info('举报成功~')
  }

  return (
    <div className={styles.root}>
      <Modal
        title=""
        footer={[]}
        transparent
        maskClosable
        visible={moreAction.visible}
        onClose={onClose}
        className="more-action-modal"
      >
        <div className="more-action">
          {feedbackType === 'normal' ? (
            <>
              <div className="action-item">
                <Icon type="iconicon_unenjoy1" onClick={unLike} />
                不感兴趣
              </div>
              <div
                className="action-item"
                onClick={() => setFeedbackType('junk')}
              >
                <Icon type="iconicon_feedback1" />
                <span className="text">反馈垃圾内容</span>
                <Icon type="iconbtn_right" />
              </div>
              <div className="action-item">
                <Icon type="iconicon_blacklist" />
                拉黑作者
              </div>
            </>
          ) : (
            <>
              <div
                className="action-item"
                onClick={() => setFeedbackType('normal')}
              >
                <Icon type="iconfanhui" />
                <span className="back-text">反馈垃圾内容</span>
              </div>
              {list.map((item) => (
                <div key={item.id} className="action-item" onClick={() => report(item.id)}>{item.title}</div>
              ))}
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default MoreAction
