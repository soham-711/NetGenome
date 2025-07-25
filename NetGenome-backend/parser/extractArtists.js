// import fs from "fs";
// import pdf from "pdf-parse";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini model
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// export async function extractArtistsFromPDF(filePath) {
//   try {
//     // Step 1: Read PDF content
//     const dataBuffer = fs.readFileSync(filePath);
//     const pdfData = await pdf(dataBuffer);
//     const fullText = pdfData.text;

//     // Step 2: Gemini prompt
// const prompt = `
// You are a highly accurate AI assistant reading a music magazine PDF.

// 🎯 Your job is to extract ONLY real, profiled artists who are interviewed, featured, or discussed in detail.

// 🎯 Format the result as clean, valid JSON using the schema below — one full object per artist.

// 🎯 If any data is missing, use:
// - Empty string for string fields.
// - Empty array [] for list fields like social media or streaming links.
// - Skip entirely if not clearly an artist.

// SCHEMA:
// {
//   "artistID": "string",                      // Unique ID like slug (e.g., "marfayos")
//   "displayName": "string",                   // Stage or known name
//   "priceUSD": number,                        // Use null if not mentioned
//   "imageUrl": "string",                      // Use "" if no image URL available
//   "vibeTags": [string],                      // Up to 5 mood/genre tags
//   "identity": {
//     "realName": "string",
//     "aliases": [string],
//     "origin": "string",
//     "location": "string",
//     "languages": [string],
//     "gender": "string"
//   },
//   "artistic_background": {
//     "roles": [string],                       // e.g., "Singer", "Composer"
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
//       { "platform": "string", "url": "string" }
//     ],
//     "streaming_platforms": [
//       { "platform": "string", "url": "string" }
//     ]
//   },
//   "quotes": [string]
// }

// ⚠️ STRICT RULES:
// - Only include valid artist profiles — ignore ads, editors, unrelated names.
// - Do not guess or make up content not found in the magazine.
// - DO NOT return placeholder values like "[Object]", "null", or unfinished entries.
// - If a section isn’t mentioned in the magazine (e.g. social links), use an empty string or [].
// - Output ONLY raw, valid JSON. No markdown, no explanation, no \`\`\` markers.

// 📰 MAGAZINE TEXT:
// ${fullText}
// `.trim();

//     // Step 3: Generate Gemini response
//     const result = await model.generateContent(prompt);
//     let content = result.response.text().trim();

//     // Step 4: Strip ```json or ``` if Gemini returns markdown
//     if (content.startsWith("```json")) {
//       content = content.replace(/^```json/, "").replace(/```$/, "").trim();
//     } else if (content.startsWith("```")) {
//       content = content.replace(/^```/, "").replace(/```$/, "").trim();
//     }

//     // Step 5: Parse & validate
//     const raw = JSON.parse(content);
//     const artists = Array.isArray(raw) ? raw : [raw];

//     // Step 6: Clean [Object] issues for streaming_platforms, etc.
//     const cleaned = artists.map((artist) => {
//       const fixList = (list) =>
//         Array.isArray(list)
//           ? list.filter(
//               (item) =>
//                 typeof item === "object" &&
//                 typeof item.platform === "string" &&
//                 typeof item.url === "string"
//             )
//           : [];

//       return {
//         ...artist,
//         online_presence: {
//           website: artist.online_presence?.website || "",
//           social_media: fixList(artist.online_presence?.social_media),
//           streaming_platforms: fixList(
//             artist.online_presence?.streaming_platforms
//           ),
//         },
//       };
//     });

//     console.log(`✅ Extracted ${cleaned.length} artist(s).`);
//     return cleaned;
//   } catch (error) {
//     console.error("❌ Extraction failed:", error.message);
//     return [];
//   }
// }

import fs from "fs";
import pdf from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

// Setup Gemini
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Setup Convex client
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

