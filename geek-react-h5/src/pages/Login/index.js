import React from 'react'
import Icon from "@/components/Icon"
import "./index.scss"

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Icon 
        type="icon-renwu-01" 
        className="big" 
        onClick={() => console.log('clicked me')} 
      />
    </div>
  )
}
