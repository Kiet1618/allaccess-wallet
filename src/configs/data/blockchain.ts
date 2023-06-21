import { ChainNetwork } from "../../types/blockchain.type";
export const listNetWorks: ChainNetwork[] = [
  {
    chainID: "1",
    apiScanNormalTransactionsByAddress: `https://api.etherscan.io/api?module=account&action=txlist&address={address}&sort=asc&apikey=6YA3MRG422USB7DWGGQTWHDZTUG248ZKJ5`,
    apiScanTokenTransactionsByAddress: `https://api-goerli.etherscan.io/api?module=account&action=tokentx&contractaddress={contract}&address={address}&sort=asc&apikey=6YA3MRG422USB7DWGGQTWHDZTUG248ZKJ5`,
    rpcUrls: "https://eth.llamarpc.com",
    title: "ETH",
    description: "Ethereum Mainnet",
  },
  {
    chainID: "5",
    apiScanNormalTransactionsByAddress: `https://api-goerli.etherscan.io/api?module=account&action=txlist&address={address}&sort=asc&apikey=6YA3MRG422USB7DWGGQTWHDZTUG248ZKJ5`,
    apiScanTokenTransactionsByAddress: `https://api-goerli.etherscan.io/api?module=account&action=tokentx&contractaddress={contract}&address={address}&startblock=0&endblock=99999999&sort=asc&apikey=6YA3MRG422USB7DWGGQTWHDZTUG248ZKJ5`,
    rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
    title: "ETH",
    description: "Goerli Testnet",
  },
  {
    chainID: "56",
    apiScanNormalTransactionsByAddress: "https://api.bscscan.com/api?module=account&action=txlist&address={address}&sort=asc&apikey=I1JJ6MQZRU7BG9WNH1FU69M3T377FIC4JW",
    apiScanTokenTransactionsByAddress: `
    https://api.bscscan.com/api
   ?module=account
   &action=tokentx
   &contractaddress={contract}
   &address={address}
   &page=1
   &offset=5
   &startblock=0
   &endblock=999999999
   &sort=asc
   &apikey=I1JJ6MQZRU7BG9WNH1FU69M3T377FIC4JW`,
    rpcUrls: "https://bsc-dataseed1.binance.org",
    title: "BNB",
    description: "Binance Smart Chain Mainnet",
  },
  {
    chainID: "97",
    apiScanNormalTransactionsByAddress: "https://api.bscscan.com/api?module=account&action=txlist&address={address}&sort=asc&apikey=I1JJ6MQZRU7BG9WNH1FU69M3T377FIC4JW",
    apiScanTokenTransactionsByAddress: `
    https://api.bscscan.com/api
   ?module=account
   &action=tokentx
   &contractaddress={contract}
   &address={address}
   &page=1
   &offset=5
   &startblock=0
   &endblock=999999999
   &sort=asc
   &apikey=I1JJ6MQZRU7BG9WNH1FU69M3T377FIC4JW`,
    rpcUrls: "https://bsc-testnet.publicnode.com",
    title: "BNB",
    description: "Binance Smart Chain Testnet",
  },
];

// export const myToken: Token[] = [
//   {
//     chainId: "5",
//     rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
//     name: "Ethereum",
//     symbol: "ETH",
//   },
//   {
//     chainId: "1",
//     rpcUrls: "https://eth.llamarpc.com",
//     name: "Ethereum",
//     symbol: "ETH",
//   },
//   {
//     chainId: "1",
//     rpcUrls: "https://eth.llamarpc.com",
//     name: "Dai Stablecoin",
//     symbol: "DAI",
//     tokenContract: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
//   },
//   {
//     chainId: "1",
//     rpcUrls: "https://eth.llamarpc.com",
//     name: "Tether",
//     symbol: "USDT",
//     tokenContract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
//   },
//   {
//     chainId: "1",
//     rpcUrls: "https://eth.llamarpc.com",
//     name: "Tether",
//     symbol: "USDT",
//     tokenContract: "0xe802376580c10fe23f027e1e19ed9d54d4c9311e",
//   },
//   {
//     chainId: "56",
//     rpcUrls: "https://api.bscscan.com/api?module=account&action=txlist&address={address}&sort=asc&apikey=I1JJ6MQZRU7BG9WNH1FU69M3T377FIC4JW",
//     name: "BNB",
//     symbol: "BNB",
//   },
// ];
