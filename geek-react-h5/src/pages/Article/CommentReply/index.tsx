import NavBar from '@/components/NavBar'
import NoneComment from '../NoComment'
import { useEffect, useState } from 'react'
import CommentFooter from '../CommentFooter'
import CommentInput from '../CommentInput'
import CommentItem from '../CommentItem'
import styles from './index.module.scss'
import { Comment } from '@/store/reducer/article'
import request from '@/utils/request'
import { InfiniteScroll } from 'antd-mobile-v5'
import { useDispatch } from 'react-redux'
import { updateComment } from '@/store/actions/article'

type Props = {
    articleId?: string
    onClose?: () => void
    originComment: Comment
}
const CommentReply = ({ articleId, onClose, originComment }: Props) => {
  const dispatch = useDispatch()
  const [replyList, setReplyList] = useState({
    end_id: '',
    last_id: '',
    results: [] as Comment[],
    total_count: 0,
  })
  
  const [drawerStatus, setDrawerStatus] = useState({
    visible: false
})

  const onCloseComment = () => {
    setDrawerStatus({
      visible: false,
    })
  }

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

  const onAddReply = async (content: string) => {
    const res = await request.post('/comments', {
      target: originComment.com_id,
      content,
      art_id: articleId
    })
    setReplyList({
      ...replyList,
      total_count: replyList.total_count + 1,
      results: [res.data.new_obj, ...replyList.results]
    })
    dispatch(updateComment({
      ...originComment,
      reply_count: originComment.reply_count + 1
    }))
  }

  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        <NavBar className="transparent-navbar" onLeftClick={onClose}>
          <div>{replyList.total_count}条回复</div>
        </NavBar>

        <div className="origin-comment">
          <CommentItem comment={originComment} type="reply"></CommentItem>
        </div>

        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {
            originComment.reply_count === 0 ? (<NoneComment />) : (replyList.results.map(item => (
              <CommentItem comment={item} key={item.com_id} type="reply"></CommentItem>
            ))
          )}
          <InfiniteScroll hasMore={hasMore} loadMore={loadMore}></InfiniteScroll>
        </div>

        <CommentFooter type="reply" onComment={() => setDrawerStatus({visible: true})} />
          {
            drawerStatus.visible && (
              <CommentInput 
                aritcleId={articleId!}
                onClose={onCloseComment}
                name={originComment.aut_name}
                onAddReply={onAddReply}
              />
            )
          }
      </div>
    </div>
  )
}

export default CommentReply
