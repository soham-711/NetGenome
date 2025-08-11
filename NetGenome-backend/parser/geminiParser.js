// import { GoogleGenerativeAI } from "@google/generative-ai";
// import JSON5 from "json5";

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// /** === Safe JSON Parse with Cleanup & Schema Coercion === */
// function safeJsonParse(raw) {
//   try {
//     // Remove markdown fences
//     raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

//     // Find first { or [
//     const firstBracket = Math.min(
//       raw.indexOf("{") >= 0 ? raw.indexOf("{") : Infinity,
//       raw.indexOf("[") >= 0 ? raw.indexOf("[") : Infinity
//     );
//     if (firstBracket !== Infinity) {
//       raw = raw.slice(firstBracket);
//     }

//     // Strip bad starts
//     raw = raw.replace(/^,/, "").replace(/^\[\s*\],?/, "");

//     // Remove trailing commas
//     raw = raw.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

//     // Unescape if double encoded
//     if ((raw.startsWith('"') && raw.endsWith('"')) || raw.includes('\\"')) {
//       raw = raw.replace(/\\"/g, '"').replace(/^"|"$/g, "");
//     }

//     let parsed = JSON5.parse(raw);

//     // If parsed as string containing JSON, parse again
//     if (typeof parsed === "string" && (parsed.trim().startsWith("{") || parsed.trim().startsWith("["))) {
//       parsed = JSON5.parse(parsed);
//     }

//     // Ensure always array
//     return Array.isArray(parsed) ? parsed : [parsed];
//   } catch (err) {
//     console.error("❌ JSON repair failed:", err);
//     console.log("🔍 Gemini raw output before fail:\n", raw);
//     return [];
//   }
// }

// /** === Schema Coercion === */
// function coerceToSchema(artist) {
//   return {
//     artistID: String(artist.artistID || artist.identity?.realName || "").trim().toLowerCase().replace(/\s+/g, ""),
//     displayName: String(artist.displayName || artist.identity?.realName || ""),
//     priceUSD: Number(artist.priceUSD || 0),
//     imageUrl: artist.imageUrl || undefined,
//     vibeTags: Array.isArray(artist.vibeTags) ? artist.vibeTags.map(String) : undefined,
//     identity: {
//       realName: String(artist.identity?.realName || ""),
//       aliases: Array.isArray(artist.identity?.aliases) ? artist.identity.aliases.map(String) : [],
//       origin: String(artist.identity?.origin || ""),
//       location: String(artist.identity?.location || ""),
//       languages: Array.isArray(artist.identity?.languages) ? artist.identity.languages.map(String) : [],
//       gender: artist.identity?.gender ? String(artist.identity.gender) : undefined,
//       birthYear: artist.identity?.birthYear ? Number(artist.identity.birthYear) : undefined
//     },
//     artistic_background: {
//       roles: Array.isArray(artist.artistic_background?.roles) ? artist.artistic_background.roles.map(String) : [],
//       genres: Array.isArray(artist.artistic_background?.genres) ? artist.artistic_background.genres.map(String) : [],
//       influences: Array.isArray(artist.artistic_background?.influences) ? artist.artistic_background.influences.map(String) : [],
//       skills: Array.isArray(artist.artistic_background?.skills) ? artist.artistic_background.skills.map(String) : [],
//       signature_style: artist.artistic_background?.signature_style ? String(artist.artistic_background.signature_style) : undefined
//     },
//     career: {
//       education: String(artist.career?.education || ""),
//       collaborations: Array.isArray(artist.career?.collaborations) ? artist.career.collaborations.map(String) : [],
//       performances: Array.isArray(artist.career?.performances) ? artist.career.performances.map(String) : [],
//       awards: Array.isArray(artist.career?.awards) ? artist.career.awards.map(String) : [],
//       career_evolution: artist.career?.career_evolution ? String(artist.career.career_evolution) : undefined,
//       years_active: artist.career?.years_active ? String(artist.career.years_active) : undefined
//     },
//     discography: Array.isArray(artist.discography)
//       ? artist.discography.map(d => ({
//           title: String(d.title || ""),
//           type: String(d.type || ""),
//           year: Number(d.year || 0),
//           label: String(d.label || ""),
//           details: String(d.details || "")
//         }))
//       : [],
//     creative_process: {
//       songwriting_process: String(artist.creative_process?.songwriting_process || ""),
//       production_process: String(artist.creative_process?.production_process || ""),
//       creative_rituals: artist.creative_process?.creative_rituals ? String(artist.creative_process.creative_rituals) : undefined
//     },
//     availability: {
//       current_projects: Array.isArray(artist.availability?.current_projects) ? artist.availability.current_projects.map(String) : [],
//       looking_for: Array.isArray(artist.availability?.looking_for) ? artist.availability.looking_for.map(String) : []
//     },
//     online_presence: {
//       website: String(artist.online_presence?.website || ""),
//       social_media: Array.isArray(artist.online_presence?.social_media)
//         ? artist.online_presence.social_media.map(s => ({
//             platform: String(s.platform || ""),
//             url: String(s.url || ""),
//             followers: s.followers ? String(s.followers) : undefined
//           }))
//         : [],
//       streaming_platforms: Array.isArray(artist.online_presence?.streaming_platforms)
//         ? artist.online_presence.streaming_platforms.map(s => ({
//             platform: String(s.platform || ""),
//             url: String(s.url || ""),
//             stats: s.stats ? String(s.stats) : undefined
//           }))
//         : []
//     },
//     commerce: artist.commerce ? String(artist.commerce) : undefined,
//     social_impact: artist.social_impact ? String(artist.social_impact) : undefined,
//     quotes: Array.isArray(artist.quotes) ? artist.quotes.map(String) : [],
//     fan_press_quotes: Array.isArray(artist.fan_press_quotes) ? artist.fan_press_quotes.map(String) : undefined,
//     classification: artist.classification ? String(artist.classification) : undefined,
//     lazie_indie_association: artist.lazie_indie_association ? String(artist.lazie_indie_association) : undefined,
//     long_narrative: artist.long_narrative ? String(artist.long_narrative) : undefined
//   };
// }

