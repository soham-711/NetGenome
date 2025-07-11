import express from "express";
import matchRouter from "../api/match.js";

const router = express.Router();
router.use("/match", matchRouter);
export default router;
