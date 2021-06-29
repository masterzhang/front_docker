import { queryString } from '@gem-mine/durex-router'

/**
 * 获取 url query 参数
 * 在 hash 模式下，如果 query 在 hash 后面 location.query 拿不到值
 * 因此通过 location.href 来获取
 */
export function getUrlQuery() {
  const query = window.location.href.split('?')
  if (query.length > 1) {
    let params = {}
    query.slice(1).forEach((item) => {
      let parseString = item
      if (item.indexOf('#') > -1) {
        parseString = item.split(/\/?#/)[0]
      }
      params = { ...queryString.parse(parseString), ...params }
    })
    return params
  }
  return {}
}

export function urlToList(url) {
  const urllist = url.split('/').filter((i) => i)
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`)
}

/**
 * url 传参的值 bool 化，显示传 0 表示 false 其余 true
 */
export function checkStringBool(val) {
  return val !== '0'
}
