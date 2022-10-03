import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state) {
      state.isSignedIn = true;
    },
    signOut(state) {
      state.isSignedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
