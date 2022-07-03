import NavBar from '@/components/NavBar'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

type Props = {
    onClose: () => void
}
const CommentInput = ({ onClose }: Props) => {
    const [value, setValue] = useState('')
    const txtRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        setTimeout(() => {
            txtRef.current!.focus()
        }, 600)
    }, [])

    const onSendComment = async () => {}
  return (
    <div className={styles.root}>
      <NavBar
        onLeftClick={onClose}
        extra={
          <span className="publish" onClick={onSendComment}>
            发表
          </span>
        }
      >
        '评论文章'
      </NavBar>

      <div className="input-area">
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
