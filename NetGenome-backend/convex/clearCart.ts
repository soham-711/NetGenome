import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const clearCart = mutation({
  args: {
    userId: v.string(),
    artistIds: v.array(v.id("artists")),
  },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const toDelete = cartItems.filter(item =>
      args.artistIds.includes(item.artistId)
    );

    for (const item of toDelete) {
      await ctx.db.delete(item._id);
    }
  },
});
