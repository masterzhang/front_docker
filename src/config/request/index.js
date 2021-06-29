import request from '@gem-mine/request'
import { message, notification } from 'fish'
import intl from '@gem-mine/intl-react'
import proxyConfig from './proxy'

// 获取环境中对应的网络配置
request.init(proxyConfig, {
  env: process.env.USE_MOCK ? 'mock' : process.env.SDP_ENV
})

// 全局设置，对所有请求生效
request.config({
  loading() {
    this.handleMessageClose = message.loading(intl.get('app.loading', 'Loading...'), 30)
  },
  error(error) {
    notification.error({
      message: `${intl.get('app.request.error', 'Request Error')} ${error.status || ''}`,
      description: error.message || intl.get('app.request.service.error', 'Service Error')
    })
    throw error
  },
  complete() {
    if (this.handleMessageClose) {
      this.handleMessageClose()
    }
  }
})

export default request
