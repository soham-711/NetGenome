import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// ✅ 1. Submit Artist Request
export const submitArtistRequest = async (req, res) => {
  const { userId, email } = req.body;
  
  try {
    await convex.mutation(api.submitArtistRequest.submitArtistRequest, { userId, email });
    res.status(200).json({ success: true, message: "Request submitted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ 3. Admin: Get Pending Requests
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await convex.query("artistRequests/listPending");
    res.status(200).json(requests);
  } catch {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

// ✅ 4. Admin: Approve Request
export const approveRequest = async (req, res) => {
  const { requestId } = req.body;
  try {
    await convex.mutation("handleArtistRequest", { requestId, action: "approve" });
    res.status(200).json({ message: "Request approved" });
  } catch {
    res.status(500).json({ error: "Approval failed" });
  }
};

// ✅ 5. Admin: Reject Request
export const rejectRequest = async (req, res) => {
  const { requestId } = req.body;
  try {
    await convex.mutation("handleArtistRequest", { requestId, action: "reject" });
    res.status(200).json({ message: "Request rejected" });
  } catch {
    res.status(500).json({ error: "Rejection failed" });
  }
};

// ✅ 6. Get User's Latest Request Status
export const getRequestStatus = async (req, res) => {
  const { userId } = req.query;
  try {
    const request = await convex.query("artistRequests/getLatestRequestByUser", { userId });
    res.status(200).json({ status: request?.status || null });
  } catch {
    res.status(500).json({ error: "Failed to fetch status" });
  }
};

export const getAllArtistRequests = async (req, res) => {
  try {
    const requests = await convex.query(api.submitArtistRequest.getAllArtistRequests);
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
