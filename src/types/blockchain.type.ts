type ChainCore = "evm" | "fvm";
export type ChainID = "1" | "5" | "9" | "56" | "97" | "flow-testnet";
export type ChainNetwork = {
  chainID: ChainID;
  core: ChainCore;
  apiScanNormalTransactionsByAddress: string;
  apiScanTokenTransactionsByAddress: string;
  rpcUrls: string;
  title: string;
  description: string;
  apiTransactionHash?: string;
};
export type Route = {
  path: string;
  breadcrumbName: string;
  layout: boolean;
};

export type Token = {
  rpcUrls: string;
  img: string;
  symbol: string;
  name: string;
  tokenContract?: string;
  chainID: ChainID;
};
