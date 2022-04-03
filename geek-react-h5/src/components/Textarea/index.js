import classNames from 'classnames'
import React, {useState} from 'react'
import styles from './index.module.scss'

export default function Textarea({maxLength, className, ...rest}) {
    const [value, setValue ] = useState(rest.value || '')
    const onChange = (e) => {
        setValue(e.target.value)
        rest.onChange?.(e)
    }
  return (
    <div className={styles.root}>
        <textarea 
            className={classNames('testarea', className)} 
            maxLength={maxLength} 
            {...rest}
            value={value} 
            onChange={onChange}
        />

        <div className="count">
            {value.length}/{maxLength}
        </div>
    </div>
  )
}
