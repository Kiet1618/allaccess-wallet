import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { NetworkState } from "./types";
import { listNetWorks } from "@app/configs/data";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const getCurrentNetworkInitiated = () => {
  const chainId = cookies.get("chainId") || "";
  if (chainId) {
    return listNetWorks.find(network => network.chainID === chainId);
  } else {
    return listNetWorks.find(network => network.chainID === "5");
  }
};

const initialState = {
  currentNetwork: {
    data: getCurrentNetworkInitiated(),
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
      cookies.set("chainId", listNetWorks.find(network => network === action.payload)?.chainID, { path: "/" });
      state.currentNetwork.loading = false;
    });
    builder.addCase(actions.setNetworkState.rejected, state => {
      // state.currentNetwork.error = action.payload;
      state.currentNetwork.loading = false;
    });
  },
});

export default listNetwork.reducer;
