import React from 'react'
import { smart } from '@gem-mine/durex'
import { Routes, Router } from '@gem-mine/durex-router'
import I18N from './i18n'
import bootstrap from './config/bootstrap'
import Auth from './component/Auth'
import './asset/style/index.less'

const App = () => (
  <I18N bootstrap={bootstrap}>
    <Auth>
      <Router>
        <Routes />
      </Router>
    </Auth>
  </I18N>
)

export default smart()(App)
