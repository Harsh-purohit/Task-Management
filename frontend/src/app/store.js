import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import loginSlice from "../features/loginSlice";
import userInfoSlice from "../features/userInfoSlice";
import projectSlice from "../features/projectSlice";
import allusers from "../features/alluserSlice";
import tasksReducer from "../features/taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginSlice,
    userInfo: userInfoSlice,
    projects: projectSlice,
    allusers: allusers,
    tasks: tasksReducer,
  },
});

export default store;
