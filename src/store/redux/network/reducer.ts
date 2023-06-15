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
    builder.addCase(actions.setNetworkState.pending, state => {
      state.currentListTokens.loading = true;
    });
    builder.addCase(actions.setNetworkState.fulfilled, (state, action) => {
      state.currentListTokens.data = action.payload;
      state.currentListTokens.loading = false;
    });
    builder.addCase(actions.setNetworkState.rejected, state => {
      // state.currentListTokens.error = action.payload;
      state.currentListTokens.loading = false;
    });
  },
});

export default listNetwork.reducer;
