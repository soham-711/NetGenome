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
        })
      ),
      artistic_background: v.optional(
        v.object({
          roles: v.array(v.string()),
          genres: v.array(v.string()),
          influences: v.array(v.string()),
          skills: v.array(v.string()),
        })
      ),
      career: v.optional(
        v.object({
          education: v.string(),
          collaborations: v.array(v.string()),
          performances: v.array(v.string()),
          awards: v.array(v.string()),
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
            })
          ),
          streaming_platforms: v.array(
            v.object({
              platform: v.string(),
              url: v.string(),
            })
          ),
        })
      ),
      quotes: v.optional(v.array(v.string())),
    }),
  },
  handler: async (ctx, { artistID, updates }) => {
    console.log("🔍 Looking for artist with ID:", artistID);

    const artist = await ctx.db
      .query("artists")
      .withIndex("by_artistID", (q) => q.eq("artistID", artistID))
      .first();

    if (!artist) {
      console.error("❌ Artist not found in Convex DB:", artistID);
      throw new Error("Artist not found. Double-check artistID and index.");
    }

    await ctx.db.patch(artist._id, updates);
    console.log("✅ Artist updated:", artistID);
  },
});