// /** === Call Gemini API === */
// export async function callGeminiForSchema(allText) {
//   const schemaPrompt = `
// You are a JSON API.
// Reply ONLY with valid minified JSON (no comments, no trailing commas) that matches EXACTLY this array schema:
// [ { ...artistSchema... } ]
// Do not return extra text.
// SCHEMA:
// ${JSON.stringify({
//   artistID: "string",
//   displayName: "string",
//   priceUSD: 0,
//   imageUrl: "",
//   vibeTags: [],
//   identity: {
//     realName: "",
//     aliases: [],
//     origin: "",
//     location: "",
//     languages: [],
//     gender: "",
//     birthYear: 0
//   },
//   artistic_background: {
//     roles: [],
//     genres: [],
//     influences: [],
//     skills: [],
//     signature_style: ""
//   },
//   career: {
//     education: "",
//     collaborations: [],
//     performances: [],
//     awards: [],
//     career_evolution: "",
//     years_active: ""
//   },
//   discography: [{ title: "", type: "", year: 0, label: "", details: "" }],
//   creative_process: {
//     songwriting_process: "",
//     production_process: "",
//     creative_rituals: ""
//   },
//   availability: {
//     current_projects: [],
//     looking_for: []
//   },
//   online_presence: {
//     website: "",
//     social_media: [{ platform: "", url: "", followers: "" }],
//     streaming_platforms: [{ platform: "", url: "", stats: "" }]
//   },
//   commerce: "",
//   social_impact: "",
//   quotes: [],
//   fan_press_quotes: [],
//   classification: "",
//   lazie_indie_association: "",
//   long_narrative: ""
// }, null, 2)}

// TEXT:
// ${allText}
// `;

//   const result = await model.generateContent(schemaPrompt);
//   const raw = result.response.text();
//   const parsed = safeJsonParse(raw);

//   // Apply schema coercion
//   return parsed.map(coerceToSchema);
// }




// import { GoogleGenerativeAI } from "@google/generative-ai";
// import JSON5 from "json5";

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// /** === Safe JSON Parse with Cleanup & Schema Coercion === */
// function safeJsonParse(raw) {
//   try {
//     // Remove markdown fences
//     raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

//     // Find first { or [
//     const firstBracket = Math.min(
//       raw.indexOf("{") >= 0 ? raw.indexOf("{") : Infinity,
//       raw.indexOf("[") >= 0 ? raw.indexOf("[") : Infinity
//     );
//     if (firstBracket !== Infinity) {
//       raw = raw.slice(firstBracket);
//     }

//     // Strip bad starts
//     raw = raw.replace(/^,/, "").replace(/^\[\s*\],?/, "");

//     // Remove trailing commas
//     raw = raw.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

//     // Unescape if double encoded
//     if ((raw.startsWith('"') && raw.endsWith('"')) || raw.includes('\\"')) {
//       raw = raw.replace(/\\"/g, '"').replace(/^"|"$/g, "");
//     }

//     let parsed = JSON5.parse(raw);

//     // If parsed as string containing JSON, parse again
//     if (typeof parsed === "string" && (parsed.trim().startsWith("{") || parsed.trim().startsWith("["))) {
//       parsed = JSON5.parse(parsed);
//     }

