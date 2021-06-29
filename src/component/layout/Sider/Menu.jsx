import React from 'react'
import { smart, actions } from '@gem-mine/durex'
import { urlFor, Link, withRouter } from '@gem-mine/durex-router'
import { Menu, Icon } from 'fish'
import classNames from 'classnames'
import config from '@/config/site'
import menus from '@/config/menu'
import { getMenuByKeyPath, loopMenu, setCurrentMenu } from '@/util/menu'
import { authentication } from '@/util/account'
import style from './style.module.less'

const { SubMenu } = Menu

function Item({ item }) {
  return (
    <>
      <Icon type={item.icon} />
      <span>{item.name}</span>
    </>
  )
}

const callback = function (item) {
  return item.authCode ? authentication(item.authCode) : true
}

function generateMenu(menusConf) {
  const filterMenu = loopMenu(menusConf, callback)
  return filterMenu.map((item) => {
    if (item.sub) {
      return (
        <SubMenu key={item.keyPath.join('-')} title={<Item item={item} />}>
          {generateMenu(item.sub)}
        </SubMenu>
      )
    } else {
      let content
      if (item.action) {
        content = <Item item={item} />
      } else if (item.route) {
        content = (
          <Link to={urlFor(item.path, item.params)}>
            <Item item={item} />
          </Link>
        )
      } else if (/^https?:/.test(item.url)) {
        content = (
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <Item item={item} />
          </a>
        )
      } else {
        content = (
          <Link to={urlFor(item.url, item.params)}>
            <Item item={item} />
          </Link>
        )
      }
      return <Menu.Item key={item.keyPath.join('-')}>{content}</Menu.Item>
    }
  })
}

@smart(
  (state) => ({
    openKeys: state.navigation.openKeys,
    menu: state.navigation.menu
  }),
  () => ({
    setNavigation({ item, key }) {
      const menu = getMenuByKeyPath(menus, key)
      if (menu.action) {
        menu.action(item, key, menu)
        return false
      } else if (/^https?:/.test(menu.url)) {
        return false
      }
    },
    setMenu(openKeys) {
      actions.navigation.setOpenKeys(openKeys)
    }
  })
)
@withRouter
class Menus extends React.Component {
  componentDidMount() {
    setCurrentMenu(this.props.location.pathname, true)
  }

  render() {
    const { props } = this
    let selectedKeys
    const { menu } = props
    if (menu && menu.length) {
      const last = menu[menu.length - 1]
      selectedKeys = [last.keyPath.join('-')]
    } else {
      selectedKeys = ['0']
    }

    return (
      <div className={style.menu}>
        <Menu
          theme={classNames(config.dark ? 'dark' : 'light')}
          mode="inline"
          onClick={props.setNavigation}
          openKeys={props.openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={props.setMenu}
        >
          {generateMenu(menus)}
        </Menu>
      </div>
    )
  }
}

export default Menus
