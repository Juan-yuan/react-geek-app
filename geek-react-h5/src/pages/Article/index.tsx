import Icon from '@/components/Icon'
import NavBar from "@/components/NavBar"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import styles from './index.module.scss'
import { getArticleDetail } from "@/store/actions/article"
import { RootState } from '@/store'
import classNames from 'classnames'
import dayjs from 'dayjs'

const Article = () => {
    const history = useHistory()
    const { id } = useParams<{id: string}>()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getArticleDetail(id))
    }, [dispatch, id])

    const { detail } = useSelector((state: RootState) => state.article)

    return (
        <div className={styles.root}>
            <div className="root-wrapper">
                <NavBar
                    onLeftClick={() => history.go(-1)}
                    extra={
                        <span>
                            <Icon type="icongengduo" />
                        </span>
                    }
                >
                    {/* <div className="nav-author">
                        <img src={''} alt="" />
                        <span className="name">{'张三'}</span>
                        <span className="follow">关注</span>
                    </div> */}
                    哈哈哈
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

                                <div className="author">
                                    <img src={detail.aut_photo} alt="" />
                                    <span className="name">{detail.aut_name}</span>
                                    <span className={classNames('follow', { followed: detail.is_followed})}>{detail.is_followed ? '已关注' : '关注'}</span>
                                </div>
                            </div>
                            <div className="content">
                                <div className="content-html dg-html" dangerouslySetInnerHTML={{__html: detail.content}}>                                    
                                </div>
                                <div className="date">
                                    发布文章时间：{dayjs(detail.pubdate).format('YYYY-MM-DD')}
                                </div>
                            </div>
                        </div>                        
                    </div>
                </>
            </div>
        </div>
    )
}

export default Article