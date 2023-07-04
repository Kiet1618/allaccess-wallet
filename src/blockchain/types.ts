export type TransferNative = {
  addressTo: string;
  amount: string;
};

export type TransferToken = {
  addressTo: string;
  amount: string;
  tokenContract: string;
};

export type GetBalanceToken = {
  tokenContract: string;
};

export type GetGasTransaction = {
  addressTo: string;
  amount: string;
  tokenContract?: string;
  // type: "transfer_native" | "transfer_token";
};

export type Callbacks = {
  onHash: (_: string) => void;
  onError: (_: string) => void;
  onSuccess: (_: string) => void;
};

export const DefaultCallbacks = {
  onHash: (_: string) => {
    return;
  },
  onError: (_: string) => {
    return;
  },
  onSuccess: (_: string) => {
    return;
  },
};