//     // Ensure always array
//     return Array.isArray(parsed) ? parsed : [parsed];
//   } catch (err) {
//     console.error("❌ JSON repair failed:", err);
//     console.log("🔍 Gemini raw output before fail:\n", raw);
//     return [];
//   }
// }

// /** === Schema Coercion === */
// function coerceToSchema(artist) {
//   return {
//     artistID: String(artist.artistID || artist.identity?.realName || "")
//       .trim()
//       .toLowerCase()
//       .replace(/\s+/g, ""),
//     displayName: String(artist.displayName || artist.identity?.realName || ""),
//     priceUSD: Number(artist.priceUSD || 0),
//     imageUrl: artist.imageUrl || undefined,
//     vibeTags: Array.isArray(artist.vibeTags) ? artist.vibeTags.map(String) : undefined,
//     identity: {
//       realName: String(artist.identity?.realName || ""),
//       aliases: Array.isArray(artist.identity?.aliases) ? artist.identity.aliases.map(String) : [],
//       origin: String(artist.identity?.origin || ""),
//       location: String(artist.identity?.location || ""),
//       languages: Array.isArray(artist.identity?.languages) ? artist.identity.languages.map(String) : [],
//       gender: artist.identity?.gender ? String(artist.identity.gender) : undefined,
//       birthYear: artist.identity?.birthYear ? Number(artist.identity.birthYear) : undefined
//     },
//     artistic_background: {
//       roles: Array.isArray(artist.artistic_background?.roles) ? artist.artistic_background.roles.map(String) : [],
//       genres: Array.isArray(artist.artistic_background?.genres) ? artist.artistic_background.genres.map(String) : [],
//       influences: Array.isArray(artist.artistic_background?.influences) ? artist.artistic_background.influences.map(String) : [],
//       skills: Array.isArray(artist.artistic_background?.skills) ? artist.artistic_background.skills.map(String) : [],
//       signature_style: artist.artistic_background?.signature_style ? String(artist.artistic_background.signature_style) : undefined
//     },
//     career: {
//       education: String(artist.career?.education || ""),
//       collaborations: Array.isArray(artist.career?.collaborations) ? artist.career.collaborations.map(String) : [],
//       performances: Array.isArray(artist.career?.performances) ? artist.career.performances.map(String) : [],
//       awards: Array.isArray(artist.career?.awards) ? artist.career.awards.map(String) : [],
//       career_evolution: artist.career?.career_evolution ? String(artist.career.career_evolution) : undefined,
//       years_active: artist.career?.years_active ? String(artist.career.years_active) : undefined
//     },
//     discography: Array.isArray(artist.discography)
//       ? artist.discography.map(d => ({
//           title: String(d.title || ""),
//           type: String(d.type || ""),
//           year: Number(d.year || 0),
//           label: String(d.label || ""),
//           details: String(d.details || "")
//         }))
//       : [],
//     creative_process: {
//       songwriting_process: String(artist.creative_process?.songwriting_process || ""),
//       production_process: String(artist.creative_process?.production_process || ""),
//       creative_rituals: artist.creative_process?.creative_rituals ? String(artist.creative_process.creative_rituals) : undefined
//     },
//     availability: {
//       current_projects: Array.isArray(artist.availability?.current_projects)
//         ? artist.availability.current_projects.map(String)
//         : [],
//       looking_for: Array.isArray(artist.availability?.looking_for)
//         ? artist.availability.looking_for.map(String)
//         : []
//     },
//     online_presence: {
//       website: String(artist.online_presence?.website || ""),
//       social_media: Array.isArray(artist.online_presence?.social_media)
//         ? artist.online_presence.social_media.map(s => ({
//             platform: String(s.platform || ""),
//             url: String(s.url || ""),
//             followers: s.followers ? String(s.followers) : undefined
//           }))
//         : [],
//       streaming_platforms: Array.isArray(artist.online_presence?.streaming_platforms)
//         ? artist.online_presence.streaming_platforms.map(s => {
//             if (typeof s === "string") {
//               return { platform: s, url: "", stats: "" };
//             }
//             return {
//               platform: String(s.platform || ""),
//               url: String(s.url || ""),
//               stats: s.stats ? String(s.stats) : undefined
//             };
//           })
//         : []
//     },
//     commerce: artist.commerce ? String(artist.commerce) : undefined,
//     social_impact: artist.social_impact ? String(artist.social_impact) : undefined,
//     quotes: Array.isArray(artist.quotes) ? artist.quotes.map(String) : [],
//     fan_press_quotes: Array.isArray(artist.fan_press_quotes) ? artist.fan_press_quotes.map(String) : undefined,
//     classification: artist.classification ? String(artist.classification) : undefined,
//     lazie_indie_association: artist.lazie_indie_association ? String(artist.lazie_indie_association) : undefined,
//     long_narrative: artist.long_narrative ? String(artist.long_narrative) : undefined
//   };
// }

