/**
 * 本文件存放一些工具函数，但又无法明确归属在具体文件
 */

/**
 * 一维数组去重
 */
export function uniqueArray(array) {
  return array.filter((item, index, arr) => arr.indexOf(item) === index)
}
/**
 * 字符串首字母大写
 * @param {string} str
 */
export function upperCaseFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1)
}

export function isFunction(val) {
  return typeof val === 'function'
}
