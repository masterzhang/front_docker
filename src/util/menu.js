import { actions } from '@gem-mine/durex'
import router, { getRouteByKeyPath, urlFor } from '@gem-mine/durex-router'
import intl from '@gem-mine/intl-react'

// 具有自定义 highlight 属性的菜单缓存，用于常规方式没有找到高亮菜单后的备选方案
const highlightMenuCache = []

/**
 * 通过 url 查找具备 highlight 方法的菜单
 * @param {string} url
 * @return {object} {menu: 命中的菜单，可能undefined, match: boolean 是否命中}
 */
export function highlightMenuWhenNotMatch(url) {
  let match = false
  let menu
  highlightMenuCache.some((item) => {
    match = item.highlight(url)
    if (match) {
      menu = item
      return true
    }
    return false
  })
  return { match, menu }
}

/**
 * 完善路由，在国际化完成后执行，用于：
 *   处理国际化信息
 * @param {array} flatRoutes 拍平的路由
 */
export function perfectRoute(flatRoutes) {
  Object.keys(flatRoutes).forEach((key) => {
    const item = flatRoutes[key]
    if (item.name) {
      item.name = intl.get(item.name) || item.name
    }
  })
}

/**
 * 完善菜单，在国际化完成后执行，用于：
 *   处理国际化信息
 *   完善菜单的路由信息
 *   构建菜单的 keyPath，keyPath 是一个数组，由菜单及其祖先菜单的下标索引组成
 *   构建 urlMenu
 * @param {array} menus 拍平的菜单
 */
export function perfectMenu(menus) {
  loopMenu(menus, (item, index, parentMenu) => {
    let i18n = false
    if (item.route) {
      const keyPath = item.route
      const route = getRouteByKeyPath(keyPath)
      if (route) {
        item.path = keyPath
        item.url = urlFor(keyPath, item.params)
        item.route = route
        if (!item.name) {
          item.name = route.name
          i18n = true
        }
        if (!route.menu) {
          route.menu = item
        }
      }
    }
    if (!i18n) {
      if (item.name) {
        item.name = intl.get(item.name) || item.name
      }
    }
    if (parentMenu) {
      item.keyPath = parentMenu.keyPath.concat(index)
    } else {
      item.keyPath = [index]
    }
    if (item.highlight) {
      highlightMenuCache.push(item)
    }
    return true
  })
}

/**
 * 递归遍历菜单，如果某一项返回 false，则不再遍历其子菜单
 * @param {array} menus 菜单配置
 * @param {function} callback(item 当前菜单项, index 所处下标, parentMenu 父菜单)
 * @param {object} parentMenu 父菜单，顶级菜单没有父菜单，最外层调用时不要提供
 * @param {number} 内部递归使用，数组下标
 * @param {array} 内部递归使用，结果数组
 */
export function loopMenu(menus, callback, parentMenu, index, result) {
  // 初始化，首层结构是数组，后续传入的是元素
  let currentResult = result
  if (!currentResult) {
    currentResult = []
    menus.forEach((item, idx) => {
      loopMenu(item, callback, parentMenu, idx, currentResult)
    })
  } else {
    // 进入元素递归
    const item = menus
    if (item.sub) {
      if (callback(item, index, parentMenu)) {
        const copy = { ...item, sub: [] }
        currentResult.push(copy)
        item.sub.forEach((i, idx) => {
          loopMenu(i, callback, item, idx, copy.sub)
        })
      }
    } else if (callback(item, index, parentMenu)) {
      currentResult.push(item)
    }
  }
  return currentResult
}

/**
 * 通过 keyPath 查找 menu
 * @param {array} menus 菜单配置
 * @param {string|array} keyPath
 */
export function getMenuByKeyPath(menus, keyPath) {
  let path = keyPath
  if (typeof path === 'string') {
    path = path.split('-').map((index) => parseInt(index, 10))
  }
  if (path.length > 0) {
    let cursor = menus[path[0]]
    for (let i = 1; i < path.length; i++) {
      if (!cursor) {
        break
      }
      cursor = cursor.sub[path[i]]
    }
    return cursor
  }
}

/**
 * 根据传入的 url 高亮当前的菜单
 */
export function setCurrentMenu(url, firstRender) {
  const arr = url.split('/')
  let match
  let menu
  for (let i = arr.length; i > 0; i--) {
    const currentUrl = arr.slice(0, i).join('/')
    const route = router.getRouteByUrlPath(currentUrl)
    if (route) {
      menu = route.menu
      if (menu) {
        match = true
        break
      }
    }
  }
  if (!match) {
    const result = highlightMenuWhenNotMatch(url)
    match = result.match
    menu = result.menu
  }
  if (match) {
    actions.navigation.setMenu({
      keyPath: menu.keyPath,
      firstRender
    })
  } else {
    actions.navigation.setMenu({
      firstRender
    })
  }
}
