export type TransferNative = {
  addressTo: string;
  amount: number;
};

export type TransferToken = {
  addressTo: string;
  amount: number;
  tokenContract?: string;
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
  onHash?: (msg: string) => void;
  onInfo?: (msg: string) => void;
  onError?: (msg: string) => void;
  onSuccess?: (msg: string) => void;
};
