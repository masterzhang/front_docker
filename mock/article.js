const { Search, Classic, find } = require('./mock')
const { DB, TAGS, AUTHORS } = require('./data/article')

const crud = new Classic('article', DB)
const data = {
  'GET /article': async ctx => {
    const { offset, limit, title, public: pub, start_time: startTime, end_time: endTime, author, tag } = ctx.query
    const result = new Search(DB)
      .filter(title, item => item.title.includes(title))
      .filter(pub, item => item.public.toString() === pub)
      .filter(startTime, item => item.publish_time >= startTime)
      .filter(endTime, item => item.publish_time <= endTime)
      .filter(author, item => item.author.id === author)

    if (tag) {
      tag.split(',').forEach(t => {
        result.filter(t, item => item.tag.includes(t))
      })
    }
    return result.exclude('content').pagination({ offset, limit })
  },
  'GET /article/:id': crud.retrieve(),
  'POST /article': crud.create(data => {
    data.author = find(AUTHORS, data.author).data
    return data
  }),
  'PUT /article/:id': crud.update(),
  'DELETE /article/:id': crud.delete(),
  'GET /tag/article': async ctx => {
    return TAGS
  },
  'GET /author/article': async ctx => {
    const { name } = ctx.query
    const result = new Search(AUTHORS).filter(name, item => item.name.includes(name)).run()
    return result
  }
}

module.exports = data
