import { useEffect, useRef } from 'react'
import styles from './index.module.scss'

type Props = {
    children: React.ReactElement | string
    top?: number
}
const Sticky =({children, top = 0}:Props) => {
    const placeRef = useRef<HTMLDivElement>(null)
    const childrenRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        let value = (top / 375) * document.documentElement.clientWidth
        const place = placeRef.current!
        const child = childrenRef.current!
        const onScroll = () => {
            if(place.getBoundingClientRect().top <= value) {
                child.style.position = 'fixed'
                child.style.top = value + 'px'
                place.style.height = child.offsetHeight + 'px'
            } else {
                child.style.position = 'static'
                child.style.top = 'auto'
                place.style.height = '0px'
            }
        }
        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [top])
    return (
        <div className={styles.root}>
            <div className="sticky-placeholder" ref={placeRef} />

            <div className="sticky-container" ref={childrenRef} >
                {children}
            </div>
        </div>
    )
}

export default Sticky