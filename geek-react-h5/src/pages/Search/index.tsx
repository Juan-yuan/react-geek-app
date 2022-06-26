import { useState, useRef, useEffect} from 'react'
import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import classNames from 'classnames'
import { useHistory } from 'react-router'
import styles from './index.module.scss'
import debounce from 'lodash/debounce'
import { DebouncedFunc } from 'lodash'
import { useDispatch, useSelector} from 'react-redux'
import { getSuggestList } from '@/store/actions/search'
import { RootState } from '@/store/index'

// let fetDate: DebouncedFunc<() => void>
const Search = () => {
    const history = useHistory()
    const [keyword, setKeyword] = useState('')
    const dispatch = useDispatch()
    const suggestions = useSelector( (state: RootState) => {
        // return state.search.suggestions
        // console.log('state', state.search.suggestions)
        return state.search.suggestions
    })
    console.log("suggestions", suggestions)

    // 防抖第二种方法： lodash来做：
    // if(!fetDate) {
    //     fetDate = debounce(() => {
    //         console.log('发送请求')
    //     }, 500)
    // }
    
    // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const text = e.target.value  //这样定时器里面就是最新的值,如果定时器里使用 keyword就会有闭包问题
    //     setKeyword(text)
    //     fetDate()
    // }

    // 1. 防抖第一种方法：定时器做防抖 
    const timeRef = useRef(-1)
    
    useEffect(() => {
        return () => {
            window.clearTimeout(timeRef.current)
        }
    }, [])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value  //这样定时器里面就是最新的值,如果定时器里使用 keyword就会有闭包问题
        setKeyword(text)

        window.clearTimeout(timeRef.current)
        timeRef.current = window.setTimeout(() => {
            dispatch(getSuggestList(text))
        }, 500)
        console.log('需要发送请求进行搜索')
    }

    // highlight font
    const highlight = ( str: string, key: string) => {
        return str.replace(new RegExp(key, 'gi'), (match: string) => {
            return `<span style="color: red">${match}</span>`
        })
    }

    
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
                        <input 
                            type="text" 
                            placeholder="请输入关键字搜索" 
                            value={keyword} 
                            onChange={e => onChange(e)} 
                        />
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
                {
                    suggestions.map( (item, index)  => {
                        return (
                            <div className="result-item" key={index}>
                                <Icon className="icon-search" type="iconbtn_search" />
                                <div className="result-value" dangerouslySetInnerHTML={{__html: highlight(item, keyword)}}>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default Search
