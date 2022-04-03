import React, { useEffect } from 'react'
import Icon from "@/components/Icon"
import styles from "./index.module.scss"
import { useHistory  } from 'react-router-dom'

function NavBar({children, extra, onLeftClick}) {
    const history = useHistory()
    const back = () => {
        if(onLeftClick) {
            onLeftClick()
        } else {
            history.go(-1)
        }
    }
    return (
        <div className={styles.root}>
        <div className='left'>
            <Icon type="iconfanhui" onClick={back} />
        </div>

        <div className="title">{children}</div>

        <div className="right">{extra}</div>
        </div>
    )
}

export default NavBar;
