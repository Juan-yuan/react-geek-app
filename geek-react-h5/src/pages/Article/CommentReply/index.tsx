import NavBar from '@/components/NavBar'
import NoneComment from '../NoComment'
import { Drawer } from 'antd-mobile'
import { useEffect, useState } from 'react'
import CommentFooter from '../CommentFooter'
import CommentInput from '../CommentInput'
import CommentItem from '../CommentItem'
import styles from './index.module.scss'
import { Comment } from '@/store/reducer/article'
import request from '@/utils/request'
import { InfiniteScroll } from 'antd-mobile-v5'

type Props = {
    articleId?: string
    onClose?: () => void
    originComment: Comment
}
const CommentReply = ({ articleId, onClose, originComment }: Props) => {
  const [replyList, setReplyList] = useState({
    end_id: '',
    last_id: '',
    results: [] as Comment[],
    total_count: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await request.get('/comments', {
        params: {
          type: 'c',
          source: originComment.com_id,
        }
      })
      setReplyList(res.data)
    }
    fetchData()
  }, [originComment])

  const hasMore = replyList.end_id !== replyList.last_id
  const loadMore = async () => {
    const res = await request.get('/comments', {
      params: {
        type: 'c',
        source: originComment.com_id,
        offset: replyList.last_id
      }
    })
    setReplyList({
      ...res.data,
      results: [...replyList.results, ...res.data.results]
    })
  }

  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        <NavBar className="transparent-navbar" onLeftClick={onClose}>
          <div>{originComment.reply_count}条回复</div>
        </NavBar>

        <div className="origin-comment">
          <CommentItem comment={originComment} ></CommentItem>
        </div>

        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {
            originComment.reply_count === 0 ? (<NoneComment />) : (replyList.results.map(item => (
              <CommentItem comment={item} key={item.com_id}></CommentItem>
            ))
          )}
          <InfiniteScroll hasMore={hasMore} loadMore={loadMore}></InfiniteScroll>
        </div>

        <CommentFooter />
      </div>
    </div>
  )
}

export default CommentReply
