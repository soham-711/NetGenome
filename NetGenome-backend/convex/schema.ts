// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // artists: defineTable({
  //   artistID: v.string(),
  //   displayName: v.string(),
  //   priceUSD: v.number(),
  //   imageUrl: v.optional(v.string()),
  //   vibeTags: v.optional(v.array(v.string())),
  //   identity: v.object({
  //     realName: v.string(),
  //     aliases: v.array(v.string()),
  //     origin: v.string(),
  //     location: v.string(),
  //     languages: v.array(v.string()),
  //     gender: v.optional(v.string()),
  //   }),
  //   artistic_background: v.object({
  //     roles: v.array(v.string()),
  //     genres: v.array(v.string()),
  //     influences: v.array(v.string()),
  //     skills: v.array(v.string()),
  //   }),
  //   career: v.object({
  //     education: v.string(),
  //     collaborations: v.array(v.string()),
  //     performances: v.array(v.string()),
  //     awards: v.array(v.string()),
  //   }),
  //   discography: v.array(
  //     v.object({
  //       title: v.string(),
  //       type: v.string(),
  //       year: v.number(),
  //       label: v.string(),
  //       details: v.string(),
  //     })
  //   ),
  //   creative_process: v.object({
  //     songwriting_process: v.string(),
  //     production_process: v.string(),
  //   }),
  //   availability: v.object({
  //     current_projects: v.array(v.string()),
  //     looking_for: v.array(v.string()),
  //   }),
  //   online_presence: v.object({
  //     website: v.string(),
  //     social_media: v.array(
  //       v.object({
  //         platform: v.string(),
  //         url: v.string(),
  //       })
  //     ),
  //     streaming_platforms: v.array(
  //       v.object({
  //         platform: v.string(),
  //         url: v.string(),
  //       })
  //     ),
  //   }),
  //   quotes: v.array(v.string()),
  // }).index("by_artistID", ["artistID"]),
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
      birthYear: v.optional(v.number()), // 🆕 extracted from profile
    }),
    artistic_background: v.object({
      roles: v.array(v.string()),
      genres: v.array(v.string()),
      influences: v.array(v.string()),
      skills: v.array(v.string()),
      signature_style: v.optional(v.string()), // 🆕
    }),
    career: v.object({
      education: v.string(),
      collaborations: v.array(v.string()),
      performances: v.array(v.string()),
      awards: v.array(v.string()),
      career_evolution: v.optional(v.string()), // 🆕
      years_active: v.optional(v.string()), // 🆕
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
      creative_rituals: v.optional(v.string()), // 🆕
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
          followers: v.optional(v.string()), // 🆕
        })
      ),
      streaming_platforms: v.array(
        v.object({
          platform: v.string(),
          url: v.string(),
          stats: v.optional(v.string()), // 🆕
        })
      ),
    }),
    commerce: v.optional(v.string()), // 🆕 merch/store info
    social_impact: v.optional(v.string()), // 🆕 advocacy work
    quotes: v.array(v.string()),
    fan_press_quotes: v.optional(v.array(v.string())), // 🆕 separate fan/press quotes
    classification: v.optional(v.string()), // Lazie Indie classification
    lazie_indie_association: v.optional(v.string()), // 🆕 Lazie Indie Association details
    long_narrative: v.optional(v.string()), // 🆕 long bio
  }).index("by_artistID", ["artistID"]),

  cartItems: defineTable({
    userId: v.string(), // Clerk or Firebase user ID
    artistId: v.id("artists"), // Convex ID of the artist
    priceUSD: v.number(),
  }).index("by_user", ["userId"]),
  purchasedArtists: defineTable({
    userId: v.string(),
    artistId: v.id("artists"),
    transactionSignature: v.string(),
  }).index("by_user", ["userId"]),
  users: defineTable({
    email: v.string(),
    role: v.union(v.literal("user"), v.literal("artist")),
    createdAt: v.number(),
  }),
  artistRequests: defineTable({
    userId: v.id("users"),
    email: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
