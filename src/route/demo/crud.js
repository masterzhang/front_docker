import { asyncLoader } from '../../util/loader'

export default {
  path: '/crud',
  name: 'menu.crud',
  module: {
    modal: {
      path: '/modal',
      name: 'menu.crud.modal',
      index: true,
      component: asyncLoader('page/demo/crud/modal/List')
    },
    inline: {
      path: '/inline',
      name: 'menu.crud.inline',
      component: asyncLoader('page/demo/crud/inline/List')
    },
    card: {
      path: '/card',
      name: 'menu.crud.card',
      component: asyncLoader('page/demo/crud/card/List')
    },
    multiple: {
      path: '/multiple',
      name: 'menu.crud.multiple',
      module: {
        list: {
          path: '/',
          exact: true,
          component: asyncLoader('page/demo/crud/multiple/List')
        },
        create: {
          path: '/create',
          name: 'crud.mutiple.create',
          back: true,
          component: asyncLoader('page/demo/crud/multiple/Article')
        },
        update: {
          path: '/update/:id',
          name: 'crud.mutiple.update',
          back: true,
          component: asyncLoader('page/demo/crud/multiple/Article')
        }
      }
    }
  }
}
