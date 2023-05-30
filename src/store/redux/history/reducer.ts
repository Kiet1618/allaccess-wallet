import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { HistoryState } from "./types";

const initialState = {
  getHistoriesAddress: {
    data: [],
    loading: false,
    error: {},
  },
} as HistoryState;

export const history = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.setHistoriesAddress.pending, state => {
      state.getHistoriesAddress.data = [];
      state.getHistoriesAddress.loading = true;
    });
    builder.addCase(actions.setHistoriesAddress.fulfilled, (state, action) => {
      state.getHistoriesAddress.data = action.payload;
      state.getHistoriesAddress.loading = false;
    });
    builder.addCase(actions.setHistoriesAddress.rejected, (state, action) => {
      state.getHistoriesAddress.data = [];
      state.getHistoriesAddress.error = action.payload;
      state.getHistoriesAddress.loading = false;
    });
  },
});
export default history.reducer;
