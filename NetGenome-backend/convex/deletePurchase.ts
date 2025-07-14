import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const deletePurchase = mutation({
  args: {
    userId: v.string(),
    artistId: v.string(),
  },
  handler: async (ctx, { userId, artistId }) => {
    const record = await ctx.db
      .query("purchasedArtists")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("artistId"), artistId)
        )
      )
      .first();

    if (record) {
      await ctx.db.delete(record._id);
    }
  },
});
