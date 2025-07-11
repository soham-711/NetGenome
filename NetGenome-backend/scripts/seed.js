import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

dotenv.config();

// recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// point to shared JSON
const jsonPath = path.resolve(__dirname, "../shared/dummyArtists.json");
const dummyArtists = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

const client = new ConvexHttpClient(process.env.CONVEX_URL);

async function run() {
  console.log("🌱 Seeding artist data...");
  await client.mutation(api.seedArtists.seedArtists, {
    artists: dummyArtists
  });
  console.log("✅ Seed complete.");
}

run().catch(console.error);
