export type NetworkState = {
  createAccount: {
    data: string;
    loading: boolean;
    error: unknown;
  };
  sendPhraseToEmail: {
    data: string;
    loading: boolean;
    error: unknown;
  };
};
