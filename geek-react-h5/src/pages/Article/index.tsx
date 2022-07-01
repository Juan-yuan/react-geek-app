import Icon from '@/components/Icon'
import NavBar from "@/components/NavBar"
import { useHistory } from 'react-router'
import styles from './index.module.scss'

const Article = () => {
    const history = useHistory()

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
                                <h1 className="title">{'测试文字 1234'}</h1>  

                                <div className="info">
                                    <span>{'2020-10-10'}</span>
                                    <span>{10}阅读</span>
                                    <span>{10}评论</span>
                                </div> 

                                <div className="author">
                                    <img src={''} alt="" />
                                    <span className="name">{'张三'}</span>
                                    <span className="follow">关注</span>
                                </div>
                            </div>
                            <div className="content">
                                <div className="content-html dg-html">
                                    测试内容123
                                </div>
                                <div className="date">
                                    发布文章时间：{'2020-10-10'}
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