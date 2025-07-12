// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  artists: defineTable({
    artistID: v.string(),
    displayName: v.string(),
    priceUSD: v.number(),
    imageUrl: v.optional(v.string()),
    vibeTags: v.optional(v.array(v.string())),
    identity: v.object({
      realName: v.string(),
      aliases: v.array(v.string()),
      origin: v.string(),
      location: v.string(),
      languages: v.array(v.string()),
      gender: v.optional(v.string()),
    }),
    artistic_background: v.object({
      roles: v.array(v.string()),
      genres: v.array(v.string()),
      influences: v.array(v.string()),
      skills: v.array(v.string()),
    }),
    career: v.object({
      education: v.string(),
      collaborations: v.array(v.string()),
      performances: v.array(v.string()),
      awards: v.array(v.string()),
    }),
    discography: v.array(
      v.object({
        title: v.string(),
        type: v.string(),
        year: v.number(),
        label: v.string(),
        details: v.string(),
      })
    ),
    creative_process: v.object({
      songwriting_process: v.string(),
      production_process: v.string(),
    }),
    availability: v.object({
      current_projects: v.array(v.string()),
      looking_for: v.array(v.string()),
    }),
    online_presence: v.object({
      website: v.string(),
      social_media: v.array(
        v.object({
          platform: v.string(),
          url: v.string(),
        })
      ),
      streaming_platforms: v.array(
        v.object({
          platform: v.string(),
          url: v.string(),
        })
      ),
    }),
    quotes: v.array(v.string()),
  }),
  cartItems: defineTable({
    userId: v.string(), // Clerk or Firebase user ID
    artistId: v.id("artists"), // Convex ID of the artist
    addedAt: v.number(), // Timestamp
  }).index("by_user", ["userId"]),
});
