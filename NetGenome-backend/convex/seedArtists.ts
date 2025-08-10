// import { v } from "convex/values";
// import { mutation } from "./_generated/server";

// export const seedArtists = mutation({
//     args: {
//     artists: v.array(v.any()) // Using v.any() since we trust the structure
//   },
// handler: async(ctx, args) => {
//     for (const artist of args.artists) {
//       await ctx.db.insert("artists", artist);
//     }
// },
// })


// import { mutation } from "./_generated/server";
// import { v } from "convex/values";

// export const seedArtists = mutation({
//   args: {
//     artists: v.array(
//       v.object({
//         artistID: v.string(),
//         displayName: v.string(),
//         priceUSD: v.number(),
//         imageUrl: v.optional(v.string()),
//         vibeTags: v.optional(v.array(v.string())),
//         identity: v.object({
//           realName: v.string(),
//           aliases: v.array(v.string()),
//           origin: v.string(),
//           location: v.string(),
//           languages: v.array(v.string()),
//           gender: v.optional(v.string()),
//         }),
//         artistic_background: v.object({
//           roles: v.array(v.string()),
//           genres: v.array(v.string()),
//           influences: v.array(v.string()),
//           skills: v.array(v.string()),
//         }),
//         career: v.object({
//           education: v.string(),
//           collaborations: v.array(v.string()),
//           performances: v.array(v.string()),
//           awards: v.array(v.string()),
//         }),
//         discography: v.array(
//           v.object({
//             title: v.string(),
//             type: v.string(),
//             year: v.number(),
//             label: v.string(),
//             details: v.string(),
//           })
//         ),
//         creative_process: v.object({
//           songwriting_process: v.string(),
//           production_process: v.string(),
//         }),
//         availability: v.object({
//           current_projects: v.array(v.string()),
//           looking_for: v.array(v.string()),
//         }),
//         online_presence: v.object({
//           website: v.string(),
//           social_media: v.array(
//             v.object({
//               platform: v.string(),
//               url: v.string(),
//             })
//           ),
//           streaming_platforms: v.array(
//             v.object({
//               platform: v.string(),
//               url: v.string(),
//             })
//           ),
//         }),
//         quotes: v.array(v.string()),
//       })
//     ),
//   },
//   handler: async (ctx, args) => {
//     for (const artist of args.artists) {
//       const existing = await ctx.db
//         .query("artists")
//         .withIndex("by_artistID", (q) => q.eq("artistID", artist.artistID))
//         .unique();

//       if (!existing) {
//         await ctx.db.insert("artists", artist);
//       }
//     }
//   },
// });


import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedArtists = mutation({
  args: {
    artists: v.array(
      v.object({
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
          birthYear: v.optional(v.number()) // 🆕
        }),
        artistic_background: v.object({
          roles: v.array(v.string()),
          genres: v.array(v.string()),
          influences: v.array(v.string()),
          skills: v.array(v.string()),
          signature_style: v.optional(v.string()) // 🆕
        }),
        career: v.object({
          education: v.string(),
          collaborations: v.array(v.string()),
          performances: v.array(v.string()),
          awards: v.array(v.string()),
          career_evolution: v.optional(v.string()), // 🆕
          years_active: v.optional(v.string()) // 🆕
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
          creative_rituals: v.optional(v.string()) // 🆕
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
              followers: v.optional(v.string()) // 🆕
            })
          ),
          streaming_platforms: v.array(
            v.object({
              platform: v.string(),
              url: v.string(),
              stats: v.optional(v.string()) // 🆕
            })
          ),
        }),
        commerce: v.optional(v.string()), // 🆕
        social_impact: v.optional(v.string()), // 🆕
        quotes: v.array(v.string()),
        fan_press_quotes: v.optional(v.array(v.string())), // 🆕
        classification: v.optional(v.string()), // 🆕 Lazie Indie classification
        lazie_indie_association: v.optional(v.string()), // 🆕
        long_narrative: v.optional(v.string()), // 🆕
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const artist of args.artists) {
      const existing = await ctx.db
        .query("artists")
        .withIndex("by_artistID", (q) => q.eq("artistID", artist.artistID))
        .unique();

      if (!existing) {
        await ctx.db.insert("artists", artist);
      }
    }
  },
});
