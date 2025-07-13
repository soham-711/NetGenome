// convex/cart/getCartItems.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getCartItems = query({
  args: {
    userId: v.string(), // Accept userId as argument
  },
  handler: async (ctx, args) => {
    const { userId } = args;

    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Fetch artist details
    const artistIds = items.map((item) => item.artistId);
    const artists = await Promise.all(artistIds.map((id) => ctx.db.get(id)));

    return artists.filter(Boolean);
  },
});
