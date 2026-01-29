import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allusers: JSON.parse(localStorage.getItem("allusers")) || [],
};

const localStore = (users) => {
  localStorage.setItem("allusers", JSON.stringify(users));
};

const userInfoSlice = createSlice({
  name: "allusers",
  initialState,
  reducers: {
    setAllusers: (state, action) => {
      // console.log("from slice", action.payload);

      state.allusers = action.payload;
      localStore(state.allusers);
    },

    softDeleteUser: (state, action) => {
      let user = state.allusers.find((user) => user._id === action.payload);

      if (user) {
        user = action.payload;
      }
      localStore(state.allusers);
      // console.log("soft delete user: ", state.allusers);
    },

    clearAllUser: (state) => {
      state.allusers = [];
      localStorage.removeItem("allusers");
    },
  },
});

export const { setAllusers, softDeleteUser, clearAllUser } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
