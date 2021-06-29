import { asyncLoader } from '../../util/loader'

export default {
  path: '/business',
  name: 'menu.business',
  module: {
    echarts: {
      path: '/echarts',
      name: 'menu.business.chart',
      component: asyncLoader('page/demo/business/chart/Echarts')
    }
  }
}
