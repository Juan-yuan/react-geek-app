import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

type Props = {
  extra?: string
  onExtraClick?: () => void
  className?: string
  autoFocus?: boolean
}
export default function Input({
  extra, 
  onExtraClick, 
  autoFocus, 
  className, 
  ...rest
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(autoFocus) {
      inputRef.current!.focus()
    }
  },[autoFocus])

  return (
    <div className={styles.root}>
        <input ref={inputRef} className={classNames("input", className)} {...rest} />
        {extra && <div className="extra" onClick={onExtraClick} >{extra}</div>}
    </div>
  )
}
