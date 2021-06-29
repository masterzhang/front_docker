const { Search, classic } = require('./mock')
const { DB } = require('./data/user')

const data = {
  'GET /user': async ctx => {
    const { offset, limit, name, sex } = ctx.query
    const result = new Search(DB)
      .filter(name, item => item.name.includes(name))
      .filter(sex, item => item.sex === parseInt(sex, 10))
      .pagination({ offset, limit })
    return result
  },
  ...classic('user', DB)
}

module.exports = data
