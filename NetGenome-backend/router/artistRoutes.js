import express from "express";
import {
  submitArtistRequest,
  getPendingRequests,
  approveRequest,
  rejectRequest,
  getRequestStatus,
  getAllArtistRequests
} from "../api/artistController.js";

const router = express.Router();

router.post("/request-artist", submitArtistRequest);
router.get("/requests", getPendingRequests);
router.post("/request/approve", approveRequest);
router.post("/request/reject", rejectRequest);
router.get("/request-status", getRequestStatus);
router.get("/artist-requests", getAllArtistRequests);


export default router;
