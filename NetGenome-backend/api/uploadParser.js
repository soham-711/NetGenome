// import express from "express";
// import multer from "multer";
// import { extractArtistsFromPDF } from "../parser/extractArtists.js";
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "../convex/_generated/api.js";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });
// const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// router.post("/", upload.single("file"), async (req, res) => {
//   const filePath = req.file.path;
//   console.log(filePath);

//   try {
//     const artists = await extractArtistsFromPDF(filePath);

//     for (const artist of artists) {
//     //   await convex.mutation(api.artists.insert, artist);
//     console.log(artist);

//     }

//     res.json({ message: "✅ Artists extracted and saved", total: artists.length });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to extract artists" });
//   }
// });

// export default router;




// import express from "express";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import dotenv from "dotenv";
// import {
//   extractFromPdf,
//   extractFromDocx,
//   ocrImage,
// } from "../parser/extractUtils.js"; // new helper file
// import { callGeminiForSchema } from "../parser/geminiParser.js"; // new helper for prompt
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "../convex/_generated/api.js";

// dotenv.config();

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });
// const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// router.post("/", upload.single("file"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const filePath = req.file.path;
//   const ext = path.extname(req.file.originalname).toLowerCase();
//   let combinedText = "";
//   let images = [];

//   try {
//     console.log(`📄 Starting extraction for: ${req.file.originalname}`);

//     // === Step 1: Extract text & images from uploaded file ===
//     if (ext === ".pdf") {
//       const { text, images: pdfImages } = await extractFromPdf(filePath);
//       combinedText += text;
//       images.push(...pdfImages);
//     } else if (ext === ".docx") {
//       const { text, images: docxImages } = await extractFromDocx(filePath);
//       combinedText += text;
//       images.push(...docxImages);
//     } else {
//       fs.unlinkSync(filePath);
//       return res.status(400).json({ error: "Unsupported file format" });
//     }

//     // === Step 2: OCR images from THIS file only ===
//     for (const imgPath of images) {
//       combinedText += "\n" + (await ocrImage(imgPath));
//       fs.unlinkSync(imgPath); // delete image after OCR
//     }

//     // === Step 3: Parse artist profiles via Gemini ===
//     const artists = await callGeminiForSchema(combinedText);

//     // === Step 4: Save artists to Convex ===
//     for (const artist of artists) {
//       await convex.mutation(api.seedArtists.seedArtists, { artists: [artist] });
//       console.log(`✅ Saved artist: ${artist.displayName}`);
//     }

//     // === Step 5: Clean up uploaded file ===
//     fs.unlinkSync(filePath);

//     res.json({
//       message: "✅ Artists extracted and saved",
//       total: artists.length,
//       artists,
//     });
//   } catch (err) {
//     console.error("❌ Extraction error:", err);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     res
//       .status(500)
//       .json({ error: "Failed to extract artists", details: err.message });
//   }
// });

// export default router;






import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import {
  extractFromPdf,
  extractFromDocx,
  ocrImage
} from "../parser/extractUtils.js"; // your updated extractor with chunks
import { callGeminiForSchema } from "../parser/geminiParser.js"; // Gemini parser
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();
  let chunks = [];
  let images = [];

  try {
    console.log(`📄 Starting extraction for: ${req.file.originalname}`);

    // === Step 1: Extract text chunks & images from uploaded file ===
    if (ext === ".pdf") {
      const { chunks: pdfChunks, images: pdfImages } = await extractFromPdf(filePath);
      chunks = pdfChunks;
      images.push(...pdfImages);
    } else if (ext === ".docx") {
      const { chunks: docxChunks, images: docxImages } = await extractFromDocx(filePath);
      chunks = docxChunks;
      images.push(...docxImages);
    } else {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: "Unsupported file format" });
    }

    // === Step 2: OCR any extracted images and append OCR results as chunks ===
    for (const imgPath of images) {
      const ocrText = await ocrImage(imgPath);
      if (ocrText.trim().length > 50) { // treat only meaningful OCR as a chunk
        chunks.push(ocrText);
      }
      fs.unlinkSync(imgPath); // cleanup
    }

    if (chunks.length === 0) {
      throw new Error("No interview text detected in file.");
    }


    // Log chunks info
    console.log(`Extracted ${chunks.length} text chunks.`);
    chunks.forEach((c, i) => console.log(`Chunk[${i}] length: ${c.length}`));

    // === Step 3: Process each chunk with Gemini ===
    const allArtists = [];
    for (const chunk of chunks) {
      try {
        const parsedArtists = await callGeminiForSchema(chunk);
        
        allArtists.push(...parsedArtists);
      } catch (err) {
        console.warn("⚠ Gemini failed for chunk:", err);
      }
    }

    // === Step 4: Save to Convex ===
    for (const artist of allArtists) {
      await convex.mutation(api.seedArtists.seedArtists, { artists: [artist] });
      console.log(`✅ Saved artist: ${artist.displayName}`);
    }

    // === Step 5: Cleanup uploaded file ===
    fs.unlinkSync(filePath);

    res.json({
      message: "✅ Artists extracted and saved",
      total: allArtists.length,
      artists: allArtists
    });
  } catch (err) {
    console.error("❌ Extraction error:", err);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.status(500).json({ error: "Failed to extract artists", details: err.message });
  }
});

export default router;
