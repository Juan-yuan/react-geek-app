import React, { useEffect, useState, useRef } from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import { List, DatePicker, Drawer, Toast } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, updatePhoto, updateProfile } from '@/store/actions/profile'
import classNames from 'classnames'
import EditInput from './EditInput'
import EditList from './EditList'

const { Item } = List

export default function Profile() {
    const dispatch = useDispatch()
    const fileRef = useRef()

    const [open, setOpen] = useState({
        visible: false,
        type: ''
    })
    const [listOpen, setListOpen] = useState({
        visible: false,
        type: ''
    })
    const onClose = () => {
        setOpen({
            visible: false,
            type: '' 
        })
        setListOpen({
            visible: false,
            type:''
        })
    }
    useEffect(() => {
        dispatch(getProfile())
        dispatch(updateProfile())
    }, [dispatch])

    const onCommit = async (type, value) => {
        await dispatch(
            updateProfile({
                [type]: value
            })
        )
        Toast.success('修改成功', 1, null, false)
        onClose()
    }

    // get profile data from redux
    const profile = useSelector(state => state.profile.profile)
    const {photo, birthday, name, intro, gender } = profile

    const config = {
        avatar: [
            {
                title: '拍照',
                onClick: () => {
                    console.log('拍照')
                }
            },
            {
                title: '本地选择',
                onClick: () => {
                    fileRef.current.click()
                }
            },
        ],
        gender : [
            {
                title: '男',
                onClick: () => {
                    onCommit('gender', 0)
                }
            },
            {
                title: '女',
                onClick: () => {
                    onCommit('gender', 1)
                }
            },
        ]
    }

    const onFileChange = async (e) => {
        const file = e.target.files[0]
        const fd = new FormData();
        // 把文件上传到服务器
        fd.append('photo', file)

        await dispatch(updatePhoto(fd))
        Toast.success('修改头像成功')
        onClose()
    }
  return (
    <div className={styles.root}>
        <div className="edit content">
            <NavBar>个人信息</NavBar>

            <div className="wrapper">
                <List className='profile-list'>
                    <Item arrow="horizontal" 
                        extra={
                            <span className='avatar-wrapper'>
                                <img src={photo} alt="" />
                            </span>
                        } 
                        onClick={() => {setListOpen({visible: true, type:'avatar'})}}
                    >头像</Item>
                    <Item 
                        arrow="horizontal" 
                        extra={name} 
                        onClick={() => {setOpen({
                            visible: true,
                            type: 'name'
                        })}} 
                    >昵称</Item>
                    <Item 
                        arrow="horizontal" 
                        extra={<span className={classNames('intro', intro ? 'normal' : '')}>{intro || '未填写'}</span>} 
                        onClick={() => {setOpen({
                            visible: true,
                            type: 'intro'
                        })}} 
                    >简介</Item>
                </List>

                <List className='profile-list'>
                    <Item arrow="horizontal" extra={gender === 0 ? '男' : '女'} onClick={() => {setListOpen({visible: true, type: 'gender'})}}>性别</Item>
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
            <input type="file" hidden ref={fileRef} onChange={onFileChange} />
            <div className="logout">
                <button className="btn">退出登录</button>
            </div>
        </div>

        {/* Drawer component input & textarea*/}
        <Drawer 
            className="drawer"
            sidebar={open.visible && <EditInput onClose={onClose} type={open.type} onCommit={onCommit} />} 
            open={open.visible}
        />

        {/* Drawer component image & gender*/}
        <Drawer
            className='drawer-list'
            position="bottom"
            sidebar={listOpen.visible && <EditList config={config} onClose={onClose} type={listOpen.type} ></EditList>}
            open={listOpen.visible}
            onOpenChange={onClose}
        />
    </div>
  )
}
