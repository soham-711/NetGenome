import { query } from "./_generated/server";
import { v } from "convex/values";

export const getPurchasedProfiles = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    // Step 1: Fetch all purchased rows for this user
    const purchased = await ctx.db
      .query("purchasedArtists")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const artistIds = purchased.map((p) => p.artistId);

    // Step 2: If no artistIds, return empty array early
    if (artistIds.length === 0) return [];

    // Step 3: Fetch all artists and filter manually
    const allArtists = await ctx.db.query("artists").collect();

    const matchingArtists = allArtists.filter((artist) =>
      artistIds.includes(artist._id)
    );

    return matchingArtists;
  },
});



export const getPurchasedProfilesAll = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    const purchased = await ctx.db
      .query("purchasedArtists")  // your table name
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return purchased;
  },
});

