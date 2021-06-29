import React, { PureComponent } from 'react'
import { Icon } from 'fish'
import Debounce from 'lodash-decorators/debounce'
import { smart, actions } from '@gem-mine/durex'
import config from '@/config/site'
import style from './style.module.less'
import RightContent from './RightContent'

@smart((state) => ({
  collapsed: state.navigation.collapsed
}))
class Header extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel()
  }

  toggle = () => {
    actions.navigation.setSiderCollapsed()
    this.triggerResizeEvent()
  }

  handleMenuClick = ({ key }) => {
    if (key === 'submenu') {
      actions.router.push('/demo/menu/submenu')
      return
    }
    if (key === 'logout') {
      actions.login.logout()
    }
  }

  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, false)
    window.dispatchEvent(event)
  }

  render() {
    const { collapsed } = this.props
    return (
      <div className={style.header}>
        {config.sider ? (
          <span className={style.trigger} onClick={this.toggle}>
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
          </span>
        ) : null}
        <RightContent onMenuClick={this.handleMenuClick} />
      </div>
    )
  }
}

export default Header
