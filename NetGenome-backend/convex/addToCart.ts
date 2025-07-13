// convex/cart/addToCart.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addToCart = mutation({
  args: {
    artistId: v.id("artists"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Prevent duplicates
    const existing = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const alreadyInCart = existing.some(
      (item) => item.artistId === args.artistId
    );
    if (alreadyInCart) return;

    // Fetch artist data
    const artist = await ctx.db.get(args.artistId);
    if (!artist) throw new Error("Artist not found");

    // Insert to cart
    await ctx.db.insert("cartItems", {
      userId: args.userId,
      artistId: args.artistId,
      priceUSD: artist.priceUSD || 0, // fallback in case price is undefined
    });
  },
});
