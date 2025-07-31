import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUserProfile = mutation({
  args: {
    email: v.string(),
    role: v.union(v.literal("user"), v.literal("artist")), // Only "user" or "artist" allowed
  },
  handler: async (ctx, args) => {
    // avoid duplicate
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    if (existing) return;

    await ctx.db.insert("users", {
      email: args.email,
      role: args.role,
      createdAt: Date.now(),
    });
  },
});

export const getUserProfileByEmail = query({
  args: { email: v.string() },

  async handler(ctx, { email }) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    return user ?? null; // ✅ safer than throwing
  },
});
