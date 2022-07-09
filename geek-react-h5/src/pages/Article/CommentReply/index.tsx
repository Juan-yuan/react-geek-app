import NavBar from '@/components/NavBar'
import NoneComment from '../NoComment'
import { Drawer } from 'antd-mobile'
import { useEffect, useState } from 'react'
import CommentFooter from '../CommentFooter'
import CommentInput from '../CommentInput'
import CommentItem from '../CommentItem'
import styles from './index.module.scss'
import { Comment } from '@/store/reducer/article'

type Props = {
    articleId?: string
    onClose?: () => void
    originComment: Comment
}
const CommentReply = ({ articleId, onClose, originComment }: Props) => {

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
            <NoneComment />
        </div>

        <CommentFooter />
      </div>
    </div>
  )
}

export default CommentReply
