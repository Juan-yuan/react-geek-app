import { useState, useEffect } from 'react';
import ArticleItem from '../ArticleItem';
import styles from './index.module.scss';
import request from '@/utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleList } from '@/store/actions/home';
import { PullToRefresh, InfiniteScroll} from 'antd-mobile-v5';
 
const ArticleList = ({channelId, activeId}) => {
    const dispatch = useDispatch()
    const current = useSelector(state => state.home.articles[channelId]);

    useEffect(() => {
        // 如果该频道有数据，一进来时就不要再发数据
        if(current) return;
        if(channelId === activeId) {
            dispatch(getArticleList(channelId, Date.now()))
        }
    }, [channelId, activeId, dispatch])

    const onRefresh = async () => {
        await dispatch(getArticleList(channelId, Date.now()))
    }

    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const loadMore = async () => {        
        if(loading) return

        // 如果没有timestamp，代表没有更多数据,则不需要发送更多请求
        if(!current.timestamp) {
            setHasMore(false)
            return
        }

        setLoading(true)
        try {
            await dispatch(getArticleList(channelId, current.timestamp, true))
        } finally {
            setLoading(false)
        }
        
    }
    
    // 如果不是当前的 tab，就不渲染
    if(!current) return null;

    return (
        <div className={styles.root}>
            <div className="articles">
                <PullToRefresh onRefresh={onRefresh}>
                    {
                        current.list.map(item => (
                            <div className="article-item" key={item.art_id}>
                                <ArticleItem article={item} />
                            </div>
                        ))
                    }
                </PullToRefresh>
                {/* 上拉加载更多 */}
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
            </div>
        </div>
    )
}

export default ArticleList;