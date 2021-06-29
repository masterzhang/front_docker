const Mock = require('mockjs')
const { Random } = Mock
const { initArray, shuffle } = require('../mock')

const TAGS = ['商务', '编程', '美女', '文学', '哲学', '音乐', '数学', '历史']
const AUTHORS = initArray(20).map(item => {
  return {
    id: Random.id(),
    name: Random.cname(3)
  }
})

function randomColor() {
  return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
}

const DB = new Array(1000)
  .fill(0)
  .map((item, index) => {
    return {
      id: Random.id(),
      title: Random.ctitle(6, 15),
      cover: Random.image('260x130', randomColor(), index),
      description: Random.csentence(8, 20),
      content: initArray(Random.integer(3, 6))
        .map(() => {
          return Random.cparagraph(Random.integer(2, 5))
        })
        .join('<br />'),
      author: AUTHORS[Random.integer(0, AUTHORS.length - 1)],
      public: Random.boolean(),
      publish_time: parseInt(Date.now() / 1000, 10) - Random.integer(100, 3600 * 24 * 365),
      visit: Random.integer(100, 10000),
      tag: shuffle(TAGS).slice(0, Random.integer(1, 3))
    }
  })
  .reverse()

module.exports = {
  DB,
  AUTHORS,
  TAGS
}
