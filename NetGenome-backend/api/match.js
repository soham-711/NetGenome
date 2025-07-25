// import express from "express";
// import dotenv from "dotenv";
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "../convex/_generated/api.js";

// dotenv.config();

// const router = express.Router();
// const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// router.post("/", async (req, res) => {
//   try {
//     const filters = req.body.collected;
//     console.log(filters);

//     if (!filters) {
//       return res
//         .status(400)
//         .json({ error: "Missing 'collected' in request body." });
//     }

//     const allArtists = await convex.query(api.matched.getAll);

//     const perfectMatches = [];
//     const suggestedMatches = [];

//     allArtists.forEach((artist) => {
//       const genderMatch =
//         !filters.genderPreference ||
//         filters.genderPreference === "Any" ||
//         artist.identity?.gender === filters.genderPreference;

//       const rolesMatch = filters.roles?.every((role) =>
//         artist.artistic_background?.roles?.includes(role)
//       );

//       const genresMatch = filters.genres?.every((genre) =>
//         artist.artistic_background?.genres?.includes(genre)
//       );

//       const vibeMatch = filters.vibeTags?.every((tag) =>
//         artist.vibeTags?.includes(tag)
//       );

//       const languageMatch = filters.language?.every((lang) =>
//         artist.identity?.languages?.includes(lang)
//       );

//       const locationMatch =
//         !filters.location ||
//         artist.identity?.location
//           ?.toLowerCase()
//           .includes(filters.location.toLowerCase());

//       const isPerfect =
//         genderMatch &&
//         rolesMatch &&
//         genresMatch &&
//         vibeMatch &&
//         languageMatch &&
//         locationMatch;

//       // const isSuggested =
//       //   !isPerfect &&
//       //   genderMatch &&
//       //   (filters.roles?.some((role) =>
//       //     artist.artistic_background?.roles?.includes(role)
//       //   ) ||
//       //     filters.genres?.some((genre) =>
//       //       artist.artistic_background?.genres?.includes(genre)
//       //     ) ||
//       //     filters.vibeTags?.some((tag) => artist.vibeTags?.includes(tag)) ||
//       //     filters.language?.some((lang) =>
//       //       artist.identity?.languages?.includes(lang)
//       //     ) ||
//       //     (filters.location &&
//       //       artist.identity?.location
//       //         ?.toLowerCase()
//       //         .includes(filters.location.toLowerCase())));

//       const isSuggested =
//         !isPerfect && rolesMatch && genresMatch && vibeMatch && languageMatch;

//       if (isPerfect) {
//         perfectMatches.push(artist);
//       } else if (isSuggested) {
//         suggestedMatches.push(artist);
//       }
//     });

//     res.status(200).json({
//       message: "🎯 Matching complete",
//       perfectMatches,
//       suggestedMatches,
//     });
//   } catch (err) {
//     console.error("❌ Matching error:", err);
//     res.status(500).json({ error: "Failed to match artists." });
//   }
// });

// export default router;



import express from "express";
import dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

dotenv.config();

const router = express.Router();
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// --- Helper functions ---
const normalize = (str) => str?.trim().toLowerCase();

const normalizeRole = (role) => {
  const roleMap = {
    vocalist: "singer",
    singer: "singer",
    songwriter: "composer",
    composer: "composer",
  };
  return roleMap[normalize(role)] || normalize(role);
};

// --- POST: Match Artists ---
router.post("/", async (req, res) => {
  try {
    const filters = req.body.collected;
    if (!filters) {
      return res.status(400).json({ error: "Missing 'collected' in request body." });
    }

    const allArtists = await convex.query(api.matched.getAll);

    const perfectMatches = [];
    const suggestedMatches = [];

    for (const artist of allArtists) {
      // Normalize data from artist
      const artistRoles = (artist.artistic_background?.roles || []).map(normalizeRole);
      const artistGenres = (artist.artistic_background?.genres || []).map(normalize);
      const artistVibeTags = (artist.vibeTags || []).map(normalize);
      const artistLanguages = (artist.identity?.languages || []).map(normalize);
      const artistGender = normalize(artist.identity?.gender);
      const artistLocation = normalize(artist.identity?.location);

      // Normalize filters
      const filterRoles = (filters.roles || []).map(normalizeRole);
      const filterGenres = (filters.genres || []).map(normalize);
      const filterVibeTags = (filters.vibeTags || []).map(normalize);
      const filterLanguages = (filters.language || []).map(normalize);
      const filterGender = normalize(filters.genderPreference);
      const filterLocation = normalize(filters.location);

      // Matching logic
      const genderMatch =
        !filterGender || filterGender === "any" || artistGender === filterGender;

      const rolesMatch = filterRoles.every((r) => artistRoles.includes(r));
      const genresMatch = filterGenres.every((g) => artistGenres.includes(g));
      const vibeMatch = filterVibeTags.every((t) => artistVibeTags.includes(t));
      const languageMatch = filterLanguages.every((l) => artistLanguages.includes(l));
      const locationMatch =
        !filterLocation || artistLocation?.includes(filterLocation);

      const isPerfect =
        genderMatch &&
        rolesMatch &&
        genresMatch &&
        vibeMatch &&
        languageMatch &&
        locationMatch;

      const softScore = [rolesMatch, genresMatch, vibeMatch, languageMatch].filter(Boolean).length;
      const isSuggested = !isPerfect && softScore >= 2;

      if (isPerfect) {
        perfectMatches.push(artist);
      } else if (isSuggested) {
        suggestedMatches.push(artist);
      }
    }

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
