// convex/cart/removeFromCart.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const removeFromCart = mutation({
  args: {
    userId: v.string(),
    artistId: v.id("artists"),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const match = items.find((item) => item.artistId === args.artistId);
    if (match) {
      await ctx.db.delete(match._id);
    }
  },
});
