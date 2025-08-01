import express from "express";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const router = express.Router();
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

router.post("/", async (req, res) => {
  const { artistId } = req.body;

  if (!artistId) {
    return res.status(400).json({ error: "Missing artistId" });
  }

  try {
    const artist = await convex.query(api.artists.getById, {
      id: artistId,
    });

    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    res.json({ artist });
  } catch (err) {
    console.error("❌ Fetch artist failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// POST /api/artist/by-id
router.post("/by-id", async (req, res) => {
  const { artistID } = req.body; // ✅ match your schema: artistID

  if (!artistID) {
    return res.status(400).json({ error: "Missing artistID" });
  }

  try {
    const artist = await convex.query(api.artists.getArtistByArtistID, {
      artistID, // ✅ same as schema: artistID: v.string()
    });

    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    res.status(200).json(artist);
  } catch (err) {
    console.error("❌ Failed to fetch artist by artistID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/artists", async (req, res) => {
  try {
    const artists = await convex.query(api.artists.getAllArtists, {});
    res.status(200).json({ artists });
  } catch (error) {
    console.error("❌ Failed to fetch all artists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
