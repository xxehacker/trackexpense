import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: userInfoFromStorage,
  isAuthenticated: !!userInfoFromStorage, // Boolean to track authentication status
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to handle login
    loginAction(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // Action to handle logout
    logoutAction(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
