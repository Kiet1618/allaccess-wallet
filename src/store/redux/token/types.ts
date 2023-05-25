import { Token } from "../../../types/blockchain.type";
export type ListTokenState = {
  currentListTokens: {
    data: Array<Token>;
    loading: boolean;
    error: unknown;
  };
};
