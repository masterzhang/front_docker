import React, { Component } from 'react'
import { Routes, Link } from '@gem-mine/durex-router'
import SelectLang from '@/component/SelectLang'
import Footer from '../Footer/index'
import logo from '../../../asset/logo.png'
import styles from './style.module.less'

export default class LoginLayout extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Fish Design</span>
              </Link>
            </div>
            <div className={styles.desc}>更好用的后台管理系统</div>
          </div>
          <Routes path="user" />
        </div>
        <Footer />
      </div>
    )
  }
}
