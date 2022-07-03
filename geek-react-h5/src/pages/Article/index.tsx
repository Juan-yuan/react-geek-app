import Icon from '@/components/Icon'
import NavBar from "@/components/NavBar"
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import styles from './index.module.scss'
import { getArticleDetail, getCommentList, getMoreCommentList } from "@/store/actions/article"
import { RootState } from '@/store'
import classNames from 'classnames'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import highlight from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import throttle from 'lodash/throttle'
import NoComment from '@/pages/Article/NoComment'
import CommentItem from './CommentItem'
import { InfiniteScroll } from 'antd-mobile-v5'
import CommentFooter from './CommentFooter'
import Sticky from '@/components/Sticky'
import Share from './Share'
import { Drawer } from 'antd-mobile'

const Article = () => {
    const [isShowAuthor, setIsShowAuthor] = useState(false)
    const authorRef = useRef<HTMLDivElement>(null)
    const history = useHistory()
    const { id } = useParams<{id: string}>()
    const dispatch = useDispatch()
    const commentRef = useRef<HTMLDivElement>(null)
    const isShowComment = useRef(false)
    useEffect(() => {
        dispatch(getArticleDetail(id))
    }, [dispatch, id])
    const { detail, comment } = useSelector((state: RootState) => state.article)

    useEffect(() => {
        const codes = document.querySelectorAll('.dg-html pre > code')  //只更改pre标签下的code标签
        codes.forEach(el => {
            // 让 code 进行高亮
            highlight.highlightElement(el as HTMLElement)
        })
    }, [detail])

    useEffect(() => {
        const onScroll = throttle( function () {
            const rect = authorRef.current?.getBoundingClientRect()
            if(rect && rect.top < 0) {
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

    const hasMore = comment.last_id !== comment.end_id
    const loadMore = async () => {
        await dispatch(getMoreCommentList(id, comment.last_id))
    }

    const goComment = () => {
        if(isShowComment.current) {
            window.scrollTo(0,0)
        } else {
            window.scrollTo(0, commentRef.current!.offsetTop)
        }
        isShowComment.current = !isShowComment.current
    }

    const [share, setShare] = useState(false)
    const onCloseShare = () => {
        setShare(false)
    }
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
                        <div className="comment">
                            <Sticky top={46}>
                                <div className="comment-header" ref={commentRef}>
                                    <span>全部评论({detail.comm_count})</span>
                                    <span>{detail.like_count}点赞</span>
                                </div>
                            </Sticky>
                            {
                                detail.comm_count === 0 ? (<NoComment />) : (
                                    comment.results?.map((item) => <CommentItem key={item.com_id} comment={item} />)
                                )
                            }
                            <InfiniteScroll hasMore={hasMore} loadMore={loadMore}></InfiniteScroll>
                        </div>                       
                    </div>
                </>
                <CommentFooter goComment={goComment} onShare={() => setShare(true)}></CommentFooter>
            </div>

            <Drawer
                className="drawer-share"
                position="bottom"
                style={{minHeight: document.documentElement.clientHeight}}
                // children={''}
                sidebar={<Share onClose={onCloseShare} />}
                open={share}
                onOpenChange={onCloseShare}
            ></Drawer>
        </div>
    )
}

export default Article