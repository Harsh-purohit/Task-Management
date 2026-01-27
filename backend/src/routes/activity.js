import express from "express";
import { bothAuth } from "../middleware/checkAuth.js";
import ActivityLog from "../models/ActivityLog.js";

const router = express.Router();

router.get("/:entityId", bothAuth, async (req, res) => {
  const logs = await ActivityLog.find({
    entityId: req.params.entityId,
  })
    .populate("actor", "name role")
    .sort({ createdAt: -1 });

  res.json(logs);
});

export default router;
