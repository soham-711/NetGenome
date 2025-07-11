import express from "express";
import dotenv from "dotenv";
import  onboardingFunc  from "../api/onboarding.js";
dotenv.config();
const router = express.Router();

router.post("/",onboardingFunc)


export default router;