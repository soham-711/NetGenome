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

export default router;
