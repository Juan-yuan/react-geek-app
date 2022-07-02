import Icon from "@/components/Icon"
import styles from "./index.module.scss"
import { useHistory  } from 'react-router-dom'
import classNames from 'classnames'
import { ReactElement } from 'react'

type Props = {
    children?: string | ReactElement
    extra?: string | ReactElement
    className?: string
    onLeftClick?: () => void
}

function NavBar({children, extra, onLeftClick, className = ''}: Props) {
    const history = useHistory()
    const back = () => {
        if(onLeftClick) {
            onLeftClick()
        } else {
            history.go(-1)
        }
    }
    return (
        <div className={classNames(styles.root, className )}>
        <div className='left'>
            <Icon type="iconfanhui" onClick={back} />
        </div>

        <div className="title">{children}</div>

        <div className="right">{extra}</div>
        </div>
    )
}

export default NavBar;
