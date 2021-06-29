const { Search } = require('./mock')
const { DB, TAGS, AUTHORS } = require('./data/article')

const data = {
  'GET /stat/tag': () => {
    const result = {}
    TAGS.map(tag => {
      const length = new Search(DB)
        .filter(item => {
          return item.tag.includes(tag)
        })
        .run().length
      result[tag] = length
    })
    return result
  },
  'GET /stat/author': () => {
    const result = {}
    AUTHORS.map(author => {
      const length = new Search(DB)
        .filter(item => {
          return item.author.name === author.name
        })
        .run().length
      result[author.name] = length
    })
    return result
  }
}
module.exports = data