import { createAsyncThunk } from "@reduxjs/toolkit";

export const setNetworkState = createAsyncThunk<any, string>("set/set_current_network", async (listTokens: string, { fulfillWithValue }) => {
  return fulfillWithValue(listTokens);
});
