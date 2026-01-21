import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import loginSlice from "../features/loginSlice";
// import taskReducer from "../features/tasks/taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginSlice,
    // tasks: taskReducer,
  },
});

export default store;