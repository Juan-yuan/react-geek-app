import React, { useEffect } from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import { List, DatePicker } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '@/store/actions/profile'
import classNames from 'classnames'

const { Item } = List

export default function Profile() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    // get profile data from redux
    const profile = useSelector(state => state.profile.profile)
    console.log('profile', profile)
    const {photo, birthday, name, intro, gender } = profile
  return (
    <div className={styles.root}>
        <NavBar>个人信息</NavBar>

        <div className="wrapper">
            <List className='profile-list'>
                <Item arrow="horizontal" 
                    extra={
                        <span className='avatar-wrapper'>
                            <img src={photo} alt="" />
                        </span>
                    } 
                    onClick={() => {}}
                >头像</Item>
                <Item arrow="horizontal" extra={name} onClick={() => {}} >昵称</Item>
                <Item 
                    arrow="horizontal" 
                    extra={<span className={classNames('intro', intro ? 'normal' : '')}>{intro || '未填写'}</span>} 
                    onClick={() => {}} 
                >简介</Item>
            </List>

            <List className='profile-list'>
                <Item arrow="horizontal" extra={gender === 0 ? '男' : '女'} onClick={() => {}}>性别</Item>
                <DatePicker
                    value={new Date(birthday)}
                    onChange={() => {}}
                    mode="date"
                    title="选择生日"
                    minDate={new Date('1900-01-01')}
                    maxDate={new Date()}
                >
                    <Item arrow="horizontal" extra={'2020-02-02'} onClick={() => {}}>生日</Item>
                </DatePicker>
            </List>
        </div>
        <div className="logout">
            <button className="btn">退出登录</button>
        </div>
    </div>
  )
}
