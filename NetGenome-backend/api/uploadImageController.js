// import { ConvexHttpClient } from "convex/browser";
// import { api } from "../convex/_generated/api.js"; // adjust path as needed

// // Convex client (replace URL with your own)
// const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// export const uploadImageController = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Convert file buffer to File object (global in Node.js 18+)
//     const file = new File([req.file.buffer], req.file.originalname, {
//       type: req.file.mimetype,
//     });
// console.log(file);

//     // Call Convex action to store the file
//     const storageId = await convex.action(api.uploadImage.uploadImage, {
//       file,
//     });

//     // Return storageId to frontend
//     res.status(200).json({ storageId });
//   } catch (error) {
//     console.error("Image upload error:", error);
//     res.status(500).json({ error: "Failed to upload image" });
//   }
// };

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const convex = new ConvexHttpClient(process.env.CONVEX_URL);

export const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Step 1: Get the signed upload URL from Convex
    const uploadUrl = await convex.action(api.uploadImage.getUploadUrl, {});

    // Step 2: Upload file to Convex using fetch
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": req.file.mimetype,
        "Content-Disposition": `attachment; filename="${req.file.originalname}"`,
      },
      body: req.file.buffer,
    });

    const { storageId } = await uploadRes.json();

    // Step 3: Use storageId to get a real usable image URL
    const imageUrl = await convex.action(api.uploadImage.getImageUrl, {
      storageId,
    });

    // ✅ Final response to frontend
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
