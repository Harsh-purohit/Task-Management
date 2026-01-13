import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
  // Reference to the User assigned to the task
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Reference to the Admin who created the task
  adminRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  title: {
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
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  comments: [
    {
      commenter: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Admin",
        },
      ],
      comment: {
        type: String,
      },
      commentedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Tasks = mongoose.model("Tasks", tasksSchema);

export default Tasks;
