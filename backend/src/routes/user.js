import express from "express";
import User from "../models/User.js";
import { userAuth } from "../middleware/checkAuth.js";
import mongoose from "mongoose";

const router = express.Router();

router.patch("/updateprofile/:id", userAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (req.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const update = {};

    if (req.body.name !== undefined) {
      update.name = req.body.name;
    }

    if (req.body.email !== undefined) {
      update.email = req.body.email;
    }

    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json({ message: "At least one field is required" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      { $set: update },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
