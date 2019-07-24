const Mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info
    )
    return item
  },
  async createSong(parent, args, ctx, info) {
    const song = await ctx.db.mutation.createSong(
      {
        data: {
          ...args,
        },
      },
      info
    )
    return song
  },
}

module.exports = Mutations
