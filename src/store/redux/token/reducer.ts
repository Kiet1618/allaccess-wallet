import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { Token } from "../../../types/blockchain.type";
import { ListTokenState } from "./types";
import { BNBLogo, BUSDLogo, DAILogo, ETHLogo, OtherLogo, USDTLogo } from "../../../assets/img";

const initialState = {
  currentListTokens: {
    data: [
      {
        chainId: "1",
        rpcUrls: "https://eth.llamarpc.com",
        img: ETHLogo,
        symbol: "ETH",
        name: "Ethereum",
      },
      {
        chainId: "5",
        rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
        img: ETHLogo,
        symbol: "ETH",
        name: "Ethereum",
      },
      {
        chainId: "1",
        symbol: "USDT",
        rpcUrls: "https://eth.llamarpc.com",
        img: USDTLogo,
        name: "Tether",
        tokenContract: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      },
      {
        chainId: "5",
        rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
        img: OtherLogo,
        symbol: "TST",
        name: "Goerli Test Token",
        tokenContract: "0x7af963cF6D228E564e2A0aA0DdBF06210B38615D",
      },
      {
        chainId: "5",
        rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
        img: DAILogo,
        symbol: "DAI",
        name: "DAI",
        tokenContract: "0xBa8DCeD3512925e52FE67b1b5329187589072A55",
      },
      {
        chainId: "5",
        rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
        img: BUSDLogo,
        symbol: "BUSD",
        name: "BUSD",
        tokenContract: "0xa7c3Bf25FFeA8605B516Cf878B7435fe1768c89b",
      },
      {
        chainId: "56",
        rpcUrls: "https://bsc-dataseed1.binance.org",
        img: BNBLogo,
        symbol: "BNB",
        name: "BNB",
      },
    ],
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
      localStorage.setItem("currentListTokens", JSON.stringify(state.currentListTokens.data)); // Save to local storage
    });
    builder.addCase(actions.setCurrentListTokens.rejected, (state, action) => {
      state.currentListTokens.error = action.payload;
      state.currentListTokens.loading = false;
    });
  },
});

export default listToken.reducer;