// /** === Call Gemini API === */
// export async function callGeminiForSchema(allText) {
//   const schemaPrompt = `
// You are a JSON API.
// Reply ONLY with valid minified JSON (no comments, no trailing commas) that matches EXACTLY this array schema:
// [ { ...artistSchema... } ]
// For 'streaming_platforms', ALWAYS return an array of objects with:
//   { "platform": "string", "url": "string", "stats": "string" }
// Never return plain strings for streaming_platforms.
// Do not return extra text.
// SCHEMA:
// ${JSON.stringify({
//   artistID: "string",
//   displayName: "string",
//   priceUSD: 0,
//   imageUrl: "",
//   vibeTags: [],
//   identity: {
//     realName: "",
//     aliases: [],
//     origin: "",
//     location: "",
//     languages: [],
//     gender: "",
//     birthYear: 0
//   },
//   artistic_background: {
//     roles: [],
//     genres: [],
//     influences: [],
//     skills: [],
//     signature_style: ""
//   },
//   career: {
//     education: "",
//     collaborations: [],
//     performances: [],
//     awards: [],
//     career_evolution: "",
//     years_active: ""
//   },
//   discography: [{ title: "", type: "", year: 0, label: "", details: "" }],
//   creative_process: {
//     songwriting_process: "",
//     production_process: "",
//     creative_rituals: ""
//   },
//   availability: {
//     current_projects: [],
//     looking_for: []
//   },
//   online_presence: {
//     website: "",
//     social_media: [{ platform: "", url: "", followers: "" }],
//     streaming_platforms: [{ platform: "", url: "", stats: "" }]
//   },
//   commerce: "",
//   social_impact: "",
//   quotes: [],
//   fan_press_quotes: [],
//   classification: "",
//   lazie_indie_association: "",
//   long_narrative: ""
// }, null, 2)}

// TEXT:
// ${allText}
// `;

//   const result = await model.generateContent(schemaPrompt);
//   const raw = result.response.text();
//   const parsed = safeJsonParse(raw);

//   // Apply schema coercion to ensure Convex compatibility
//   return parsed.map(coerceToSchema);
// }




// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize the Gemini API
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEYOLD);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Schema validation setup (using Zod as an example)
// import { z as v } from "zod";

// const artistSchema = v.object({
//   artistID: v.string(),
//   displayName: v.string(),
//   priceUSD: v.number(),
//   imageUrl: v.optional(v.string()),
//   vibeTags: v.optional(v.array(v.string())),
//   identity: v.object({
//     realName: v.string(),
//     aliases: v.array(v.string()),
//     origin: v.string(),
//     location: v.string(),
//     languages: v.array(v.string()),
//     gender: v.optional(v.string()),
//     birthYear: v.optional(v.number()),
//   }),
//   artistic_background: v.object({
//     roles: v.array(v.string()),
//     genres: v.array(v.string()),
//     influences: v.array(v.string()),
//     skills: v.array(v.string()),
//     signature_style: v.optional(v.string()),
//   }),
//   career: v.object({
//     education: v.string(),
//     collaborations: v.array(v.string()),
//     performances: v.array(v.string()),
//     awards: v.array(v.string()),
//     career_evolution: v.optional(v.string()),
//     years_active: v.optional(v.string()),
//   }),
//   discography: v.array(
//     v.object({
//       title: v.string(),
//       type: v.string(),
//       year: v.number(),
//       label: v.string(),
//       details: v.string(),
//     })
//   ),
//   creative_process: v.object({
//     songwriting_process: v.string(),
//     production_process: v.string(),
//     creative_rituals: v.optional(v.string()),
//   }),
//   availability: v.object({
//     current_projects: v.array(v.string()),
//     looking_for: v.array(v.string()),
//   }),
//   online_presence: v.object({
//     website: v.string(),
//     social_media: v.array(
//       v.object({
//         platform: v.string(),
//         url: v.string(),
//         followers: v.optional(v.string()),
//       })
//     ),
//     streaming_platforms: v.array(
//       v.object({
//         platform: v.string(),
//         url: v.string(),
//         stats: v.optional(v.string()),
//       })
//     ),
//   }),
//   commerce: v.optional(v.string()),
//   social_impact: v.optional(v.string()),
//   quotes: v.array(v.string()),
//   fan_press_quotes: v.optional(v.array(v.string())),
//   classification: v.optional(v.string()),
//   lazie_indie_association: v.optional(v.string()),
//   long_narrative: v.optional(v.string()),
// });

