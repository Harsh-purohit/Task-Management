import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
  // Reference to the Admin who created the project
  adminRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },

  // Reference to the User assigned to the project
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Todo", "In Progress", "Completed"],
    default: "Todo",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasks",
      required: true,
    },
  ],
});
const Projects = mongoose.model("Projects", projectsSchema);

export default Projects;
