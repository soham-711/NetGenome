import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitArtistRequest = mutation({
  args: { userId: v.id("users"), email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("artistRequests")
      .withIndex("by_userId", q => q.eq("userId", args.userId))
      .first();

    if (existing) throw new Error("Request already submitted");

    await ctx.db.insert("artistRequests", {
      userId: args.userId,
      email: args.email,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});


export const getAllArtistRequests = query({
  handler: async (ctx) => {
    const requests = await ctx.db.query("artistRequests").collect();
    return requests;
  },
});