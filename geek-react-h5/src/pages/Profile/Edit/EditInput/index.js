import React from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'

export default function EditInput({onClose, type}) {
  return (
    <div className={styles.root}>
        <NavBar 
          extra={<span className='commit-btn'>提交</span>} 
          onLeftClick={onClose}
        >
          编辑{type === 'name' ? '昵称' : '简介'}
        </NavBar>
        <h3>{type === 'name' ? '昵称' : '简介'}</h3>
    </div>
  )
}
