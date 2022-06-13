import classNames from 'classnames'
import {useEffect, useRef, useState} from 'react'
import styles from './index.module.scss'

type Props = {
    maxLength?: number
    className?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    autoFocus?: boolean
}
export default function Textarea({maxLength = 100, className, autoFocus, ...rest}: Props) {
    const [value, setValue ] = useState(rest.value || '')
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
        rest.onChange?.(e)
    }
    const testRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if(autoFocus) {
            testRef.current!.setSelectionRange(-1, -1);
        }
    }, [autoFocus])

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

