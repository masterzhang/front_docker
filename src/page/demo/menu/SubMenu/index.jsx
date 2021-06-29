import React, { Component } from 'react'
import { Routes, withRouter, Link } from '@gem-mine/durex-router'
import intl from '@gem-mine/intl-react'
import { Menu } from 'fish'
import { urlFor } from '@gem-mine/durex-router/lib/helper'
import style from './style.module.less'

const { Item } = Menu

@withRouter
class SubMenu extends Component {
  render() {
    const { match, location } = this.props
    const key = location.pathname.replace(`${match.path}/`, '')
    const selectKey = ['tang', 'song', 'yuan'].includes(key) ? key : 'tang'
    return (
      <div className={style.main}>
        <div className={style.leftmenu}>
          <Menu mode="vertical" selectedKeys={[selectKey]} className={style.menuUl}>
            <Item key="tang">
              <Link to={urlFor('main.demo.menu.subMenu.tang')}>
                {intl.get('menu.common.submenu.tang', 'The tang dynasty')}
              </Link>
            </Item>
            <Item key="song">
              <Link to={urlFor('main.demo.menu.subMenu.song')}>
                {intl.get('menu.common.submenu.song', 'Song lyrics')}
              </Link>
            </Item>
            <Item key="yuan">
              <Link to={urlFor('main.demo.menu.subMenu.yuan')}>{intl.get('menu.common.submenu.yuan', 'Yuan Qu')}</Link>
            </Item>
          </Menu>
        </div>
        <div className={style.right}>
          <Routes path="main.demo.menu.subMenu" />
        </div>
      </div>
    )
  }
}

export default SubMenu
