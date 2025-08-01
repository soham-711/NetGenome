// convex/uploadImage.ts
import { action } from "./_generated/server";

export const getUploadUrl = action({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
