export type TransferNative = {
  recipient: string;
  amount: string;
};

export type TransferToken = {
  recipient: string;
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

export type GetToken = {
  tokenContract: string;
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
