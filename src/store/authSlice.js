import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLogged = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;    
export default authSlice.reducer;
