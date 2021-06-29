import React, { PureComponent, Suspense } from 'react'
import { smart } from '@gem-mine/durex'
import { Layout } from 'fish'
import config from '@/config/site'
import classNames from 'classnames'
import PageLoading from '../../status/Loading'
import Logo from './Logo'
import Menu from './Menu'

import style from './style.module.less'

const { Sider } = Layout

@smart((state) => ({
  collapsed: state.navigation.collapsed
}))
class SiderLayout extends PureComponent {
  render() {
    return (
      <Sider
        className={classNames(style.sider, { [style.light]: !config.dark })}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        breakpoint="lg"
        width={256}
      >
        <Suspense fallback={<PageLoading />}>
          <Logo />
          <Menu />
        </Suspense>
      </Sider>
    )
  }
}

export default SiderLayout
