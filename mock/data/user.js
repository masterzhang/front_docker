const Mock = require('mockjs')
const { Random } = Mock
const { initArray } = require('../mock')

const DB = initArray(345)
  .map(item => {
    return {
      id: Random.id(),
      name: Random.cname(3),
      sex: Random.integer(0, 2),
      address: Random.county(true)
    }
  })
  .reverse()

module.exports = { DB }
