import React from 'react'
import { Link } from '@gem-mine/durex-router'
import config from '@/config/site'
import logo from '@/asset/logo.png'
import style from './style.module.less'

export default function Logo() {
  return (
    <div className={style.logo} id="logo">
      <Link to="/">
        <img src={logo} alt="logo" />
        <h1>{config.title}</h1>
      </Link>
    </div>
  )
}
