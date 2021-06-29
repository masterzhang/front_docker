import React from 'react'
import { Spin } from 'fish'
import style from './style.module.less'

export default function Loading() {
  return (
    <div className={style.loading}>
      <Spin size="large" />
    </div>
  )
}
