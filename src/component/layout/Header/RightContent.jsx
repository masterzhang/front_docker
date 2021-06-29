import React, { PureComponent } from 'react'
import {
  Spin, Menu, Avatar, Dropdown, Icon
} from 'fish'
import { smart, actions } from '@gem-mine/durex'
import intl from '@gem-mine/intl-react'
import SelectLang from '../../SelectLang/index'
import style from './style.module.less'

@smart(({ user }) => ({
  currentUser: user.currentUser,
  avatar: user.avatar
}))
class GlobalHeaderRight extends PureComponent {
  handleAvatarError = () => {
    actions.user.setDefaultAvatar()
  }

  render() {
    const { currentUser, onMenuClick, theme } = this.props
    const menu = (
      <Menu className={style.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="submenu">
          <Icon type="code" />
          {intl.get('menu.common.submenu', 'submenu')}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          {intl.get('menu.account.logout', 'logout')}
        </Menu.Item>
      </Menu>
    )
    let className = style.right
    if (theme === 'dark') {
      className = `${style.right}  ${style.dark}`
    }
    return (
      <div className={className}>
        {currentUser.name ? (
          <Dropdown overlayClassName={style.container} overlay={menu}>
            <span className={`${style.action} ${style.account}`}>
              <Avatar size="small" className={style.avatar} src={this.props.avatar} alt="avatar" onError={this.handleAvatarError} />
              <span className={style.name}>{currentUser.name}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        <SelectLang className={style.action} />
      </div>
    )
  }
}

export default GlobalHeaderRight
