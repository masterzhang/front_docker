import durex from '@gem-mine/durex'
import baseRequest from '@gem-mine/request'
import {
  LIMIT, update, create, remove
} from '@/util/crud'

const { demo: request } = baseRequest

durex.model({
  name: 'demoModal',
  state: {
    limit: LIMIT, // 每页数量
    offset: 0, // 偏移量
    total: 0, // 总数量
    search: {}, // 查询参数
    list: [] // 列表数据
  },
  effects: {
    // 获取列表
    async getList(params = {}) {
      let { search, offset } = params
      const state = this.getState()
      if (!search) {
        search = state.search
      }
      if (offset === undefined) {
        offset = Math.max(state.offset - LIMIT, 0)
      }
      const result = await request.get('/user', {
        params: {
          limit: LIMIT,
          offset,
          ...search,
          ...params
        }
      })
      const { total, data } = result
      this.setField({
        search,
        offset: result.offset,
        total,
        list: data
      })
    },
    // 更新一条记录
    async update(params) {
      const { id, sex, address } = params
      const result = await request.put(`/user/${id}`, {
        data: { sex, address }
      })
      this.setField({
        list: (list) => update(list, result)
      })
    },
    // 新增一条记录
    async create(params) {
      const { name, sex, address } = params
      const result = await request.post('/user', {
        data: { name, sex, address }
      })
      this.setField({
        list: (list) => create(list, result, LIMIT)
      })
    },
    // 删除一条记录，当页删除完毕会自动加载
    async remove(params) {
      const result = await request.delete(`/user/${params.id}`)
      if (result) {
        remove(this.getState().list, params, (list) => {
          if (list.length) {
            this.setField({ list: [...list] })
          } else {
            this.actions.getList({ offset: 0 })
          }
        })
      }
    }
  },
  reducers: {}
})
