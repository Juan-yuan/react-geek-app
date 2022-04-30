import { useEffect, memo } from 'react'
import classnames from 'classnames'
import { useState, useRef } from 'react'

import Icon from '../Icon'

import styles from './index.module.scss'

const Img = memo(({ className, src, alt }) => {
  const imgRef = useRef(null)
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
    const observer = new IntersectionObserver(([{isIntersecting}]) => {
      if(isIntersecting) {
        imgRef.current.src = imgRef.current.dataset.src
        observer.unobserve(imgRef.current)
      }
    })
    observer.observe(imgRef.current)
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
