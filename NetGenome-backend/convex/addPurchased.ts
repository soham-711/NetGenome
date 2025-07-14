import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addManyPurchased = mutation({
  args: {
    userId: v.string(),                        // ✔ Firebase UID
    artistIds: v.array(v.id("artists")), 
    transactionSignature: v.string(),     // ✔ Array of artist IDs
  },
  handler: async (ctx, args) => {
                   // ✔ Timestamp for tracking
    for (const artistId of args.artistIds) {
      await ctx.db.insert("purchasedArtists", {
        userId: args.userId,
        artistId,
       transactionSignature: args.transactionSignature
      });
    }
  },
});
