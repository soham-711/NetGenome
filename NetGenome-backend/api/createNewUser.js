import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// ✅ Create user on first login or signup
export const createOrLoginUser = async (req, res) => {
  const { email } = req.body;

  try {
    await convex.mutation(api.createUserProfile.createUserProfile, {
      email,
      role: "user", // default role
    });

    res.status(200).json({ success: true, message: "User created or exists" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get User Profile by Email (POST)
export const getUserProfile = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await convex.query(api.createUserProfile.getUserProfileByEmail, { email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