// // Function to validate an artist object against the schema
// function validateArtist(artist) {
//   try {
//     artistSchema.parse(artist);
//     return true;
//   } catch (e) {
//     console.warn("Artist validation failed:", e.errors);
//     return false;
//   }
// }

// // Coerce function to ensure data matches schema
// function coerceToSchema(artist) {
//   return {
//     artistID: String(artist.artistID || artist.identity?.realName || "")
//       .trim()
//       .toLowerCase()
//       .replace(/\s+/g, "_")
//       .replace(/[^a-z0-9_]/g, ""),
//     displayName: String(artist.displayName || artist.identity?.realName || ""),
//     priceUSD: Number(artist.priceUSD || 0),
//     imageUrl: artist.imageUrl || "",
//     vibeTags: Array.isArray(artist.vibeTags) ? artist.vibeTags.map(String) : [],
//     identity: {
//       realName: String(artist.identity?.realName || ""),
//       aliases: Array.isArray(artist.identity?.aliases) ? artist.identity.aliases.map(String) : [],
//       origin: String(artist.identity?.origin || ""),
//       location: String(artist.identity?.location || ""),
//       languages: Array.isArray(artist.identity?.languages) ? artist.identity.languages.map(String) : [],
//       gender: artist.identity?.gender ? String(artist.identity.gender) : undefined,
//       birthYear: artist.identity?.birthYear ? Number(artist.identity.birthYear) : undefined
//     },
//     artistic_background: {
//       roles: Array.isArray(artist.artistic_background?.roles) ? artist.artistic_background.roles.map(String) : [],
//       genres: Array.isArray(artist.artistic_background?.genres) ? artist.artistic_background.genres.map(String) : [],
//       influences: Array.isArray(artist.artistic_background?.influences) ? artist.artistic_background.influences.map(String) : [],
//       skills: Array.isArray(artist.artistic_background?.skills) ? artist.artistic_background.skills.map(String) : [],
//       signature_style: artist.artistic_background?.signature_style ? String(artist.artistic_background.signature_style) : undefined
//     },
//     career: {
//       education: String(artist.career?.education || ""),
//       collaborations: Array.isArray(artist.career?.collaborations) ? artist.career.collaborations.map(String) : [],
//       performances: Array.isArray(artist.career?.performances) ? artist.career.performances.map(String) : [],
//       awards: Array.isArray(artist.career?.awards) ? artist.career.awards.map(String) : [],
//       career_evolution: artist.career?.career_evolution ? String(artist.career.career_evolution) : undefined,
//       years_active: artist.career?.years_active ? String(artist.career.years_active) : undefined,
//     },
//     discography: Array.isArray(artist.discography)
//       ? artist.discography.map(d => ({
//           title: String(d.title || ""),
//           type: String(d.type || ""),
//           year: Number(d.year || 0),
//           label: String(d.label || ""),
//           details: String(d.details || "")
//         }))
//       : [],
//     creative_process: {
//       songwriting_process: String(artist.creative_process?.songwriting_process || ""),
//       production_process: String(artist.creative_process?.production_process || ""),
//       creative_rituals: artist.creative_process?.creative_rituals ? String(artist.creative_process.creative_rituals) : undefined
//     },
//     availability: {
//       current_projects: Array.isArray(artist.availability?.current_projects)
//         ? artist.availability.current_projects.map(String)
//         : [],
//       looking_for: Array.isArray(artist.availability?.looking_for)
//         ? artist.availability.looking_for.map(String)
//         : []
//     },
//     online_presence: {
//       website: String(artist.online_presence?.website || ""),
//       social_media: Array.isArray(artist.online_presence?.social_media)
//         ? artist.online_presence.social_media.map(s => ({
//             platform: String(s.platform || ""),
//             url: String(s.url || ""),
//             followers: s.followers ? String(s.followers) : undefined
//           }))
//         : [],
//       streaming_platforms: Array.isArray(artist.online_presence?.streaming_platforms)
//         ? artist.online_presence.streaming_platforms.map(s => {
//             if (typeof s === "string") {
//               return { platform: s, url: "", stats: undefined };
//             }
//             return {
//               platform: String(s.platform || ""),
//               url: String(s.url || ""),
//               stats: s.stats ? String(s.stats) : undefined
//             };
//           })
//         : []
//     },
//     commerce: artist.commerce ? String(artist.commerce) : undefined,
//     social_impact: artist.social_impact ? String(artist.social_impact) : undefined,
//     quotes: Array.isArray(artist.quotes) ? artist.quotes.map(String) : [],
//     fan_press_quotes: Array.isArray(artist.fan_press_quotes) ? artist.fan_press_quotes.map(String) : undefined,
//     classification: artist.classification ? String(artist.classification) : undefined,
//     lazie_indie_association: artist.lazie_indie_association ? String(artist.lazie_indie_association) : undefined,
//     long_narrative: artist.long_narrative ? String(artist.long_narrative) : undefined
//   };
// }

