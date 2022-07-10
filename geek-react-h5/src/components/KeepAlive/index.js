import { Route } from 'react-router-dom'
import styles from './index.module.scss'


const KeepAlive = ({alivePath, component: Component, ...rest}) => {
    return (
        <Route {...rest}>
            {(props) => {
                const { location } = props 
                const matched = location.pathname.startsWith(alivePath)
                return (
                    <div
                        className={styles.root}
                        style={{ display: matched ? 'block' : 'none'}}
                    >
                        <Component {...props} />
                    </div>
                )
            }}
        </Route>
    )
}

export default KeepAlive