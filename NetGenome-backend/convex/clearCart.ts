// convex/cart/clearCart.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const clearCart = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    await Promise.all(items.map((item) => ctx.db.delete(item._id)));
  },
});
