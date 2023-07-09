import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";
// import { Token } from "../../../types/blockchain.type";
import { ListTokenState } from "./types";
// import { getListTokens } from "../../../storage/storage-service";
import { listTokens } from "../../../configs/data";

const dataTokensList = () => {
  // if (getListTokens() !== null) {
  //   const data: Token[] = getListTokens();
  //   return data;
  // }
  return listTokens;
};
const initialState = {
  currentListTokens: {
    data: dataTokensList(),
    loading: false,
    error: {},
  },
} as ListTokenState;

export const listToken = createSlice({
  name: "listToken",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.setCurrentListTokens.pending, state => {
      state.currentListTokens.loading = true;
    });
    builder.addCase(actions.setCurrentListTokens.fulfilled, (state, action) => {
      state.currentListTokens.data = [...state.currentListTokens.data, action.payload];
      state.currentListTokens.loading = false;
      localStorage.setItem("currentListTokens", JSON.stringify(state.currentListTokens.data)); // Save array to local storage
    });
    builder.addCase(actions.setCurrentListTokens.rejected, (state, action) => {
      state.currentListTokens.error = action.payload;
      state.currentListTokens.loading = false;
    });
  },
});

export default listToken.reducer;
