// convex/artists.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getById = query({
  args: { id: v.id("artists") },
  handler: async (ctx, { id }) => {
    const artist = await ctx.db.get(id);
    return artist;
  },
});

// convex/getArtistByArtistID.ts

export const getArtistByArtistID = query({
  args: { artistID: v.string() },
  handler: async (ctx, { artistID }) => {
    const artist = await ctx.db
      .query("artists")
      .withIndex("by_artistID", (q) => q.eq("artistID", artistID))
      .first();

    return artist; // Can return null if not found
  },
});

export const getAllArtists = query({
  args: {}, // no arguments needed
  handler: async (ctx) => {
    const artists = await ctx.db.query("artists").collect();
    return artists;
  },
});

// convex/artists.ts


// export const updateArtistByArtistID = mutation({
//   args: {
//     artistID: v.string(),
//     updates: v.object({
//       displayName: v.optional(v.string()),
//       priceUSD: v.optional(v.number()),
//       imageUrl: v.optional(v.string()),
//       vibeTags: v.optional(v.array(v.string())),
//       identity: v.optional(
//         v.object({
//           realName: v.string(),
//           aliases: v.array(v.string()),
//           origin: v.string(),
//           location: v.string(),
//           languages: v.array(v.string()),
//           gender: v.optional(v.string()),
//         })
//       ),
//       artistic_background: v.optional(
//         v.object({
//           roles: v.array(v.string()),
//           genres: v.array(v.string()),
//           influences: v.array(v.string()),
//           skills: v.array(v.string()),
//         })
//       ),
//       career: v.optional(
//         v.object({
//           education: v.string(),
//           collaborations: v.array(v.string()),
//           performances: v.array(v.string()),
//           awards: v.array(v.string()),
//         })
//       ),
//       discography: v.optional(
//         v.array(
//           v.object({
//             title: v.string(),
//             type: v.string(),
//             year: v.number(),
//             label: v.string(),
//             details: v.string(),
//           })
//         )
//       ),
//       creative_process: v.optional(
//         v.object({
//           songwriting_process: v.string(),
//           production_process: v.string(),
//         })
//       ),
//       availability: v.optional(
//         v.object({
//           current_projects: v.array(v.string()),
//           looking_for: v.array(v.string()),
//         })
//       ),
//       online_presence: v.optional(
//         v.object({
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
//         })
//       ),
//       quotes: v.optional(v.array(v.string())),
//     }),
//   },
//   handler: async (ctx, { artistID, updates }) => {
//     console.log("🔍 Looking for artist with ID:", artistID);

//     const artist = await ctx.db
//       .query("artists")
//       .withIndex("by_artistID", (q) => q.eq("artistID", artistID))
//       .first();

//     if (!artist) {
//       console.error("❌ Artist not found in Convex DB:", artistID);
//       throw new Error("Artist not found. Double-check artistID and index.");
//     }

//     await ctx.db.patch(artist._id, updates);
//     console.log("✅ Artist updated:", artistID);
//   },
// });


export const updateArtistByArtistID = mutation({
  args: {
    artistID: v.string(),
    updates: v.object({
      displayName: v.optional(v.string()),
      priceUSD: v.optional(v.number()),
      imageUrl: v.optional(v.string()),
      vibeTags: v.optional(v.array(v.string())),
      identity: v.optional(
        v.object({
          realName: v.string(),
          aliases: v.array(v.string()),
          origin: v.string(),
          location: v.string(),
          languages: v.array(v.string()),
          gender: v.optional(v.string()),
          birthYear: v.optional(v.number()), // Added birthYear
        })
      ),
      artistic_background: v.optional(
        v.object({
          roles: v.array(v.string()),
          genres: v.array(v.string()),
          influences: v.array(v.string()),
          skills: v.array(v.string()),
          signature_style: v.optional(v.string()), // Added signature_style
        })
      ),
      career: v.optional(
        v.object({
          education: v.string(),
          collaborations: v.array(v.string()),
          performances: v.array(v.string()),
          awards: v.array(v.string()),
          career_evolution: v.optional(v.string()), // Added career_evolution
          years_active: v.optional(v.string()), // Added years_active
        })
      ),
      discography: v.optional(
        v.array(
          v.object({
            title: v.string(),
            type: v.string(),
            year: v.number(),
            label: v.string(),
            details: v.string(),
          })
        )
      ),
      creative_process: v.optional(
        v.object({
          songwriting_process: v.string(),
          production_process: v.string(),
          creative_rituals: v.optional(v.string()), // Added creative_rituals
        })
      ),
      availability: v.optional(
        v.object({
          current_projects: v.array(v.string()),
          looking_for: v.array(v.string()),
        })
      ),
      online_presence: v.optional(
        v.object({
          website: v.string(),
          social_media: v.array(
            v.object({
              platform: v.string(),
              url: v.string(),
              followers: v.optional(v.string()), // Added followers
            })
          ),
          streaming_platforms: v.array(
            v.object({
              platform: v.string(),
              url: v.string(),
              stats: v.optional(v.string()), // Added stats
            })
          ),
        })
      ),
      commerce: v.optional(v.string()), // Added commerce
      social_impact: v.optional(v.string()), // Added social_impact
      quotes: v.optional(v.array(v.string())),
      fan_press_quotes: v.optional(v.array(v.string())), // Added fan_press_quotes
      classification: v.optional(v.string()), // Added classification
      lazie_indie_association: v.optional(v.string()), // Added lazie_indie_association
      long_narrative: v.optional(v.string()), // Added long_narrative
    }),
  },
  handler: async (ctx, { artistID, updates }) => {
    console.log("🔍 Looking for artist with ID:", artistID);

    // First validate required fields in updates
    if (updates.identity && !updates.identity.realName) {
      throw new Error("Identity.realName is required when updating identity");
    }

    if (updates.artistic_background) {
      if (!updates.artistic_background.roles?.length) {
        throw new Error("At least one artistic role is required");
      }
    }

    const artist = await ctx.db
      .query("artists")
      .withIndex("by_artistID", (q) => q.eq("artistID", artistID))
      .first();

    if (!artist) {
      console.error("❌ Artist not found in Convex DB:", artistID);
      throw new Error("Artist not found. Double-check artistID and index.");
    }

    // Clean updates by removing undefined/null values
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined && v !== null)
    );

    console.log("🔄 Updating artist with:", cleanUpdates);
    
    try {
      await ctx.db.patch(artist._id, cleanUpdates);
      console.log("✅ Artist updated:", artistID);
      return { success: true };
    } catch (error:any) {
      console.error("❌ Failed to update artist:", error);
      throw new Error(`Failed to update artist: ${error.message}`);
    }
  },
});