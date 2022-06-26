import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchResults } from '@/store/actions/search'
import { RootState } from '@/store'
import ArticleItem from '@/pages/Home/components/ArticleItem'
import { InfiniteScroll } from 'antd-mobile-v5'

let page = 1
const SearchResult = () => {
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const key = search.get('key')!
    const dispatch = useDispatch()

    const results = useSelector( (state: RootState) => state.search.results)
    // useEffect(() => {
    //     dispatch(getSearchResults(key, 1))
    // }, [dispatch, key])

    const loadMore = async() => {
        if(loading) return
        setLoading(true)
        await dispatch(getSearchResults(key, page))
        page = page + 1
        setLoading(false)
        if(page > 5) {
            setHasMore(false)
        }
    }

    return (
        <div className={styles.root}>
            <NavBar className='navBar'>搜索结果</NavBar>
            <div className="article-list">
                {
                    results.map((item) => {
                        return <ArticleItem key={item.art_id} article={item} channelId={-1}></ArticleItem>
                    })
                }
            </div>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
        </div>
    )
}

export default SearchResult