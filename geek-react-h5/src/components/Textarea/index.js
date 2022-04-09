import classNames from 'classnames'
import React, {useEffect, useRef, useState} from 'react'
import styles from './index.module.scss'

export default function Textarea({maxLength, className, ...rest}) {
    const [value, setValue ] = useState(rest.value || '')
    const onChange = (e) => {
        setValue(e.target.value)
        rest.onChange?.(e)
    }
    const testRef = useRef(null);

    useEffect(() => {
        testRef.current.setSelectionRange(-1, -1);
    }, [])

  return (
    <div className={styles.root}>
        <textarea 
            className={classNames('testarea', className)} 
            maxLength={maxLength} 
            {...rest}
            value={value} 
            onChange={onChange}
            ref={testRef}
        />

        <div className="count">
            {value.length}/{maxLength}
        </div>
    </div>
  )
}
