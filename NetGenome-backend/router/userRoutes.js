import express from "express";
import { createOrLoginUser,getUserProfile } from "../api/createNewUser.js";

const router = express.Router();

router.post("/create-or-login", createOrLoginUser);
router.post("/get-profile", getUserProfile);

export default router;
