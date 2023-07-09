import { createAsyncThunk } from "@reduxjs/toolkit";
import { preProcessHistoryResponse } from "../../../utils/history";
import { ChainNetwork, Token } from "@app/types/blockchain.type";
import { get } from "lodash";

export const getHistoriesAddress = createAsyncThunk<any, { network: ChainNetwork; address: string }>("set/histories_address", async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
  const { address, network } = payload;
  try {
    const state = getState();
    const listToken = get(state, "token.currentListTokens.data", []).filter((tokens: Token) => tokens.chainID === network.chainID && tokens.tokenContract !== undefined);
    const historyTransaction = await preProcessHistoryResponse(network, address, listToken);
    return fulfillWithValue(historyTransaction);
  } catch (error) {
    rejectWithValue([]);
  }
});
