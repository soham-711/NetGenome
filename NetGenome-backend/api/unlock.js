import express from "express";
import axios from "axios";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const router = express.Router();
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

router.post("/", async (req, res) => {
  const { transactionSignature, userId, purchases, recipient } = req.body;

  if (!transactionSignature || !userId || !purchases || !recipient) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const artistIds = purchases.map((p) => p.artistId); // ✅ FIXED

  // ✅ Add to purchased DB
  await convex.mutation(api.addPurchased.addManyPurchased, {
    userId,
    artistIds,
    transactionSignature,
  });

  // ✅ Remove from cart
  await convex.mutation(api.clearCart.clearCart, {
    userId,
    artistIds,
  });

  return res.json({
    success: true,
    unlocked: purchases,
  });
});

export default router;
