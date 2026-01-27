import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or Admin if you have separate model
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      default: "Todo",
    },
    priority: {
      type: String,
      default: "Low",
    },
    endDate: Date,

    // ✅ NEW
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // ✅ NEW
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [commentSchema],

    projectRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Tasks", taskSchema);
