// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import onboardingRouter from "./api/onboarding.js";
import matchRoute from "./api/match.js";
import cartRoutes from "./api/cartRoutes.js";
import getPurchased from "./api/getPurchased.js";
import hasPurchased from "./api/hasPurchased.js";
import deletePurchased from "./api/deletePurchase.js";
import getArtist from "./api/findArtists.js";
import pdfParserRoute from "./api/uploadParser.js";
dotenv.config();
import unlock from "./api/unlock.js";
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174", // ✅ Add this
      "https://net-genome.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/onboarding", onboardingRouter);
app.use("/api/match", matchRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/unlock", unlock);
app.use("/api/purchased", getPurchased);
app.use("/api/hasPurchased", hasPurchased);
app.use("/api/deletePurchase", deletePurchased);
app.use("/api/artist", getArtist);
app.use("/api/upload-magazine", pdfParserRoute);
// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Music Collaboration Bot API is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 Onboarding API: http://localhost:${PORT}/api/onboarding`);
});

export default app;