// function extractJsonFromRaw(raw) {
//   const start = raw.indexOf('[');
//   const end = raw.lastIndexOf(']');
//   if (start === -1 || end === -1 || end <= start) {
//     throw new Error("No valid JSON array found");
//   }
//   return raw.substring(start, end + 1);
// }

// export async function callGeminiForSchema(allText) {
//   const schemaPrompt = `
// You are an expert data extraction system that processes information about musical artists and returns structured data in JSON format.

// Please analyze the following text and extract information about musical artists, returning an array of artist objects that strictly conform to this schema:

// {
//   "artistID": "unique_id_for_artist",
//   "displayName": "Artist Name",
//   "priceUSD": 1000,
//   "imageUrl": "optional_image_url",
//   "vibeTags": ["optional", "descriptive", "tags"],
//   "identity": {
//     "realName": "Full Real Name",
//     "aliases": ["Other", "Names"],
//     "origin": "Place of origin",
//     "location": "Current location",
//     "languages": ["Language1", "Language2"],
//     "gender": "optional",
//     "birthYear": 1990
//   },
//   "artistic_background": {
//     "roles": ["Singer", "Songwriter"],
//     "genres": ["Pop", "R&B"],
//     "influences": ["Artist1", "Artist2"],
//     "skills": ["Vocals", "Guitar"],
//     "signature_style": "optional description"
//   },
//   "career": {
//     "education": "Music education",
//     "collaborations": ["Artist1", "Artist2"],
//     "performances": ["Event1", "Event2"],
//     "awards": ["Award1", "Award2"],
//     "career_evolution": "optional description",
//     "years_active": "optional description"
//   },
//   "discography": [{
//     "title": "Album Name",
//     "type": "Album/Single/EP",
//     "year": 2020,
//     "label": "Record Label",
//     "details": "Additional details"
//   }],
//   "creative_process": {
//     "songwriting_process": "Description",
//     "production_process": "Description",
//     "creative_rituals": "optional"
//   },
//   "availability": {
//     "current_projects": ["Project1", "Project2"],
//     "looking_for": ["Collaborations", "Gigs"]
//   },
//   "online_presence": {
//     "website": "official_website",
//     "social_media": [{
//       "platform": "Instagram",
//       "url": "profile_url",
//       "followers": "optional"
//     }],
//     "streaming_platforms": [{
//       "platform": "Spotify",
//       "url": "profile_url",
//       "stats": "optional"
//     }]
//   },
//   "commerce": "optional_commerce_info",
//   "social_impact": "optional_social_impact",
//   "quotes": ["Quote1", "Quote2"],
//   "fan_press_quotes": ["optional", "quotes"],
//   "classification": "optional_classification",
//   "lazie_indie_association": "optional",
//   "long_narrative": "optional_long_description"
// }

// Rules:
// 1. Return ONLY valid JSON that matches this exact schema
// 2. If information is missing from the source text, use empty strings/arrays as appropriate
// 3. Generate reasonable values for required fields if they're not explicitly mentioned
// 4. For artistID, create a slug from the artist's name if not provided
// 5. Include all available information from the text
// 6. If multiple artists are described, return an array of artist objects

// TEXT TO PROCESS:
// ${allText}

// Return ONLY the JSON array, without any additional commentary or markdown formatting.`;

//   try {
//     const result = await model.generateContent(schemaPrompt);
//     const raw = await result.response.text();
    
//     let jsonStr;
//     try {
//       jsonStr = extractJsonFromRaw(raw);
//     } catch (err) {
//       console.error("Error extracting JSON substring:", err);
//       return [];
//     }

//     let parsed;
//     try {
//       parsed = JSON.parse(jsonStr);
//       if (!Array.isArray(parsed)) {
//         console.error("Expected an array of artists");
//         return [];
//       }
//     } catch (err) {
//       console.error("JSON parse error:", err);
//       return [];
//     }

//     // Coerce and validate before returning
//     return parsed
//       .map(coerceToSchema)
//       .filter(artist => validateArtist(artist));
      
//   } catch (err) {
//     console.error("Error calling Gemini API:", err);
//     return [];
//   }
// }



import { GoogleGenerativeAI } from "@google/generative-ai";
import JSON5 from "json5";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEYOLD);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


function extractJsonFromRaw(raw) {
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No valid JSON array found");
  }
  return raw.substring(start, end + 1);
}

