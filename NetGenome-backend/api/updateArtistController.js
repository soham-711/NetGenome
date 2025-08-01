import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import dotenv from "dotenv";

dotenv.config();

const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// export const updateArtistController = async (req, res) => {
//   const { artistID, updates } = req.body;

//   if (!artistID || typeof updates !== "object") {
//     return res.status(400).json({ error: "artistID and updates are required" });
//   }

//   try {
//     await convex.mutation(api.artists.updateArtistByArtistID, {
//       artistID,
//       updates,
//     });

//     res.status(200).json({ message: "Artist updated successfully" });
//   } catch (error) {
//     console.error("❌ Error updating artist:", error);
//     res.status(500).json({ error: "Failed to update artist" });
//   }
// };


export const updateArtistController = async (req, res) => {
  const { artistID, updates } = req.body;

  if (!artistID || typeof updates !== "object") {
    return res.status(400).json({ error: "artistID and updates are required" });
  }

  try {
    await convex.mutation(api.artists.updateArtistByArtistID, {
      artistID,
      updates,
    });

    res.status(200).json({ message: "Artist updated successfully" });
  } catch (error) {
    console.error("❌ Error updating artist:", error);
    res.status(500).json({ error: "Failed to update artist" });
  }
};
