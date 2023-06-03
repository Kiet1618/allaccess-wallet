import { Token } from "../../types/blockchain.type";
import { BNBLogo, BUSDLogo, DAILogo, ETHLogo, OtherLogo, USDTLogo } from "../../assets/img";

export const listTokens: Token[] = [
  {
    rpcUrls: "https://eth.llamarpc.com",
    img: ETHLogo,
    symbol: "ETH",
    name: "Ethereum",
  },
  {
    rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
    img: ETHLogo,
    symbol: "ETH",
    name: "Ethereum",
  },
  {
    symbol: "USDT",
    rpcUrls: "https://eth.llamarpc.com",
    img: USDTLogo,
    name: "Tether",
    tokenContract: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  {
    rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
    img: OtherLogo,
    symbol: "TST",
    name: "Goerli Test Token",
    tokenContract: "0x7af963cF6D228E564e2A0aA0DdBF06210B38615D",
  },
  {
    rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
    img: DAILogo,
    symbol: "DAI",
    name: "DAI",
    tokenContract: "0xBa8DCeD3512925e52FE67b1b5329187589072A55",
  },
  {
    rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
    img: BUSDLogo,
    symbol: "BUSD",
    name: "BUSD",
    tokenContract: "0xa7c3Bf25FFeA8605B516Cf878B7435fe1768c89b",
  },
  {
    rpcUrls: "https://bsc-dataseed1.binance.org",
    img: BNBLogo,
    symbol: "BNB",
    name: "BNB",
  },
];
