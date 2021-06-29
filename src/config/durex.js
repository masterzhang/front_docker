import durex from '@gem-mine/durex'
import router from '@gem-mine/durex-router'
import { setCurrentMenu } from '../util/menu'

durex.defaults({
  reducers: {},
  middlewares: []
})

// 路由模式，默认 hash，可选 browser，采用 history 模式，需要服务端支持
router.config('hash')

durex.hook((action, getState) => {
  // 路由变化时处理菜单高亮与展开状态
  if (action.type === '@@router/LOCATION_CHANGE') {
    const store = getState()
    if (store.navigation.menuRendered) {
      const url = action.payload.location.pathname
      setCurrentMenu(url)
    }
    document.documentElement.scrollTop = 0
  }
})
