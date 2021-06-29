import React from 'react'
import { router, Redirect } from '@gem-mine/durex-router'
import { getLoginState } from '@/util/account'
import { asyncLoader } from '../util/loader'
import BasicLayout from '../component/layout'
import LoginLayout from '../component/layout/Login'

import NotFound from '../component/status/404'
import Forbidden from '../component/status/403'
import Loading from '../component/status/Loading'
import exceptionRoute from './exception'
import demoRoute from './demo'

router.config({
  components: {
    NotFound,
    Forbidden,
    Loading
  }
})

const routes = {
  user: {
    path: '/user',
    component: LoginLayout,
    sub: {
      login: {
        index: true,
        path: '/login',
        component: asyncLoader('page/Login')
      }
    }
  },

  main: {
    path: '/',
    component: BasicLayout,
    permission: () => {
      const isLogin = getLoginState()
      if (isLogin) {
        return true
      } else {
        return <Redirect to={{ pathname: '/user' }} />
      }
    },
    sub: {
      home: {
        index: true,
        component: asyncLoader('page/home/Dashboard')
      },
      demo: demoRoute,
      exception: exceptionRoute
    }
  }
}

router.register(routes)

export default routes
