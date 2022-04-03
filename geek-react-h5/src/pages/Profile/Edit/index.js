import React from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import { List, DatePicker } from 'antd-mobile'

const { Item } = List

export default function Profile() {
  return (
    <div className={styles.root}>
        <NavBar>个人信息</NavBar>

        <div className="wrapper">
            <List className='profile-list'>
                <Item arrow="horizontal" 
                    extra={
                        <span className='avatar-wrapper'>
                            <img src={''} alt="" />
                        </span>
                    } 
                    onClick={() => {}}
                >头像</Item>
                <Item arrow="horizontal" extra={'1561561567'} onClick={() => {}} >昵称</Item>
                <Item 
                    arrow="horizontal" 
                    extra={<span className='intro'>{`未填写`}</span>} 
                    onClick={() => {}} 
                >头像</Item>
            </List>

            <List className='profile-list'>
                <Item arrow="horizontal" extra={'女'} onClick={() => {}}>性别</Item>
                <DatePicker
                    value={new Date()}
                    onChange={() => {}}
                    mode="date"
                    title="选择生日"
                    minDate={new Date('1900-01-01')}
                    maxDate={new Date()}
                >
                    <Item arrow="horizontal" extra={'1990-05-05'} onClick={() => {}}>生日</Item>
                </DatePicker>
            </List>
        </div>
        <div className="logout">
            <button className="btn">退出登录</button>
        </div>
    </div>
  )
}
