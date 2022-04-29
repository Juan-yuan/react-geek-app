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
    const loadMore = () => {
        
        if(loading) return
        setHasMore(true)
        console.log('需要加载更多数据')
        setTimeout(() => {
            setLoading(false)
        }, 2000)
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