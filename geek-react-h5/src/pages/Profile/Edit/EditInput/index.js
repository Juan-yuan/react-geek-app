import {useState} from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import Textarea from '@/components/Textarea'
import Input from '@/components/Input'
import { useSelector } from 'react-redux'

export default function EditInput({onClose, type, onCommit}) {
  const defaultValue = useSelector( state => {
    return state.profile.profile[type]
  })
  const [value, setValue] = useState(defaultValue || '')
  
  return (
    <div className={styles.root}>
        <NavBar 
          extra={<span className='commit-btn' onClick={() => onCommit(type, value)}>提交</span>} 
          onLeftClick={onClose}
        >
          编辑{type === 'name' ? '昵称' : '简介'}
        </NavBar>
        <div className="content-box">
          <h3>{type === 'name' ? '昵称' : '简介'}</h3>
          {
            type === 'name' ? 
            <Input 
              className="input-wrap" 
              value={value} 
              onChange={e => setValue(e.target.value)}
              autoFocus
            /> : 
            <Textarea 
              maxLength={200} 
              value={value}
              placehoder="请输入昵称"
              onChange={e => setValue(e.target.value)}
              autoFocus
            />
          }
        </div>        
    </div>
  )
}
