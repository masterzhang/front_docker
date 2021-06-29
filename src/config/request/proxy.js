/**
 * 请求的域配置，可以配置多个域的请求，以及每个域下的多个环境
 * 详细说明参见：https://www.yuque.com/gem-mine/util/request-api#OrBBf
 */

const config = {
  demo: {
    mock: {
      prefix: '/mock'
    },
    defaults: {
      prefix: 'bomb',
      url: 'http://fish-pro-service-develop.k8s.sdp.nd/'
    }
  }
}

export default config
