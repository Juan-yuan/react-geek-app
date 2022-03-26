import React, { useEffect } from 'react'
import Icon from "@/components/Icon"
import styles from "./index.module.scss"
import { withRouter } from 'react-router-dom'

function NavBar({children, extra, history}) {
    const back = () => {
        console.log(history)
    }
    return (
        <div className={styles.root}>
        <div className='left'>
            <Icon type="icon-a-9-zuo" onClick={back} />
        </div>

        <div className="title">{children}</div>

        <div className="right">{extra}</div>
        </div>
    )
}

export default withRouter(NavBar)
