import { PreProcessHistoryResponse } from "../../../utils/history";
export type HistoryState = {
  getHistoriesAddress: {
    data: Array<PreProcessHistoryResponse>;
    loading: boolean;
    error: unknown;
  };
};