export async function extractArtistsFromPDF(filePath) {
  try {
    // Step 1: Read PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    const fullText = pdfData.text;

    // Step 2: Prompt Gemini
    const prompt = `
You are a highly accurate AI assistant reading a music magazine PDF.

🎯 Your job is to extract ONLY **real, fully profiled artists** who are extensively **interviewed, featured, or discussed in detail**.

✅ Include an artist ONLY if the magazine contains meaningful data about them such as:
- A full biography, interview, or quotes
- Artistic background (genres, influences, skills)
- Career milestones (education, awards, performances, collaborations)
- Discography (albums, singles with labels or years)

❌ DO NOT include artists if:
- They are only mentioned briefly
- Their profile fields are mostly empty
- They do not have any quotes, biography, or creative/career info

🎯 Format the result as clean, valid JSON using the schema below — one object per valid artist.

🎯 If any field is missing in the magazine, use:
- Empty string for strings
- Empty array [] for lists

SCHEMA:
{
  "artistID": "string",                      // Unique ID like slug (e.g., "marfayos")
  "displayName": "string",                   // Stage or known name
  "priceUSD": number,                        // Use 0 if not mentioned
  "imageUrl": "string",                      // Use "" if no image URL available
  "vibeTags": [string],                      // Up to 5 mood/genre tags
  "identity": {
    "realName": "string",
    "aliases": [string],
    "origin": "string",
    "location": "string",
    "languages": [string],
    "gender": "string"
  },
  "artistic_background": {
    "roles": [string],                       // e.g., "Singer", "Composer"
    "genres": [string],
    "influences": [string],
    "skills": [string]
  },
  "career": {
    "education": "string",
    "collaborations": [string],
    "performances": [string],
    "awards": [string]
  },
  "discography": [
    {
      "title": "string",
      "type": "string",
      "year": number,
      "label": "string",
      "details": "string"
    }
  ],
  "creative_process": {
    "songwriting_process": "string",
    "production_process": "string"
  },
  "availability": {
    "current_projects": [string],
    "looking_for": [string]
  },
  "online_presence": {
    "website": "string",
    "social_media": [
      { "platform": "string", "url": "string" }
    ],
    "streaming_platforms": [
      { "platform": "string", "url": "string" }
    ]
  },
  "quotes": [string]
}

⚠ STRICT FILTER RULES:
- Do NOT include placeholder values like "[Object]", "null", or unfinished entries.
- Do NOT include artists with mostly empty fields or no interview/discussion.
- Do NOT fabricate or assume any information not clearly in the text.
- Output ONLY clean raw JSON. No markdown, no explanation, no \`\`\`.

📰 MAGAZINE TEXT:
${fullText}
`.trim();

    const result = await model.generateContent(prompt);
    let content = result.response.text().trim();

    // Step 3: Clean markdown if needed
    if (content.startsWith("```json")) {
      content = content
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    } else if (content.startsWith("```")) {
      content = content.replace(/^```/, "").replace(/```$/, "").trim();
    }

    // Step 4: Parse
    const raw = JSON.parse(content);
    const artists = Array.isArray(raw) ? raw : [raw];

    // Step 5: Sanitize for Convex schema
    const fixList = (list) =>
      Array.isArray(list)
        ? list.filter(
            (item) =>
              typeof item === "object" &&
              typeof item.platform === "string" &&
              typeof item.url === "string"
          )
        : [];

    const fixDiscography = (items) =>
      Array.isArray(items)
        ? items.map((entry) => ({
            title: entry.title || "",
            type: entry.type || "",
            year:
              typeof entry.year === "number" && !isNaN(entry.year)
                ? entry.year
                : 0,
            label: typeof entry.label === "string" ? entry.label : "",
            details: entry.details || "",
          }))
        : [];

    const cleaned = artists.map((artist) => ({
      ...artist,
      priceUSD:
        typeof artist.priceUSD === "number" && !isNaN(artist.priceUSD)
          ? artist.priceUSD
          : 0,
      imageUrl: artist.imageUrl || "",
      vibeTags: Array.isArray(artist.vibeTags) ? artist.vibeTags : [],
      identity: {
        ...artist.identity,
        realName: artist.identity?.realName || "",
        aliases: Array.isArray(artist.identity?.aliases)
          ? artist.identity.aliases
          : [],
        origin: artist.identity?.origin || "",
        location: artist.identity?.location || "",
        languages: Array.isArray(artist.identity?.languages)
          ? artist.identity.languages
          : [],
        gender: artist.identity?.gender || "",
      },
      artistic_background: {
        roles: Array.isArray(artist.artistic_background?.roles)
          ? artist.artistic_background.roles
          : [],
        genres: Array.isArray(artist.artistic_background?.genres)
          ? artist.artistic_background.genres
          : [],
        influences: Array.isArray(artist.artistic_background?.influences)
          ? artist.artistic_background.influences
          : [],
        skills: Array.isArray(artist.artistic_background?.skills)
          ? artist.artistic_background.skills
          : [],
      },
      career: {
        education: artist.career?.education || "",
        collaborations: Array.isArray(artist.career?.collaborations)
          ? artist.career.collaborations
          : [],
        performances: Array.isArray(artist.career?.performances)
          ? artist.career.performances
          : [],
        awards: Array.isArray(artist.career?.awards)
          ? artist.career.awards
          : [],
      },
      discography: fixDiscography(artist.discography),
      creative_process: {
        songwriting_process: artist.creative_process?.songwriting_process || "",
        production_process: artist.creative_process?.production_process || "",
      },
      availability: {
        current_projects: Array.isArray(artist.availability?.current_projects)
          ? artist.availability.current_projects
          : [],
        looking_for: Array.isArray(artist.availability?.looking_for)
          ? artist.availability.looking_for
          : [],
      },
      online_presence: {
        website: artist.online_presence?.website || "",
        social_media: fixList(artist.online_presence?.social_media),
        streaming_platforms: fixList(
          artist.online_presence?.streaming_platforms
        ),
      },
      quotes: Array.isArray(artist.quotes) ? artist.quotes : [],
    }));

    console.log(`✅ Extracted ${cleaned.length} artist(s)`);
    console.log(cleaned);

    // Step 6: Store in Convex
    await convex.mutation(api.seedArtists.seedArtists, { artists: cleaned });

    console.log(`✅ Synced ${cleaned.length} artist(s) to Convex`);
    return cleaned;
  } catch (error) {
    console.error("❌ Extraction failed:", error.message);
    return [];
  }
}
