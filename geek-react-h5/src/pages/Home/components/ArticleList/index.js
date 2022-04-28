import { useEffect } from 'react';
import ArticleItem from '../ArticleItem';
import styles from './index.module.scss';
import request from '@/utils/request'

const ArticleList = ({channelId, activeId}) => {
    console.log( channelId, activeId)
    useEffect(() => {
        const fetchDate = async() => {
            const res = await request({
                url: '/articles',
                method: 'get',
                params: {
                    channel_id: channelId,
                    timestamp: Date.now()
                }
            })
            console.log('res', res)
        }
        if(channelId === activeId) {
            fetchDate()
        }
    }, [])

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