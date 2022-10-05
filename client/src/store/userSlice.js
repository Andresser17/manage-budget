import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refresh(state, action) {
      state.refresh = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { refresh } = userSlice.actions;

export default userSlice.reducer;
