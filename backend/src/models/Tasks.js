import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
  projectRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
    required: true,
  },

  // Reference to the User assigned to the task
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],

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
    // required: true,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
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
