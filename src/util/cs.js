import request from '@gem-mine/request'
import config from '@/config/request/proxy'

const serviceName = 'fish_pro_service'
const path = `/${serviceName}/test`
const uploadApi = 'http://cs.101.com/v0.1'
const uploadPath = `${uploadApi}/static`

function getToken() {
  const url = `${config.demo.defaults.url}/bomb/getToken`
  return request.get(url, {
    params: {
      path
    }
  })
}

function getData(file) {
  return {
    contentType: 'text/html;charset=UTF-8"',
    path,
    name: file.name,
    serviceName,
    scope: 1
  }
}

function getAction() {
  return new Promise((resolve) => getToken().then((tokenInfo) => {
    const uploadAction = `${uploadApi}/upload?token=${tokenInfo.token}&policy=${tokenInfo.policy}&date=${encodeURIComponent(tokenInfo.date_time)}`
    resolve(uploadAction)
  }))
}

export {
  uploadPath,
  getData,
  getAction
}
