import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

export default function Input({extra, onExtraClick, className, ...rest}) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus()
  },[])
  
  return (
    <div className={styles.root}>
        <input ref={inputRef} className={classNames("input", className)} {...rest} />
        {extra && <div className="extra" onClick={onExtraClick} >{extra}</div>}
    </div>
  )
}
