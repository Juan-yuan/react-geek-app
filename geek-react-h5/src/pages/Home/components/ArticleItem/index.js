import classnames from 'classnames'
import Icon from '@/components/Icon'
import Img from '@/components/Image'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'   // 指定导入中文
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

const ArticleItem = ({article}) => {
  const { 
    cover: { type, images },
    title,
    aut_name,
    comm_count,
    pubdate
   } = article
  return (
    <div
      className={styles.root}
    >
      {/* t3: 三图结构 none-mt没有图片结构  */}
      <div
        className={classnames('article-content',
        type === 3 ? 't3' : '',
        type === 0 ? 'none-mt' : '')}
      >
        <h3>{ title }</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div className="article-img-wrapper" key={i}>
                <Img src={item} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{aut_name}</span>
        <span>{comm_count}</span>
        {/* fromNow: 距离现在的时间 */}
        <span>{dayjs(pubdate).fromNow()}</span>

        <span className="close">
          <Icon type="iconbtn_iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
