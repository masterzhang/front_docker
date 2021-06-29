import durex from '@gem-mine/durex'
import baseRequest from '@gem-mine/request'
import { LIMIT, remove } from '@/util/crud'
import moment from 'moment'

const { demo: request } = baseRequest

durex.model({
  name: 'demoMultiple',

  state: {
    search: {}, // 查询参数
    limit: LIMIT, // 每页数量
    offset: 0, // 偏移量
    total: 0, // 总数量
    list: [] // 列表数据
  },

  effects: {
    async getList(params = {}) {
      let { search, offset } = params
      const state = this.getState()
      if (!search) {
        search = state.search
      }
      if (offset === undefined) {
        offset = Math.max(state.offset - LIMIT, 0)
      }

      // 服务端是以秒为单位的时间戳
      const searchRes = { ...search }
      if (search.start_time && search.end_time) {
        Object.assign(searchRes, {
          start_time: parseInt(moment(search.start_time.valueOf()).startOf('day').valueOf() / 1000, 10),
          end_time: parseInt(moment(search.end_time.valueOf()).endOf('day').valueOf() / 1000, 10)
        })
      }

      const result = await request.get('/article', {
        params: {
          limit: LIMIT,
          offset,
          ...searchRes,
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
    async create(params) {
      await request.post('/article', {
        data: {
          ...params
        }
      })
    },
    async remove(params = {}) {
      const result = await request.delete(`/article/${params.id}`)
      if (result) {
        remove(this.getState().list, params, (list) => {
          if (list.length) {
            this.setField({ list: [...list] })
          } else {
            this.actions.getList({ offset: 0 })
          }
        })
      }
    },
    async update(params) {
      await request.put(`/article/${params.id}`, {
        data: {
          ...params
        }
      })
    }
  },

  reducers: {}
})
