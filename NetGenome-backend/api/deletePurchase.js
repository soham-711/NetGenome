import express from "express";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const router = express.Router();
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

router.post("/", async (req, res) => {
  const { userId, artistId } = req.body;
  if (!userId || !artistId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  await convex.mutation(api.purchases.deletePurchase, { userId, artistId });

  res.json({ success: true });
});

export default router;
