import React, { Component } from 'react'
import intl from '@gem-mine/intl-react'
import { LANGUAGE } from './config'

const locales = {}
Object.keys(LANGUAGE).forEach((key) => {
  // 如果语言包很小，建议全部使用本地化
  // eslint-disable-next-line global-require
  locales[key] = require(`./${key}`).default
})

class I18N extends Component {
  state = {
    initDone: false
  }

  componentDidMount() {
    intl.init({ locales }).then(() => {
      if (this.props.bootstrap) {
        this.props.bootstrap()
      }
      this.setState({ initDone: true })
    })
  }

  render() {
    if (this.state.initDone) {
      return this.props.children
    } else {
      return <></>
    }
  }
}

export default I18N
