import React from 'react'
import { Link } from '@gem-mine/durex-router'
import intl from '@gem-mine/intl-react'
import Exception from './Exception'

const Exception403 = () => (
  <Exception
    type="403"
    desc={intl.get('app.exception.description.403')}
    linkElement={Link}
    backText={intl.get('app.exception.back')}
  />
)

export default Exception403
