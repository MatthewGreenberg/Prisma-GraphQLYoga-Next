const { forwardTo } = require('prisma-binding')
const Query = {
  songs: forwardTo('db'),
  song: forwardTo('db'),
  user: forwardTo('db'),
  users: forwardTo('db'),
}

module.exports = Query
