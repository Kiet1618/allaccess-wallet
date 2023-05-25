export type ChainNetwork = {
  chainID: string;
  apiScan: string;
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
  chainId: string;
  img: string;
  symbol: string;
  name: string;
  tokenContract?: string;
};
