import { useEffect, memo } from 'react'
import classnames from 'classnames'
import { useState, useRef } from 'react'

import Icon from '../Icon'

import styles from './index.module.scss'

type Props = {
  className?: string
  src: string
  alt?: string
}
const Img = memo(({ className, src, alt }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const onLoad = () => {
    setError(false)
    setLoading(false)
  }
  const onError = () => {
    setLoading(false)
    setError(true)
  }

  useEffect(() => {
    const current = imgRef.current!
    const observer = new IntersectionObserver(([{isIntersecting}]) => {   
      if(isIntersecting) {
        current.src = current.dataset.src!
        observer.unobserve(current)
      }
    })
    observer.observe(current)
  }, [])

  return (
    <div className={classnames(styles.root, className)}>
      {loading && (
        <div className="image-icon">
          <Icon type="iconphoto" />
        </div>
      )}
      {error && (
        <div className="image-icon">
          <Icon type="iconphoto-fail" />
        </div>
      )}
      {!error && (
        <img 
          alt={alt} 
          ref={imgRef} 
          data-src={src} 
          onLoad={onLoad} 
          onError={onError} 
        />
      )}
    </div>
  )
})

export default Img
