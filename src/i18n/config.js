// 用于 gem-mine.config.js 优化 moment 大小
module.exports = {
  LANGUAGE: {
    'zh-CN': {
      label: '简体中文'
    },
    'zh-HK': {
      label: '繁体中文'
    },
    'en-US': {
      label: 'English'
    }
  },
  /**
   * @param {string} key
   */
  saveLanguage: () => {
    // 语言本地持久化，业务方可根据需求处理
    // document.cookie = `lang=${key}`
  }
}
