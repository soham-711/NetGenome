// routes/cartRoutes.js (or .ts)
import express from "express";
import { ConvexHttpClient } from "convex/browser";
import dotenv from "dotenv";
import { api } from "../convex/_generated/api.js";

dotenv.config();
const router = express.Router();

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// POST /api/cart/add
router.post("/add", async (req, res) => {
  try {
    console.log(req.body);

    const { artistId, userId } = req.body;

    if (!artistId || !userId) {
      return res.status(400).json({ message: "Missing artistId or userId" });
    }

    await convex.mutation(api.addToCart.addToCart, {
      artistId, // Convex id (e.g., "j57...")
      userId,
    });

    res.status(200).json({ message: "Artist added to cart" });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET user's cart
router.post("/get", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const artists = await convex.query(api.getCartItems.getCartItems, { userId });

    return res.status(200).json({ cart: artists });
  } catch (error) {
    console.error("Cart fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch cart items" });
  }
});


// POST /api/cart/remove
router.post("/remove", async (req, res) => {
  try {
    const { userId, artistId } = req.body;

    if (!userId || !artistId) {
      return res.status(400).json({ error: "Missing userId or artistId" });
    }

    // Fetch all cartItems for this user
    const cartItems = await convex.query(api.getCartItems.getCartItems, { userId });

    // Find the matching item by artistId
    const itemToRemove = cartItems.find(item => item._id && item._id === artistId);

    if (!itemToRemove) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    await convex.mutation(api.removeFromCart.removeFromCart, {
      userId,
      artistId,
    });

    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Cart remove error:", error);
    return res.status(500).json({ error: "Failed to remove item from cart" });
  }
});


// POST /api/cart/clear
router.post("/clear", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    await convex.mutation(api.cart.clearCart, { userId });

    return res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Cart clear error:", error);
    return res.status(500).json({ error: "Failed to clear cart" });
  }
});


export default router;
