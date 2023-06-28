import { ChainNetwork } from "@app/types/blockchain.type";

export type NetworkState = {
  currentNetwork: {
    data: ChainNetwork;
    loading: boolean;
    error: unknown;
  };
};
