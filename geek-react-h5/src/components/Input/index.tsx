import { ReactNode, useEffect, useRef } from 'react'
import {  InputHTMLAttributes } from 'react-router/node_modules/@types/react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  extra?: string
  onExtraClick?: () => void
  className?: string
  autoFocus?: boolean
  type?: 'text' | 'password'
  children?: ReactNode | '{}'
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
