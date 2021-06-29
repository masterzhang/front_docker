import { asyncLoader } from '../util/loader'

export default {
  module: {
    403: {
      path: '/403',
      component: asyncLoader('component/status/403')
    },
    404: {
      path: '/404',
      component: asyncLoader('component/status/404')
    },
    500: {
      path: '/500',
      component: asyncLoader('component/status/500')
    },
    loadError: {
      path: '/exception/loadError',
      component: asyncLoader('component/status/Error')
    }
  }
}
