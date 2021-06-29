import durex from '@gem-mine/durex'
import baseRequest from '@gem-mine/request'

const { demo: request } = baseRequest
const LIMIT = 10

durex.model({
  name: 'demoCard',

  state: {
    limit: LIMIT, // 每页数量
    offset: 0, // 偏移量
    total: 0, // 总数量
    list: [] // 列表数据
  },

  effects: {
    async getList(params = {}) {
      const { limit, list } = this.getState()
      const result = await request.get('/article', {
        params: {
          limit,
          ...params
        }
      })
      const { offset, total, data } = result
      this.setField({
        offset,
        total,
        list: list.concat(data)
      })
    }
  },
  reducers: {}
})
