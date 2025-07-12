import express from "express";
import dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

dotenv.config();

const router = express.Router();
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

router.post("/", async (req, res) => {
  try {
    const filters = req.body.collected;
    console.log(filters);

    if (!filters) {
      return res
        .status(400)
        .json({ error: "Missing 'collected' in request body." });
    }

    const allArtists = await convex.query(api.matched.getAll);

    const perfectMatches = [];
    const suggestedMatches = [];

    allArtists.forEach((artist) => {
      const genderMatch =
        !filters.genderPreference ||
        filters.genderPreference === "Any" ||
        artist.identity?.gender === filters.genderPreference;

      const rolesMatch = filters.roles?.every((role) =>
        artist.artistic_background?.roles?.includes(role)
      );

      const genresMatch = filters.genres?.every((genre) =>
        artist.artistic_background?.genres?.includes(genre)
      );

      const vibeMatch = filters.vibeTags?.every((tag) =>
        artist.vibeTags?.includes(tag)
      );

      const languageMatch = filters.language?.every((lang) =>
        artist.identity?.languages?.includes(lang)
      );

      const locationMatch =
        !filters.location ||
        artist.identity?.location
          ?.toLowerCase()
          .includes(filters.location.toLowerCase());

      const isPerfect =
        genderMatch &&
        rolesMatch &&
        genresMatch &&
        vibeMatch &&
        languageMatch &&
        locationMatch;

      // const isSuggested =
      //   !isPerfect &&
      //   genderMatch &&
      //   (filters.roles?.some((role) =>
      //     artist.artistic_background?.roles?.includes(role)
      //   ) ||
      //     filters.genres?.some((genre) =>
      //       artist.artistic_background?.genres?.includes(genre)
      //     ) ||
      //     filters.vibeTags?.some((tag) => artist.vibeTags?.includes(tag)) ||
      //     filters.language?.some((lang) =>
      //       artist.identity?.languages?.includes(lang)
      //     ) ||
      //     (filters.location &&
      //       artist.identity?.location
      //         ?.toLowerCase()
      //         .includes(filters.location.toLowerCase())));

      const isSuggested =
        !isPerfect && rolesMatch && genresMatch && vibeMatch && languageMatch;

      if (isPerfect) {
        perfectMatches.push(artist);
      } else if (isSuggested) {
        suggestedMatches.push(artist);
      }
    });

    res.status(200).json({
      message: "🎯 Matching complete",
      perfectMatches,
      suggestedMatches,
    });
  } catch (err) {
    console.error("❌ Matching error:", err);
    res.status(500).json({ error: "Failed to match artists." });
  }
});

export default router;
