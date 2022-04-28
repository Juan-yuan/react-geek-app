import ArticleItem from '../ArticleItem';
import styles from './index.module.scss'

const ArticleList = ({channelId, aid}) => {
    return (
        <div className={styles.root}>
            <div className="articles">
                <div className="article-item">
                    <ArticleItem />
                </div>
            </div>
        </div>
    )
}

export default ArticleList;