/** === Safe JSON Parse with Cleanup & Schema Coercion === */
function safeJsonParse(raw) {
  try {
    // Remove markdown fences like ```json or ``` (case insensitive)
    raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

    // Extract JSON array substring only (to avoid any extra text)
    raw = extractJsonFromRaw(raw);

    // Find first { or [ to trim any preceding chars
    const firstBracket = Math.min(
      raw.indexOf("{") >= 0 ? raw.indexOf("{") : Infinity,
      raw.indexOf("[") >= 0 ? raw.indexOf("[") : Infinity
    );
    if (firstBracket !== Infinity) {
      raw = raw.slice(firstBracket);
    }

    // Remove leading commas or empty array artifacts
    raw = raw.replace(/^,/, "").replace(/^\[\s*\],?/, "");

    // Remove trailing commas before } or ]
    raw = raw.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

    // Unescape double encoded JSON strings if any
    if ((raw.startsWith('"') && raw.endsWith('"')) || raw.includes('\\"')) {
      raw = raw.replace(/\\"/g, '"').replace(/^"|"$/g, "");
    }

    // Parse with JSON5 (allows comments, trailing commas, etc.)
    let parsed = JSON5.parse(raw);

    // If parsing gives a string containing JSON, parse again
    if (typeof parsed === "string" && (parsed.trim().startsWith("{") || parsed.trim().startsWith("["))) {
      parsed = JSON5.parse(parsed);
    }

    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (err) {
    console.error("❌ JSON repair failed:", err.message);
    console.log("🔍 Gemini raw output before fail:\n", raw);

    // Fallback: try minimal repair and parse again
    try {
      const repaired = raw
        .replace(/,\s*([}\]])/g, "$1") // remove trailing commas
        .replace(/[\u0000-\u001F]+/g, ""); // remove control chars
      return JSON5.parse(repaired);
    } catch {
      return [];
    }
  }
}




/** === Schema Coercion === */
function coerceToSchema(artist) {
  return {
    artistID: String(artist.artistID || artist.identity?.realName || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, ""),
    displayName: String(artist.displayName || artist.identity?.realName || ""),
    priceUSD: Number(artist.priceUSD || 0),
    imageUrl: artist.imageUrl || "",
    vibeTags: Array.isArray(artist.vibeTags) ? artist.vibeTags.map(String) : "",
    identity: {
      realName: String(artist.identity?.realName || ""),
      aliases: Array.isArray(artist.identity?.aliases) ? artist.identity.aliases.map(String) : [],
      origin: String(artist.identity?.origin || ""),
      location: String(artist.identity?.location || ""),
      languages: Array.isArray(artist.identity?.languages) ? artist.identity.languages.map(String) : [],
      gender: artist.identity?.gender ? String(artist.identity.gender) : "",
      birthYear: artist.identity?.birthYear ? Number(artist.identity.birthYear) : 0
    },
    artistic_background: {
      roles: Array.isArray(artist.artistic_background?.roles) ? artist.artistic_background.roles.map(String) : [],
      genres: Array.isArray(artist.artistic_background?.genres) ? artist.artistic_background.genres.map(String) : [],
      influences: Array.isArray(artist.artistic_background?.influences) ? artist.artistic_background.influences.map(String) : [],
      skills: Array.isArray(artist.artistic_background?.skills) ? artist.artistic_background.skills.map(String) : [],
      signature_style: artist.artistic_background?.signature_style ? String(artist.artistic_background.signature_style) : ""
    },
    career: {
      education: String(artist.career?.education || ""),
      collaborations: Array.isArray(artist.career?.collaborations) ? artist.career.collaborations.map(String) : [],
      performances: Array.isArray(artist.career?.performances) ? artist.career.performances.map(String) : [],
      awards: Array.isArray(artist.career?.awards) ? artist.career.awards.map(String) : [],
      career_evolution: artist.career?.career_evolution ? String(artist.career.career_evolution) : "",
      years_active: artist.career?.years_active ? String(artist.career.years_active) : ""
    },
    discography: Array.isArray(artist.discography)
      ? artist.discography.map(d => ({
          title: String(d.title || ""),
          type: String(d.type || ""),
          year: Number(d.year || 0),
          label: String(d.label || ""),
          details: String(d.details || "")
        }))
      : [],
    creative_process: {
      songwriting_process: String(artist.creative_process?.songwriting_process || ""),
      production_process: String(artist.creative_process?.production_process || ""),
      creative_rituals: artist.creative_process?.creative_rituals ? String(artist.creative_process.creative_rituals) : ""
    },
    availability: {
      current_projects: Array.isArray(artist.availability?.current_projects)
        ? artist.availability.current_projects.map(String)
        : [],
      looking_for: Array.isArray(artist.availability?.looking_for)
        ? artist.availability.looking_for.map(String)
        : []
    },
    online_presence: {
      website: String(artist.online_presence?.website || ""),
      social_media: Array.isArray(artist.online_presence?.social_media)
        ? artist.online_presence.social_media.map(s => ({
            platform: String(s.platform || ""),
            url: String(s.url || ""),
            followers: s.followers ? String(s.followers) : ""
          }))
        : [],
      streaming_platforms: Array.isArray(artist.online_presence?.streaming_platforms)
        ? artist.online_presence.streaming_platforms.map(s => {
            if (typeof s === "string") {
              return { platform: s, url: "", stats: "" };
            }
            return {
              platform: String(s.platform || ""),
              url: String(s.url || ""),
              stats: s.stats ? String(s.stats) : ""
            };
          })
        : []
    },
    commerce: artist.commerce ? String(artist.commerce) : "",
    social_impact: artist.social_impact ? String(artist.social_impact) : "",
    quotes: Array.isArray(artist.quotes) ? artist.quotes.map(String) : [],
    fan_press_quotes: Array.isArray(artist.fan_press_quotes) ? artist.fan_press_quotes.map(String) : "",
    classification: artist.classification ? String(artist.classification) : "",
    lazie_indie_association: artist.lazie_indie_association ? String(artist.lazie_indie_association) : "",
    long_narrative: artist.long_narrative ? String(artist.long_narrative) : ""
  };
}

