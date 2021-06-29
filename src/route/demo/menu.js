import { asyncLoader } from '@/util/loader'

export default {
  path: '/menu',
  name: 'menu.various',
  module: {
    nestOne: {
      index: true,
      name: 'menu.various.nest.nestOne',
      path: '/nest1',
      component: asyncLoader('page/demo/menu/classical/Tang')
    },
    nestTwo: {
      path: '/nest2',
      name: 'menu.various.nest.nestTwo',
      component: asyncLoader('page/demo/menu/classical/Song')
    },
    user: {
      path: '/user',
      name: 'menu.various.user',
      component: asyncLoader('page/demo/menu/visible/User')
    },
    admin: {
      path: '/admin',
      name: 'menu.various.admin',
      permission: (props) => {
        const { authCode } = props.menu
        return authCode === 'admin'
      },
      component: asyncLoader('page/demo/menu/visible/Admin')
    },
    subMenu: {
      path: '/submenu',
      name: 'menu.various.submenu',
      component: asyncLoader('page/demo/menu/SubMenu'),
      sub: {
        tang: {
          index: true,
          name: 'menu.common.submenu.tang',
          path: '/tang',
          component: asyncLoader('page/demo/menu/classical/Tang')
        },
        song: {
          path: '/song',
          name: 'menu.common.submenu.song',
          component: asyncLoader('page/demo/menu/classical/Song')
        },
        yuan: {
          path: '/yuan',
          name: 'menu.common.submenu.yuan',
          component: asyncLoader('page/demo/menu/classical/Yuan')
        }
      }
    }
  }
}
