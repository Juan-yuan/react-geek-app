import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { Comment } from '@/store/reducer/article'
import dayjs from 'dayjs'
 
type Props = {
    comment: Comment
    onReply?: (comment:any) => void
}
const CommentItem = ({comment, onReply}: Props) => {

    return (
        <div className={styles.root}>
            <div className="avatar">
                <img src={comment.aut_photo} alt="" />
            </div>

            <div className="comment-info">
                <div className="comment-info-header">
                    <span className="name">{comment.aut_name}</span>

                    <span className="thumbs-up">
                        {comment.like_count}
                        <Icon type={comment.is_liking ? 'iconbtn_like_sel':'iconbtn_like2'} />
                        <Icon type={'iconbtn_like2'} />
                    </span>
                </div>

                <div className="comment-content">{comment.content}</div>

                <div className="comment-footer">
                    <span className="replay"  onClick={() => onReply && onReply(comment)}>
                        {comment.reply_count}回复 <Icon type="iconbtn_right" />
                    </span>

                    <span className="comment-time">{dayjs(comment.pubdate).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentItem