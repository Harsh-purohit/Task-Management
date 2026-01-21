import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    showLogin: (state) => {
      state.mode = "login";
    },
    showRegister: (state) => {
      state.mode = "register";
    },
    hideLogin: (state) => {
      state.mode = null;
    },
  },
});

export const { showLogin, showRegister, hideLogin } = loginSlice.actions;
export default loginSlice.reducer;
