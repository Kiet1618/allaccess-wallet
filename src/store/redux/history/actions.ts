import { createAsyncThunk } from "@reduxjs/toolkit";
import { PreProcessHistoryResponse } from "../../../utils/history";
export const setHistoriesAddress = createAsyncThunk<any, Array<PreProcessHistoryResponse>>("set/history_transaction", async (listHistory: object, { fulfillWithValue }) => {
  return fulfillWithValue(listHistory);
});
