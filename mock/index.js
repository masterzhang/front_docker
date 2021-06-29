const User = require('./user')
const Article = require('./article')
const Stat = require('./stat')

module.exports = {
  prefix: 'mock',
  data: Object.assign({}, User, Article, Stat)
}
