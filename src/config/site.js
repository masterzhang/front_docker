import { changeColor } from '@gem-mine/ui-theme-color/lib/browser'
import { getUrlQuery, checkStringBool } from '../util/url'

const setting = {
  // ————————————————————————————————————
  // 以下是系统主题、菜单、面包屑等功能配置
  // 可以接受 url 参数进行覆盖
  // ————————————————————————————————————
  // 站点主题明暗色调: 默认 暗色调（可以通过 url 传递 dark=0/1 亮模式/暗模式）
  dark: localStorage.getItem('themeDark') !== '0',
  // 站点主题主色调：默认 #1890ff（可以通过 url 传递 color=#1890ff 进行主色调修改）
  color: localStorage.getItem('themeColor') || '#1890ff',
  // 是否显示左侧栏（包含 logo、标题、菜单），默认显示（可以通过 url 传递 sider=0/1 关闭/打开）
  sider: true,
  // sider 是否默认显示为折叠状态，true 为折叠，默认不折叠（可以通过 url 传递 collapsed=0/1 不折叠/折叠）
  collapsed: false,
  // 是否显示顶部栏，默认显示（可以通过 url 传递 header=0/1 关闭/打开）
  header: true,
  // 是否显示底部栏，默认显示（可以通过 url 传递 footer=0/1 关闭/打开）
  footer: true,
  // 是否出现面包屑，默认显示（可以通过 url 传递 breadcrumb=0/1 全局关闭/打开，或某个路由使用 breadcrumb: false 关闭）
  breadcrumb: true,

  // ————————————————————————————————————
  // 以下是系统页面上的配置
  // ————————————————————————————————————
  // 显示于左侧菜单顶部
  title: 'Fish Pro',
  // 显示于底部 footer
  copyright: 'Copyright©2020 WEB 端公共能力'
}

// ----
// 可通过 URL 配置的参数及其对应参数处理函数
const CHECK = {
  dark: checkStringBool,
  breadcrumb: checkStringBool,
  sider: checkStringBool,
  collapsed: checkStringBool,
  header: checkStringBool,
  footer: checkStringBool,
  color: (val) => val,
  theme: (val) => val
}

const query = getUrlQuery()
if (query) {
  Object.keys(CHECK).forEach((key) => {
    const val = query[key]
    if (val) {
      setting[key] = CHECK[key](val)
    }
  })
}

if (query.dark) {
  localStorage.setItem('themeDark', query.dark === '0' ? 0 : 1)
}
if (query.color) {
  localStorage.setItem('themeColor', query.color)
}
if (setting.color) {
  changeColor(setting.color)
}

export { query }
export default setting
