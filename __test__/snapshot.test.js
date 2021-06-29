import React from 'react'
import TestRenderer from 'react-test-renderer'
import intl from '@gem-mine/intl-react'
import { ReactRouterDom } from '@gem-mine/durex-router'
import BasicRouter from '@/page/home/Dashboard'

test('Error renderer', async (done) => {
  await intl.init({
    locale: 'zz',
    locales: {
      zz: {}
    }
  })
  const renderer = TestRenderer.create(
    <ReactRouterDom.BrowserRouter>
      <BasicRouter />
    </ReactRouterDom.BrowserRouter>
  )
  expect(renderer.toJSON()).toMatchSnapshot()
  done()
})
