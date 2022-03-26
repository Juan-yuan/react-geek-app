import React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

export default function Input({extra, onExtraClick, className, ...rest}) {
    console.log('rest', rest)
  return (
    <div className={styles.root}>
        <input className={classNames("input", className)} {...rest} />
        {extra && <div className="extra" onClick={onExtraClick} >发送验证码</div>}
    </div>
  )
}
