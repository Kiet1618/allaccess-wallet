import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { NetworkState } from "./types";

const initialState = {
  createAccount: {
    data: "",
    loading: false,
    error: {},
  },
  sendPhraseToEmail: {
    data: "",
    loading: false,
    error: {},
  },
} as NetworkState;

export const wallet = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.createAccount.pending, state => {
      state.createAccount.loading = true;
    });
    builder.addCase(actions.createAccount.fulfilled, (state, action) => {
      state.createAccount.data = action.payload;
      state.createAccount.loading = false;
    });
    builder.addCase(actions.createAccount.rejected, state => {
      state.createAccount.loading = false;
    });

    builder.addCase(actions.sendPhraseToEmail.pending, state => {
      state.sendPhraseToEmail.loading = true;
    });
    builder.addCase(actions.sendPhraseToEmail.fulfilled, state => {
      state.sendPhraseToEmail.loading = false;
    });
    builder.addCase(actions.sendPhraseToEmail.rejected, state => {
      state.sendPhraseToEmail.loading = false;
    });
  },
});

export default wallet.reducer;
