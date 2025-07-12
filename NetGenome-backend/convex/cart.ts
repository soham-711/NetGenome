// convex/cart.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add artist to cart
export const addToCart = mutation({
  args: {
    userId: v.string(),
    artistId: v.id("artists"),
  },
  handler: async (ctx, { userId, artistId }) => {
    const existingItems = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const alreadyExists = existingItems.some(
      (item) => item.artistId === artistId
    );

    if (!alreadyExists) {
      await ctx.db.insert("cartItems", {
        userId,
        artistId,
        addedAt: Date.now(),
      });
    }
  },
});

// Get all cart items for a user
export const getUserCart = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const cartItems = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return cartItems;
  },
});
