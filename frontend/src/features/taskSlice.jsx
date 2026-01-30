import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  loading: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.loading = false;

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    startLoading: (state) => {
      state.loading = true;
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex((t) => t._id === action.payload._id);

      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    // clearTasks: (state) => {
    //   state.tasks = [];
    // },
  },
});

export const {
  setTasks,
  addTask,
  startLoading,
  updateTask,
  removeTask,
  // clearTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
