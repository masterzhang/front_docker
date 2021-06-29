import React from 'react'
import { shallow } from 'enzyme'
import intl from '@gem-mine/intl-react'
import BasicRouter from '@/page/home/Dashboard'

test('Error renderer', async (done) => {
  await intl.init({
    locale: 'zz',
    locales: {
      zz: {}
    }
  })
  const wrapper = shallow(
    <BasicRouter />
  )
  expect(wrapper.find('span')).toBeTruthy()
  done()
})
