import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    },

    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.loading = false;
    },

    startLoading: (state) => {
      state.loading = true;
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex((t) => t._id === action.payload._id);

      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload);
    },

    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const {
  setTasks,
  addTask,
  startLoading,
  updateTask,
  removeTask,
  clearTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
