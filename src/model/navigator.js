import durex from '@gem-mine/durex'
import menus from '../config/menu'
import { checkStringBool } from '../util/url'
import { uniqueArray } from '../util/fn'
import config, { query } from '../config/site'

durex.model({
  name: 'navigation',
  state: {
    collapsed: false, // 左侧菜单是否折叠成 mini 状态
    openKeys: [], // 打开菜单的状态
    openKeysCache: [], // 菜单打开状态的缓存，用于 collapsed 折叠处理
    menuRendered: false, // 菜单是否已经显示
    menu: [] // 当前高亮的菜单（包括其祖先菜单）
  },
  reducers: {
    setMenu(data = {}) {
      const { firstRender = false, keyPath } = data
      const { openKeysCache } = this.getState()
      let pointer = menus
      const arr = []
      let openKeys = localStorage.getItem('openKeys')
      if (openKeys) {
        openKeys = openKeys.split('/')
      }
      if (!openKeys) {
        openKeys = []
      }
      if (keyPath) {
        keyPath.forEach((i, index) => {
          const idx = parseInt(i, 10)
          const current = index === 0 ? pointer[idx] : pointer.sub[idx]
          arr.push(current)
          const kp = current.keyPath.join('-')
          if (openKeys.indexOf(kp) === -1) {
            openKeys.push(kp)
          }
          pointer = current
        })
      }
      if (openKeys.length === 0) {
        openKeys = ['0']
      }
      openKeys = uniqueArray(openKeys)

      let collapsed
      if (firstRender) {
        // 初始化 collapsed 判断规则：先看 url 有没有设置，没设置看 localStorage 有没有值，最后看 config 配置
        if (query.collapsed) {
          collapsed = checkStringBool(query.collapsed)
        } else {
          collapsed = localStorage.getItem('collapsed')
          if (collapsed === null) {
            collapsed = config.collapsed
          } else {
            collapsed = checkStringBool(collapsed)
          }
        }
        localStorage.setItem('collapsed', +collapsed)
      } else {
        collapsed = checkStringBool(localStorage.getItem('collapsed'))
      }
      const allOpenKeys = uniqueArray(openKeys.concat(openKeysCache))
      if (!collapsed) {
        localStorage.setItem('openKeys', allOpenKeys.join('/'))
      }
      return this.setField({
        collapsed,
        menu: arr,
        openKeys: collapsed ? [] : allOpenKeys,
        openKeysCache: allOpenKeys,
        menuRendered: true
      })
    },
    setOpenKeys(openKeys) {
      const { collapsed } = this.getState()
      if (collapsed) {
        return this.setField({
          openKeys
        })
      } else {
        localStorage.setItem('openKeys', openKeys.join('/'))
        return this.setField({
          openKeys,
          openKeysCache: openKeys
        })
      }
    },
    setSiderCollapsed() {
      const { collapsed, openKeysCache } = this.getState()
      if (collapsed) {
        // 目前关着，准备打开
        localStorage.setItem('collapsed', 0)
        return this.setField({
          collapsed: false,
          openKeys: openKeysCache
        })
      } else {
        // 目前打开，准备关闭
        localStorage.setItem('collapsed', 1)
        return this.setField({
          collapsed: true,
          openKeys: []
        })
      }
    }
  },
  effects: {}
})
