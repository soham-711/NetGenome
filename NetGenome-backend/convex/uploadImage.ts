import { action } from "./_generated/server";
import { v } from "convex/values";

// Step 1: Generate upload URL to send image file to Convex
export const getUploadUrl = action({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Step 2: Get a valid public URL for a given Convex storageId
export const getImageUrl = action({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    const url = await ctx.storage.getUrl(storageId);
    return url;
  },
});
