import { api } from "../convex/_generated/api.js";
import { ConvexHttpClient } from "convex/browser"; // or however you initialized it
const convex = new ConvexHttpClient(process.env.CONVEX_URL);
export const getAllArtistRequests = async (req, res) => {
  try {
    const requests = await convex.query(api.submitArtistRequest.getAllArtistRequests);
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
