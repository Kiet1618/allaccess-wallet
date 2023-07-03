import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { ProfileState } from "./types";
import { getProfileInfo } from "@app/storage/storage-service";
const initialState = {
  profileInfo: {
    data: getProfileInfo(),
    loading: false,
    error: {},
  },
} as ProfileState;

export const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.setProfile.pending, state => {
      state.profileInfo.loading = true;
    });
    builder.addCase(actions.setProfile.fulfilled, (state, action) => {
      state.profileInfo.data = action.payload;
      sessionStorage.setItem("profileInfo", JSON.stringify(state.profileInfo.data)); // Save array to local storage

      state.profileInfo.loading = false;
    });
    builder.addCase(actions.setProfile.rejected, (state, action) => {
      state.profileInfo.error = action.payload;
      state.profileInfo.loading = false;
    });
  },
});

export default profile.reducer;
