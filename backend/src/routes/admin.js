import express from "express";
import { adminAuth } from "../middleware/checkAuth.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/allusers", adminAuth, async (req, res) => {
  try {
    const result = await User.find({});

    console.log("Fetched Users:", result);

    res.status(200).json({ users: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
