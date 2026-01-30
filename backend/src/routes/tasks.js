import express from "express";
import mongoose from "mongoose";
import { adminAuth, bothAuth } from "../middleware/checkAuth.js";
import Tasks from "../models/Tasks.js";
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

// all tasks
router.get("/", bothAuth, getTask);
router.put("/:id", adminAuth, updateTask);
router.delete("/:id", adminAuth, deleteTask);

// tasks specific to project
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

      let tasks = await Tasks.find(filter).lean();

      // 👇 fallback: if empty, show all project tasks
      if (tasks.length === 0) {
        delete filter.assignedTo;
        tasks = await Tasks.find(filter).lean();
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

    const tasks = await Tasks.find(filter).lean();

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

    const comments = await Tasks.findById(id)
      .select("comments")
      .sort({ commentedAt: -1 })
      .lean();
    // if (!comments) {
    //   return res.status(404).json({ message: "Task not found" });
    // }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

export default router;
