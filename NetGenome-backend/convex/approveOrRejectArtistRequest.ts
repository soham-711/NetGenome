import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const handleArtistRequest = mutation({
  args: {
    requestId: v.id("artistRequests"),
    action: v.union(v.literal("approve"), v.literal("reject")),
  },
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.requestId);
    if (!request || request.status !== "pending") throw new Error("Invalid or already processed request");

    if (args.action === "approve") {
      await ctx.db.patch(request.userId, { role: "artist" });
      await ctx.db.patch(args.requestId, { status: "approved" });
    } else if (args.action === "reject") {
      await ctx.db.patch(args.requestId, { status: "rejected" });
    }
  },
});

export const getRequestByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("artistRequests")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});