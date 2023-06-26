import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "./types";
export const setProfile = createAsyncThunk<any, Profile>("set/profile", async (profile: Profile, { fulfillWithValue }) => {
  return fulfillWithValue(profile);
});
