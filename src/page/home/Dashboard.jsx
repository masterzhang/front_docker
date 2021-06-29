import React from 'react'
import style from './style.module.less'

export default function Dashboard() {
  return (
    <div className={style.dashboard}>
      <div className={style.logo} />
      <div className={style.welcome}>
        <span className={style.name}>Fish Pro</span>
        <span>一个更好的后台管理系统</span>
      </div>
      <div className={style.team}>WEB 端公共能力团队</div>
    </div>
  )
}
