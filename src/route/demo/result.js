import { asyncLoader } from '../../util/loader'

export default {
  path: '/status',
  module: {
    success: {
      path: '/success',
      name: 'menu.result.success',
      component: asyncLoader('page/demo/result/Success')
    },
    failure: {
      path: '/failure',
      name: 'menu.result.fail',
      component: asyncLoader('page/demo/result/Error')
    }
  }
}
