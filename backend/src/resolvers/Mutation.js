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
  async deleteSong(parent, args, ctx, info) {
    const where = { id: args.id }
    return ctx.db.mutation.deleteSong({ where }, info)
  },
  updateUser(parent, args, ctx, info) {
    const updates = { ...args }
    delete updates.id
    delete updates.songsConnection
    return ctx.db.mutation.updateUser(
      {
        data: {
          ...updates,
          songsConnection: { connect: { id: args.songsConnection.id } },
        },
        where: { id: args.id },
      },
      info
    )
  },
}

module.exports = Mutations
