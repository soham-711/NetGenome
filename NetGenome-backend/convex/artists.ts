// convex/artists.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getById = query({
  args: { id: v.id("artists") },
  handler: async (ctx, { id }) => {
    const artist = await ctx.db.get(id);
    return artist;
  },
});
