import React from 'react'
import { Link } from '@gem-mine/durex-router'
import intl from '@gem-mine/intl-react'
import Exception from './Exception'

const Exception404 = () => (
  <Exception
    type="404"
    desc={intl.get('app.exception.description.404')}
    linkElement={Link}
    backText={intl.get('app.exception.back')}
  />
)

export default Exception404
