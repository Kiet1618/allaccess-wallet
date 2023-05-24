import { createAsyncThunk } from "@reduxjs/toolkit";

export const setCurrentListTokens = createAsyncThunk<any, string>("set/current_list_tokens", async (listTokens: string, { fulfillWithValue }) => {
  return fulfillWithValue(listTokens);
});
