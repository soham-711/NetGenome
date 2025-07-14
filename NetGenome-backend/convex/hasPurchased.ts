import { query } from "./_generated/server";
import { v } from "convex/values";

export const hasPurchased = query({
  args: {
    userId: v.string(),
    artistId: v.string(),
  },
  handler: async (ctx, { userId, artistId }) => {
    const match = await ctx.db
      .query("purchasedArtists")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("artistId"), artistId)
        )
      )
      .first();
    return !!match;
  },
});
