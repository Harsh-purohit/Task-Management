import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allusers: JSON.parse(localStorage.getItem("allusers")) || [],
};

const userInfoSlice = createSlice({
  name: "allusers",
  initialState,
  reducers: {
    setAllusers: (state, action) => {
      // console.log("from slice", action.payload);

      state.allusers = action.payload;
      localStorage.setItem("allusers", JSON.stringify(state.allusers));
    },

    softDeleteUser: (state, action) => {
      state.allusers = state.allusers.filter(
        (user) => user._id !== action.payload,
      );
      // console.log("soft delete user: ", state.allusers);
    },

    clearAllUser: (state) => {
      state.allusers = [];
      localStorage.removeItem("allusers");
    },
  },
});

export const { setAllusers, softDeleteUser, clearAllUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
