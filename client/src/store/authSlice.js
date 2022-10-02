import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state) {
      state.isLogged = true;
    },
    signOut(state) {
      state.isLogged = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
