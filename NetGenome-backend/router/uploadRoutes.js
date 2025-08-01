import express from "express";
import multer from "multer";
import { uploadImageController } from "../api/uploadImageController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload-image", upload.single("image"), uploadImageController);

export default router;
