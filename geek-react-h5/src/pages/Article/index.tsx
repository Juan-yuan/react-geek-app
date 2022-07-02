import Icon from '@/components/Icon'
import NavBar from "@/components/NavBar"
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import styles from './index.module.scss'
import { getArticleDetail, getCommentList } from "@/store/actions/article"
import { RootState } from '@/store'
import classNames from 'classnames'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import highlight from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import throttle from 'lodash/throttle'
import NoComment from '@/pages/Article/NoComment'

const Article = () => {
    const [isShowAuthor, setIsShowAuthor] = useState(false)
    const authorRef = useRef<HTMLDivElement>(null)
    const history = useHistory()
    const { id } = useParams<{id: string}>()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getArticleDetail(id))
    }, [dispatch, id])
    const { detail } = useSelector((state: RootState) => state.article)

    useEffect(() => {
        const codes = document.querySelectorAll('.dg-html code')
        codes.forEach(el => {
            // 让 code 进行高亮
            highlight.highlightElement(el as HTMLElement)
        })
    }, [detail])

    useEffect(() => {
        const onScroll = throttle( function () {
            const rect = authorRef.current?.getBoundingClientRect()!
            if(rect.top < 0) {
                setIsShowAuthor(true)
            } else {
                setIsShowAuthor(false)
            }
        }, 300)
        document.addEventListener('scroll', onScroll)
        return () => {
            document.removeEventListener('scroll', onScroll)
        }
    }, [])

    useEffect(() => {
        dispatch(getCommentList(id))
    }, [dispatch, detail])


    return (
        <div className={styles.root}>
            <div className="root-wrapper">
                <NavBar
                    className="navBar"
                    onLeftClick={() => history.go(-1)}
                    extra={
                        <span>
                            <Icon type="icongengduo" />
                        </span>
                    }
                >
                    { isShowAuthor ? (<div className="nav-author">
                        <img src={detail.aut_photo} alt="" />
                        <span className="name">{detail.aut_name}</span>
                        <span
                            className={classNames('follow', detail.is_collected ? 'followed' : '')}
                        >
                            {detail.is_followed ? '已关注' : '关注'}
                        </span>
                    </div>) : ''
                }
                </NavBar>
                <>
                    <div className="wrapper">
                        <div className="article-wrapper">
                            <div className="header">
                                <h1 className="title">{detail.title}</h1>  

                                <div className="info">
                                    <span>{detail.pubdate}</span>
                                    <span>{detail.read_count}阅读</span>
                                    <span>{detail.comm_count}评论</span>
                                </div> 

                                <div className="author" ref={authorRef}>
                                    <img src={detail.aut_photo} alt="" />
                                    <span className="name">{detail.aut_name}</span>
                                    <span className={classNames('follow', { followed: detail.is_followed})}>{detail.is_followed ? '已关注' : '关注'}</span>
                                </div>
                            </div>
                            <div className="content">
                                <div className="content-html dg-html" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(detail.content)}}>                                    
                                </div>
                                <div className="date">
                                    发布文章时间：{dayjs(detail.pubdate).format('YYYY-MM-DD')}
                                </div>
                            </div>
                        </div> 
                        <NoComment></NoComment>                       
                    </div>
                </>
            </div>
        </div>
    )
}

export default Article