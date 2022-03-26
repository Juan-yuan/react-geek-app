import React from 'react'
import NavBar from "@/components/NavBar"
import Input from '@/components/Input'
import styles from './index.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Login() {
  const onExtraClick = () => {
    console.log('哈哈哈')
  }

  const formik = useFormik({
    initialValues: {
      mobile: '1391111111',
      code: '123456'
    },
    onSubmit(values) {
      console.log(values)
    },
    validationSchema: Yup.object({
      mobile: Yup.string().required('手机号不能为空').matches(/^1[3-9]\d{9}$/, '手机号格式错误'),
      code: Yup.string().required('验证码不能为空').matches(/^\d{6}$/, '验证码格式错误'),
    })
    // first way to do validate
    // validate(values) {
    //   const errors = {}
    //   if(!values.mobile) {
    //     errors.mobile = '手机号不能为空'
    //   }
    //   if(!values.code) {
    //     errors.code = '手机号不能为空'
    //   }
    //   return errors
    // }
  })
  const { 
    values: {mobile, code}, 
    handleChange, 
    handleSubmit, 
    handleBlur, 
    touched, 
    errors 
  } = formik;
  return (
    <div className={styles.root}>
      <NavBar>登录</NavBar>
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input 
              name="mobile"
              placeholder="请输入手机号" 
              value={mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {touched.mobile && errors.mobile ? 
              (<div className="validate">{errors.mobile}</div>)
            : null}
          </div>
          <div className="input-item">
            <Input 
              name="code"
              placeholder="请输入验证码" 
              extra="获取验证码" 
              onExtraClick={onExtraClick} 
              value={code}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {touched.code && errors.code ? 
              (<div className="validate">{errors.code}</div>)
            : null}
          </div>
          <button type="submit" className='login-btn'>
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
