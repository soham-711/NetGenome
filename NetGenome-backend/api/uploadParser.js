import express from "express";
import multer from "multer";
import { extractArtistsFromPDF } from "../parser/extractArtists.js";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

router.post("/", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;

  try {
    const artists = await extractArtistsFromPDF(filePath);

    for (const artist of artists) {
    //   await convex.mutation(api.artists.insert, artist);
    console.log(artist);
    
    }

    res.json({ message: "✅ Artists extracted and saved", total: artists.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to extract artists" });
  }
});

export default router;









// import express from "express";
// import multer from "multer";
// import pdfParse from "pdf-parse";
// import fs from "fs/promises";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "../convex/_generated/api.js";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// router.post("/", upload.single("pdf"), async (req, res) => {
//   try {
//     const buffer = await fs.readFile(req.file.path);
//     const data = await pdfParse(buffer);
//     const fullText = data.text;

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const prompt = `
// You are a magazine artist data extractor. Your job is to extract structured artist information from the following magazine content. 
// Return the result as an array of JSON objects based on this schema (1 per artist):

// {
//   "artistID": "string",
//   "displayName": "string",
//   "priceUSD": number,
//   "imageUrl": "string",
//   "vibeTags": [string],
//   "identity": {
//     "realName": "string",
//     "aliases": [string],
//     "origin": "string",
//     "location": "string",
//     "languages": [string],
//     "gender": "string"
//   },
//   "artistic_background": {
//     "roles": [string],
//     "genres": [string],
//     "influences": [string],
//     "skills": [string]
//   },
//   "career": {
//     "education": "string",
//     "collaborations": [string],
//     "performances": [string],
//     "awards": [string]
//   },
//   "discography": [
//     {
//       "title": "string",
//       "type": "string",
//       "year": number,
//       "label": "string",
//       "details": "string"
//     }
//   ],
//   "creative_process": {
//     "songwriting_process": "string",
//     "production_process": "string"
//   },
//   "availability": {
//     "current_projects": [string],
//     "looking_for": [string]
//   },
//   "online_presence": {
//     "website": "string",
//     "social_media": [
//       {
//         "platform": "string",
//         "url": "string"
//       }
//     ],
//     "streaming_platforms": [
//       {
//         "platform": "string",
//         "url": "string"
//       }
//     ]
//   },
//   "quotes": [string]
// }

// Magazine Content:
// ${fullText}
// `;

//     const result = await model.generateContent(prompt);
//     const text = await result.response.text();
//     const artists = JSON.parse(text);

//     // Insert each artist into Convex DB
//     const inserted = await Promise.all(
//       artists.map(async (artist) =>
//         convex.mutation(api.artists.insert, artist)
//       )
//     );

//     res.json({ success: true, inserted: inserted.length, artists });
//   } catch (err) {
//     console.error("❌ Error processing PDF:", err);
//     res.status(500).json({ error: "Failed to parse and store artist data." });
//   }
// });

// export default router;
