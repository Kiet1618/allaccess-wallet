import { ChainNetwork } from "./type";
export const listNetWorks: ChainNetwork[] = [
  {
    chainID: "1",
    apiScan: `https://api.etherscan.io/api?module=account&action=txlist&address={address}&sort=asc&apikey=6YA3MRG422USB7DWGGQTWHDZTUG248ZKJ5`,
    rpcUrls: "https://eth.llamarpc.com",
    title: "ETH",
    description: "Ethereum Mainnet",
  },
  {
    chainID: "5",
    apiScan: `https://api-goerli.etherscan.io/api?module=account&action=txlist&address={address}&sort=asc&apikey=6YA3MRG422USB7DWGGQTWHDZTUG248ZKJ5`,
    rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
    title: "ETH",
    description: "Goerli Testnet",
  },
  {
    chainID: "56",
    apiScan: "https://api.bscscan.com/api?module=account&action=txlist&address={address}&sort=asc&apikey=I1JJ6MQZRU7BG9WNH1FU69M3T377FIC4JW",
    rpcUrls: "https://bsc-dataseed1.binance.org",
    title: "BNB",
    description: "Binance Smart Chain Mainnet",
  },
];
