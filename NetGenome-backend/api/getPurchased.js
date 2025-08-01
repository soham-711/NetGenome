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


router.post("/purchased-artists", async (req, res) => {
  const { userId } = req.body;

  try {
    const purchased = await convex.query(api.getPurchase.getPurchasedProfilesAll, {
      userId,
    });
    res.status(200).json({ purchased });
  } catch (err) {
    console.error("Error fetching purchased artists:", err);
    res.status(500).json({ error: "Failed to fetch purchased artists" });
  }
});


export default router;
