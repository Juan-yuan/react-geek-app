import NavBar from '@/components/NavBar'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'
import { addComment } from '@/store/actions/article'

type Props = {
    onClose: () => void
    aritcleId: string
    name?: string
    onAddReply?: (content: string) => void
}
const CommentInput = ({ onClose, aritcleId, name, onAddReply }: Props) => {
    const [value, setValue] = useState('')
    const txtRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        setTimeout(() => {
            txtRef.current!.focus()
        }, 600)
    }, [])

    const dispatch = useDispatch()
    const onSendComment = async () => {
      if(!value) return

      if(name) {
        onAddReply && onAddReply(value)
        onClose()
      } else {
        await dispatch(addComment(aritcleId, value))
      onClose()
      }           
    }
  return (
    <div className={styles.root}>
      <NavBar
        className="nav"
        onLeftClick={onClose}
        extra={
          <span className="publish" onClick={onSendComment}>
            发表
          </span>
        }
      >
        { name ? '回复评论' : '评论文章'}
      </NavBar>

      <div className="input-area">
        { name && <div className="at">@{name}:</div>}
        <textarea
          ref={txtRef}
          placeholder="说点什么~"
          rows={10}
          value={value}
          onChange={(e) => setValue(e.target.value.trim())}
        />
      </div>
    </div>
  )
}

export default CommentInput