/** === Call Gemini API for MULTI-ARTIST extraction === */
export async function callGeminiForSchema(allText) {
  const schemaPrompt = `
You are a JSON API that extracts artist interview data.

Instructions:
- Extract ONLY artists with a FULL interview.
- A full interview includes:
  * Career details (education, performances, or awards present)
  * Artistic background includes genres AND influences
  * Creative process is described (songwriting and production details)
- Skip any artist without a full interview.

Output requirements:
- Respond ONLY with valid, strictly formatted JSON.
- Return a JSON array matching EXACTLY the schema below.
- Use snake_case for all keys, including "artistID".
- Escape all double quotes inside string values(eg: ""Crazy on the Outside"").
- Include ALL fields exactly as in the schema. If no data, use empty strings, empty arrays, or 0 for numbers.
- For "streaming_platforms", ALWAYS return an array of objects with keys:
  { "platform": "string", "url": "string", "stats": "string" }
- For "social_media", ALWAYS return an array of objects with keys:
  { "platform": "string", "url": "string", "followers": "string" }

Do NOT include any explanations, markdown, or extra text.

⚠ IMPORTANT: Use double quotes to enclose strings but replace any internal double quotes inside string values with single quotes ('). For example:

Correct: "She said, 'Hello!' and smiled."
Incorrect: "She said, \"Hello!\" and smiled."


SCHEMA (return EXACTLY this structure):

[
  {
    "artistID": "string",
    "displayName": "string",
    "priceUSD": 0,
    "imageUrl": "string",
    "vibeTags": ["string"],
    "identity": {
      "realName": "string",
      "aliases": ["string"],
      "origin": "string",
      "location": "string",
      "languages": ["string"],
      "gender": "string",
      "birthYear": 0
    },
    "artistic_background": {
      "roles": ["string"],
      "genres": ["string"],
      "influences": ["string"],
      "skills": ["string"],
      "signature_style": "string"
    },
    "career": {
      "education": "string",
      "collaborations": ["string"],
      "performances": ["string"],
      "awards": ["string"],
      "career_evolution": "string",
      "years_active": "string"
    },
    "discography": [
      {
        "title": "string",
        "type": "string",
        "year": 0,
        "label": "string",
        "details": "string"
      }
    ],
    "creative_process": {
      "songwriting_process": "string",
      "production_process": "string",
      "creative_rituals": "string"
    },
    "availability": {
      "current_projects": ["string"],
      "looking_for": ["string"]
    },
    "online_presence": {
      "website": "string",
      "social_media": [
        {
          "platform": "string",
          "url": "string",
          "followers": "string"
        }
      ],
      "streaming_platforms": [
        {
          "platform": "string",
          "url": "string",
          "stats": "string"
        }
      ]
    },
    "commerce": "string",
    "social_impact": "string",
    "quotes": ["string"],
    "fan_press_quotes": ["string"],
    "classification": "string",
    "lazie_indie_association": "string",
    "long_narrative": "string"
  }
]

TEXT TO PROCESS:
${allText}

`;

  const result = await model.generateContent(schemaPrompt);
  const raw = result.response.text();
 console.log(raw);
  
  const parsed = safeJsonParse(raw);
  
 
  

  // Apply schema coercion & filter incomplete artists
  return parsed
    .map(coerceToSchema)
    .filter(a =>
      a.identity.realName &&
      a.artistic_background.genres.length > 0 &&
      a.artistic_background.roles.length > 0 
    );
}