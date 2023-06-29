import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChainNetwork } from "@app/types/blockchain.type";

export const setNetworkState = createAsyncThunk<any, ChainNetwork>("set/set_current_network", async (listTokens: ChainNetwork, { fulfillWithValue }) => {
  return fulfillWithValue(listTokens);
});
