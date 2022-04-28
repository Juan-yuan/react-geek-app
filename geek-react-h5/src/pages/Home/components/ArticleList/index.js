import { useState, useEffect } from 'react';
import ArticleItem from '../ArticleItem';
import styles from './index.module.scss';
import request from '@/utils/request'

const ArticleList = ({channelId, activeId}) => {
    const [list, setList] = useState([]);

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
            setList(res.data.results)
        }
        if(channelId === activeId) {
            fetchDate()
        }
    }, [channelId, activeId])

    return (
        <div className={styles.root}>
            <div className="articles">
                {
                    list.map(item => (
                        <div className="article-item" key={item.art_id}>
                            <ArticleItem article={item} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ArticleList;