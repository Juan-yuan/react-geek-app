import React from 'react'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'

export default function Home() {
  const tabs = [
    {
      id: 1,
      name: '频道1',
    },
    {
      id: 2,
      name: '频道2',
    },
    {
      id: 3,
      name: '频道3',
    },
    {
      id: 4,
      name: '频道4',
    },
    {
      id: 5,
      name: '频道5',
    },
  ]
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs}></Tabs>
    </div>
  )
}
