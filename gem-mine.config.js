const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const { ThemeColorPlugin } = require('@gem-mine/ui-theme-color/lib/webpack')
const { LANGUAGE } = require('./src/i18n/config')

const localesToKeep = Object.keys(LANGUAGE)
  .map((key) => key.toLowerCase())
  .filter((key) => key !== 'en-us') // moment 默认引入en 就是 en-us

module.exports = {
  hardSource: false,
  chainWebpack: (config) => {
    // use webpack-chain
    config.plugin('define')
      .tap((pluginOption) => {
        let sdpEnv
        if (process.env.BUILD_ON_SDP) {
          sdpEnv = 'window.__global_env'
        } else {
          sdpEnv = JSON.stringify(process.env.SDP_ENV)
        }
        pluginOption[0]['process.env'].SDP_ENV = sdpEnv
        return pluginOption
      })
  },
  configureWebpack: {
    // normal webpack config
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep
      }),
      new ThemeColorPlugin()
    ]
  }
}
