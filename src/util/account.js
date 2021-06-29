export function authentication(code) {
  if (code === 'admin') {
    return true
  }
}
export async function getAccountInfo() {
  return {
    name: 'WEB端公共能力服务号'
  }
}
export async function isLogin() {
  return window.localStorage.getItem('fishPro_login')
}
export async function login(params) {
  window.localStorage.setItem('fishPro_login', '1')
  return params
}
export async function logout() {
  window.localStorage.setItem('fishPro_login', '0')
  return true
}
export function getLoginState() {
  return window.localStorage.getItem('fishPro_login')
}
export function getAvatarURL() {
  return ''
}
