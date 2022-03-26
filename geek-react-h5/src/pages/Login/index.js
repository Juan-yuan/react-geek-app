import React, {useState} from 'react'
import NavBar from "@/components/NavBar"
import Input from '@/components/Input'
import classNames from 'classnames'
import styles from './index.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { sendCode } from '@/store/actions/login'
import { Toast } from 'antd-mobile'

export default function Login() {
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();

  const onExtraClick = async () => {
    if(time > 0) return;
    if(!/^1[3-9]\d{9}$/.test(mobile)){
      formik.setTouched({
        mobile: true,
      })
      return
    }
    try {
      await dispatch(sendCode(mobile))
      Toast.success('Get verification code successful!', 1)
      setTime(60)
      setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } catch (err) {
      if(err.response) {
        Toast.info(err.response.data.message, 1)
      } else {
        Toast.info('Please try again.')
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      mobile: '',
      code: ''
    },
    onSubmit(values) {
      console.log(values)
    },
    validationSchema: Yup.object({
      mobile: Yup.string().required('Mobile number must be filled!').matches(/^1[3-9]\d{9}$/, 'Incorrect format of mobile number.'),
      code: Yup.string().required('Verification code must be filled!').matches(/^\d{6}$/, 'Incorrect format of verification code.'),
    })
    // first way to do validate
    // validate(values) {
    //   const errors = {}
    //   if(!values.mobile) {
    //     errors.mobile = 'Mobile number must be filled!'
    //   }
    //   if(!values.code) {
    //     errors.code = 'Verification code must be filled!'
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
    errors,
    isValid
  } = formik;
  return (
    <div className={styles.root}>
      <NavBar>Login</NavBar>
      <div className="content">
        <h3>Message Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input 
              name="mobile"
              placeholder="Phone number" 
              value={mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              maxLength={11}
            />
            {touched.mobile && errors.mobile ? 
              (<div className="validate">{errors.mobile}</div>)
            : null}
          </div>
          <div className="input-item">
            <Input 
              name="code"
              placeholder="Verification code" 
              extra={time === 0 ? 'Get verification code' : 'Get after\n' + time + '\n seconds'}
              onExtraClick={onExtraClick} 
              value={code}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              maxLength={6}
            />
            {touched.code && errors.code ? 
              (<div className="validate">{errors.code}</div>)
            : null}
          </div>
          <button type="submit" className={classNames('login-btn', isValid ? '' : 'disabled' )} disabled = {!isValid}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
