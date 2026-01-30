import express from "express";
import mongoose from "mongoose";
import { adminAuth, bothAuth } from "../middleware/checkAuth.js";
import Tasks from "../models/Tasks.js";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/User.js";
import { logActivity } from "../utils/logActivity.js";
import client from "../config/redisClient.js";
import {
  createTask,
  deleteTask,
  getTask,
  postComment,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", adminAuth, createTask);
router.post("/:id/comment", bothAuth, postComment);
router.get("/", bothAuth, getTask);
router.put("/:id", adminAuth, updateTask);
router.delete("/:id", adminAuth, deleteTask);

router.get("/:id", bothAuth, async (req, res) => {
  try {
    const { users, status, priority } = req.query;
    const { id } = req.params;

    const projectId = new mongoose.Types.ObjectId(id);

    let filter = {
      projectRef: projectId,
    };

    // =========================
    // USER LOGIC
    // =========================
    if (req.role === "user") {
      // first try: tasks assigned to user
      filter.assignedTo = new mongoose.Types.ObjectId(req.userId);

      if (status) filter.status = status;
      if (priority) filter.priority = priority;

      let tasks = await Tasks.find(filter);

      // 👇 fallback: if empty, show all project tasks
      if (tasks.length === 0) {
        delete filter.assignedTo;
        tasks = await Tasks.find(filter);
      }

      return res.status(200).json(tasks);
    }

    // =========================
    // ADMIN LOGIC (unchanged)
    // =========================
    if (users) {
      const userArray = Array.isArray(users) ? users : [users];

      filter.assignedTo = {
        $in: userArray.map((uid) => new mongoose.Types.ObjectId(uid)),
      };
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Tasks.find(filter);

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id/comment", bothAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Tasks.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

export default router;
