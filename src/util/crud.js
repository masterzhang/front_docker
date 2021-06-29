import { upperCaseFirstLetter } from './fn'

/**
 * 从数组中查找满足 statement 条件的首个元素
 * @param {array} arr
 * @param {object} statement
 */
export function find(arr, statement) {
  if (statement) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      let flag = true
      Object.keys(statement).forEach((key) => {
        // eslint-disable-next-line
        if (statement[key] != item[key]) {
          flag = false
        }
      })
      if (flag) {
        return {
          match: true,
          index: i,
          data: item
        }
      }
    }
  }
  return {
    match: false
  }
}

/**
 * 将数组中满足 statement 的首个元素更新为 data
 * 如果 statement 没有传递，默认为 { id: data.id }
 * @param {array} arr
 * @param {object} data
 * @param {object} statement
 */
export function update(arr, data, statement) {
  let currentStatement = statement
  if (!currentStatement) {
    currentStatement = {
      id: data.id
    }
  }
  const { match, index } = find(arr, currentStatement)
  if (match) {
    arr[index] = data
  }
  return arr
}

/**
 * 将数组中满足 statement 的首个元素删除
 * 如果传递了 callback，则会触发 callback
 * @param {array} arr
 * @param {object} statement
 * @param {function} callback
 */
export function remove(arr, statement, callback) {
  const { match, index } = find(arr, statement)
  if (match) {
    arr.splice(index, 1)
  }
  if (callback) {
    callback(arr)
  }
  return arr
}

/**
 * 将 data 插入到数组的首部，如果超出 limit 限制，则还会移除最后一个元素
 * 如果 limit=false 则不移除
 * @param {array} arr
 * @param {object} data
 * @param {number} limit
 */
export function create(arr, data, limit) {
  arr.unshift(data)
  if (limit !== false) {
    if (arr.length > limit) {
      arr.pop()
    }
  }
  return arr
}

/**
 * model 提供的便利工具，快速创建弹窗显示、隐藏函数
 * 请在 组件 的 constructor 中使用
 * @param {object} scope 组件的 this
 * @param  {array} arr 数组，元素是 model 的标识字符串
 */
export function modal(scope, ...arr) {
  if (!scope.state) {
    scope.state = {}
  }
  arr.forEach((name) => {
    const un = upperCaseFirstLetter(name)
    const key = `${name}ModalVisible`
    // 初始化弹窗值为 false
    scope.state[key] = false
    scope[`show${un}Modal`] = function showModal() {
      scope.setState({
        [key]: true
      })
    }
    scope[`hide${un}Modal`] = function hideModal() {
      scope.setState({
        [key]: false
      })
    }
  })
}
export const LIMIT = 10

export default {
  find,
  create,
  remove,
  update,
  modal,
  LIMIT
}
