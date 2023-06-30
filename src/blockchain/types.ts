export type TransferNative = {
  addressTo: string;
  amount: number;
};

export type TransferToken = {
  addressTo: string;
  amount: number;
  tokenContract?: string;
};

export type Callbacks = {
  onHash?: (msg: string) => void;
  onInfo?: (msg: string) => void;
  onError?: (msg: string) => void;
  onSuccess?: (msg: string) => void;
};
