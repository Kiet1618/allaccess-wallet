type ChainCore = "evm" | "fvm";
export type ChainNetwork = {
  chainID: string;
  core: ChainCore;
  apiScanNormalTransactionsByAddress: string;
  apiScanTokenTransactionsByAddress: string;
  rpcUrls: string;
  title: string;
  description: string;
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
};
