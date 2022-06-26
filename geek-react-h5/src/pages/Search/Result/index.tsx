import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getSearchResults } from '@/store/actions/search'

const SearchResult = () => {
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const key = search.get('key')!
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSearchResults(key, 1))
    }, [dispatch, key])
    return (
        <div className={styles.root}>
            <NavBar>搜索结果</NavBar>
            <div className="article-list">
                <div>文章列表</div>
            </div>
        </div>
    )
}

export default SearchResult