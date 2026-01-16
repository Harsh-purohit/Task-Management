import express from "express";
import { adminAuth } from "../middleware/checkAuth.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/allusers", adminAuth, async (req, res) => {
  try {
    const result = await User.find({isDeleted: false});

    // console.log("Fetched Users:", result);

    res.status(200).json({ users: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/deleteuser/:id", adminAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
