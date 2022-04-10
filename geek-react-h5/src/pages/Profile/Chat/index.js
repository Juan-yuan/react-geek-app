import {useState} from 'react'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'

const Chat = () => {
    const photo = useSelector(state => state.profile.user.photo)
    const [messageList, setMessageList] = useState([
        {type: 'robot', text:'亲爱的用户您好，小智同学为您服务。'},
        {type: 'user', text:'你好'}
    ])

    return (
        <div className={styles.root}>
            <NavBar className="fixed-header" >
                小智同学
            </NavBar>

            <div className="chat-list">
                {
                    messageList.map((item, index) => {
                        if(item.type === 'robot') {
                            // 机器人消息
                            return (
                                <div className="chat-item" key={index}>
                                    <Icon type="iconbtn_xiaozhitongxue" />
                                    <div className="message">
                                        {item.text}
                                    </div>
                                </div>
                            )
                        } else {
                            {/* 用户的消息 */}
                            return (
                                <div className="chat-item user" key={index}>
                                    <img src={photo || 'http://toutiao.itheima.net/images/user_head.jpg'} alt="" />
                                    <div className="message">{item.text}</div>
                                </div>
                            )
                        }
                    })  
                }
                

                
            </div>

            <div className="input-footer">
                <Input
                className="no-border"
                placeholder="请描述您的问题"
                onKeyDown={() => {}}
                value={''}
                onChange={() => {}}
                />
                <Icon type="iconbianji" />
            </div>
        </div>
    )
}

export default Chat
