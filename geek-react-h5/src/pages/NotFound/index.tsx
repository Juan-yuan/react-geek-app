import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Index() {
    const [time, setTime] = useState(3)
    const history = useHistory()

    useEffect(() => {
        let timer = setTimeout(() => {
            setTime(time - 1)
        }, 1000)
        
        return () => {
            clearTimeout(timer)
        }
    })
    useEffect(() => {
        if( time === 0) {
            history.push('/home/index')
        }
    }, [time, history])
  return (
    <div>
        <h1>对不起，你访问的内容不存在...</h1>
        <p>
            {time}秒后，返回<Link to="/home">首页</Link>
        </p>
    </div>
  )
}
