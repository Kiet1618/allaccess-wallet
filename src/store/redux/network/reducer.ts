import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { NetworkState } from "./types";

const initialState = {
  currentNetwork: {
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
      state.currentNetwork.loading = true;
    });
    builder.addCase(actions.setNetworkState.fulfilled, (state, action) => {
      state.currentNetwork.data = action.payload;
      state.currentNetwork.loading = false;
    });
    builder.addCase(actions.setNetworkState.rejected, (state, action) => {
      // state.currentNetwork.error = action.payload;
      state.currentNetwork.loading = false;
    });
  },
});

export default listNetwork.reducer;
