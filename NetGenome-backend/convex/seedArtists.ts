import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const seedArtists = mutation({
    args: {
    artists: v.array(v.any()) // Using v.any() since we trust the structure
  },
handler: async(ctx, args) => {
    for (const artist of args.artists) {
      await ctx.db.insert("artists", artist);
    }
},
})