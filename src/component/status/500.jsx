import React from 'react'
import { Link } from '@gem-mine/durex-router'
import intl from '@gem-mine/intl-react'
import Exception from './Exception'

const Exception500 = () => (
  <Exception
    type="500"
    desc={intl.get('app.exception.description.500')}
    linkElement={Link}
    backText={intl.get('app.exception.back')}
  />
)

export default Exception500
