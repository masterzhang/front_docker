// 菜单配置
const menu = [
  {
    name: 'menu.crud',
    icon: 'table',
    sub: [
      {
        name: 'menu.crud.modal',
        icon: 'border',
        route: 'main.demo.crud.modal'
      },
      {
        name: 'menu.crud.inline',
        icon: 'edit',
        route: 'main.demo.crud.inline'
      },
      {
        name: 'menu.crud.multiple',
        icon: 'book',
        route: 'main.demo.crud.multiple.list'
      },
      {
        name: 'menu.crud.card',
        icon: 'idcard',
        route: 'main.demo.crud.card'
      }
    ]
  },
  {
    name: 'menu.various',
    icon: 'appstore',
    sub: [
      {
        name: 'menu.various.nest',
        icon: 'bars',
        sub: [
          {
            name: 'menu.various.nest.nestOne',
            icon: 'smile',
            route: 'main.demo.menu.nestOne'
          },
          {
            name: 'menu.various.nest.nestTwo',
            icon: 'frown',
            route: 'main.demo.menu.nestTwo'
          }
        ]
      },
      {
        name: 'menu.various.submenu',
        icon: 'cluster',
        route: 'main.demo.menu.subMenu'
      },
      {
        name: 'menu.various.event',
        icon: 'scan',
        action() {
          // eslint-disable-next-line no-alert
          alert('hello, fish pro')
        }
      },
      {
        name: 'menu.various.link',
        icon: 'link',
        url: 'https://www.baidu.com'
      },
      {
        name: 'menu.various.control',
        icon: 'lock',
        sub: [
          {
            name: 'menu.various.user',
            icon: 'heart',
            route: 'main.demo.menu.user'
          },
          {
            name: 'menu.various.admin',
            icon: 'eye',
            route: 'main.demo.menu.admin',
            authCode: 'admin'
          }
        ]
      }
    ]
  },
  {
    name: 'menu.business',
    icon: 'code',
    sub: [
      {
        name: 'menu.business.chart',
        icon: 'pie-chart',
        route: 'main.demo.business.echarts'
      }
    ]
  },
  {
    name: 'menu.exception',
    icon: 'info-circle',
    sub: [
      {
        name: 'menu.exception.403',
        route: 'main.exception.403',
        icon: 'stop'
      },
      {
        name: 'menu.exception.404',
        route: 'main.exception.404',
        icon: 'exclamation-circle'
      },
      {
        name: 'menu.exception.500',
        route: 'main.exception.500',
        icon: 'close'
      },
      {
        name: 'menu.exception.loadError',
        icon: 'warning',
        route: 'main.exception.loadError'
      }
    ]
  },
  {
    name: 'menu.result',
    icon: 'global',
    sub: [
      {
        name: 'menu.result.success',
        icon: 'check-circle',
        route: 'main.demo.result.success'
      },
      {
        name: 'menu.result.fail',
        icon: 'close-circle',
        route: 'main.demo.result.failure'
      }
    ]
  }
]

export default menu
