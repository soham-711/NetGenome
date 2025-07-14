// api/getPurchased.js
import express from "express";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const router = express.Router();
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

router.post("/", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const profiles = await convex.query(api.getPurchase.getPurchasedProfiles, {
      userId,
    });

    res.json({ success: true, data: profiles });
  } catch (err) {
    console.error("Failed to fetch purchased profiles:", err.message);
    res.status(500).json({ error: "Failed to fetch purchased profiles" });
  }
});

export default router;
