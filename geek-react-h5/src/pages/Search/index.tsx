import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import classNames from 'classnames'
import { useHistory } from 'react-router'
import styles from './index.module.scss'

const Search = () => {
    const history = useHistory()

    return (
        <div className={styles.root}>
            <NavBar
                className="navbar"
                onLeftClick={() => history.go(-1)}
                extra={
                    <span className="search-text">搜索</span>
                }
            >
                <div className='navbar-search'>
                    <Icon type="iconbtn_search" className='icon-search' />
                    <div className='input-wrapper'>
                        <input type="text" placeholder="请输入关键字搜索" />
                        <Icon type="iconbtn_tag_close" className="icon-close" />
                    </div>
                </div>
            </NavBar>

            <div className="history">
                <div className="history-header">
                    <span>搜索历史</span>
                    <span>
                        <Icon type="iconbtn_del" />
                        清除全部
                    </span>
                </div>

                <div className="history-list">
                <span className="history-item">
                    Python生成九宫格图片<span className="divider"></span>
                </span>
                <span className="history-item">
                    Python<span className="divider"></span>
                </span>
                <span className="history-item">
                    CSS<span className="divider"></span>
                </span>
                <span className="history-item">
                    数据分析<span className="divider"></span>
                </span>
                </div>
            </div>

            <div className='search-result'>
                <div className="result-item">
                    <Icon className="icon-search" type="iconbtn_search" />
                    <div className="result-value">
                    <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
