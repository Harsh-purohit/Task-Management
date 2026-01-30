import Projects from "../models/Projects.js";
import Tasks from "../models/Tasks.js";
import { logActivity } from "../utils/logActivity.js";
import mongoose from "mongoose";
import client from "../config/redisClient.js";

const createProject = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, description, status, userRef } = req.body;
    const adminRef = req.userId;

    if (!name || !description || !userRef) {
      return res
        .status(400)
        .json({ message: "Name, description, and userRef are required" });
    }

    const projects = await Projects.create({
      name,
      description,
      status,
      userRef,
      adminRef,
    });
    await projects.save();

    await logActivity({
      userId: req.userId,
      role: req.role,
      action: "created",
      entity: "project",
      entityId: projects._id,
      message: `Created project "${projects.name}"`,
    });

    // await client.RPUSH(`projects:`, JSON.stringify(projects));

    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getProject = async (req, res) => {
  try {
    // const cacheKey = `projects:`;

    // const cachedData = await client.get(cacheKey);
    // // console.log(cachedData);
    // if (cachedData) {
    //   return res.status(200).json(JSON.parse(cachedData));
    // }

    if (req.role === "admin") {
      const projects = await Projects.find({}).lean();

      // await client.set(cacheKey, JSON.stringify(projects), { EX: 180 });
      return res.status(200).json(projects);
    }

    // projects assigned to user by admin
    const ownedProjects = await Projects.find({ userRef: req.userId }).lean();

    // if a user is not assigned to project, then if (either he is assigned to task)
    // tasks assigned to user by admin
    // result = task -> projectID
    const tasks_projectID = await Tasks.find({ assignedTo: req.userId })
      .select("projectRef")
      .lean();

    // extract project ids
    // const projectIds = tasks.map((t) => t.projectRef);

    // projects where user has tasks -> means user assigned to task but not project
    const taskProjects = await Projects.find({
      _id: { $in: tasks_projectID },
    }).lean();

    // merge unique
    const allProjects = [
      ...ownedProjects,
      ...taskProjects.filter(
        (tp) => !ownedProjects.some((op) => op._id.equals(tp._id)),
      ),
    ];

    // await client.set(cacheKey, JSON.stringify(allProjects), { EX: 180 });

    return res.status(200).json(allProjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    // Fetch old project (for comparison)
    const existingProject = await Projects.findById(id)
      .select("name description status")
      .lean();

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    const oldData = {
      name: existingProject.name,
      description: existingProject.description,
      status: existingProject.status,
    };

    const { name, description, status } = req.body;
    const projects = await Projects.findByIdAndUpdate(
      id,
      { name, description, status },
      {
        new: true,
        runValidators: true,
        lean: true,
      },
    );
    if (!projects) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Detect changes
    const changes = [];
    const metadata = {};

    ["name", "description", "status"].forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== oldData[field]) {
        changes.push(`${field}: ${oldData[field]} → ${projects[field]}`);

        metadata[field] = {
          from: oldData[field],
          to: projects[field],
        };
      }
    });

    // 4️⃣ Activity log
    if (changes.length) {
      await logActivity({
        actorId: req.userId,
        actorModel: "Admin",
        role: "admin",
        action: "project-updated",
        entity: "project",
        entityId: projects._id,
        message: `Updated project "${projects.name}" (${changes.join(", ")})`,
        metadata,
      });
    }

    res.status(200).json(projects);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Server error" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    // 1️⃣ Get project info BEFORE delete (for logs)
    const project = await Projects.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const deletedTasks = await Tasks.deleteMany({ projectRef: id });
    // console.log(tasks);
    await Projects.findByIdAndDelete(id);

    // 4️⃣ Activity log
    await logActivity({
      actorId: req.userId,
      actorModel: "Admin",
      role: "admin",
      action: "project-deleted",
      entity: "project",
      entityId: id,
      message: `Deleted project "${project.name}" (${deletedTasks.deletedCount} tasks removed)`,
      metadata: {
        deletedTasks: deletedTasks.deletedCount,
      },
    });

    // await client.del(`projects:`, JSON.stringify(projects));

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export { createProject, getProject, updateProject, deleteProject };
