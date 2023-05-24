import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { NetworkState } from "./types";

const initialState = {
  currentListTokens: {
    data: "https://goerli.blockpi.network/v1/rpc/public",
    loading: false,
    error: {},
  },
} as NetworkState;

export const listNetwork = createSlice({
  name: "listNetwork",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.setCurrentListTokens.pending, state => {
      state.currentListTokens.loading = true;
    });
    builder.addCase(actions.setCurrentListTokens.fulfilled, (state, action) => {
      state.currentListTokens.data = action.payload;
      state.currentListTokens.loading = false;
    });
    builder.addCase(actions.setCurrentListTokens.rejected, (state, action) => {
      // state.currentListTokens.error = action.payload;
      state.currentListTokens.loading = false;
    });
  },
});

export default listNetwork.reducer;
