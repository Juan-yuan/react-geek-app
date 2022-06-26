import NavBar from '@/components/NavBar'
import styles from './index.module.scss'

const SearchResult = () => {
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