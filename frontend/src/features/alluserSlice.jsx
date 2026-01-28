import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allusers: [],
};

const userInfoSlice = createSlice({
  name: "allusers",
  initialState,
  reducers: {
    setAllusers: (state, action) => {
      state.allusers = action.payload;
      // console.log("from slice", state.allusers);
    },

    softDeleteUser: (state, action) => {
      state.allusers = state.allusers.filter(
        (user) => user._id !== action.payload,
      );
    },
  },
});

export const { setAllusers, softDeleteUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
