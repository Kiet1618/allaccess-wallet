import { ChainNetwork, Token } from "../../types/blockchain.type";
import axios from "axios";
import _, { get } from "lodash";
type HistoryResponseNormal = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  transactionIndex: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
};
type HistoryResponseERC20 = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  transactionIndex: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
};
export type PreProcessHistoryResponse = {
  id: number;
  timeStamp: string;
  method: "Approve";
  tokenSymbol: string;
  value: string;
  from: string;
  to: string;
  blockHash: string;
};
export const getHistoryTransaction = async (currentNetwork: ChainNetwork | undefined, myAddress: string) => {
  try {
    const urlRawNormalTransaction = currentNetwork?.apiScanNormalTransactionsByAddress as string;
    const urlNormalTransaction = urlRawNormalTransaction.replace("{address}", myAddress);
    const normalTransaction = await axios.get(urlNormalTransaction);
    const { data } = normalTransaction;
    const result: HistoryResponseNormal[] = get(data, "result", []);
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};
export const getHistoryTransactionToken = async (currentNetwork: ChainNetwork | undefined, myAddress: string, listToken: Token[]) => {
  try {
    const listHistory = await Promise.all(
      listToken.map(async token => {
        const urlRawTokenTransaction = currentNetwork?.apiScanTokenTransactionsByAddress as string;
        const urlTokenTransaction = urlRawTokenTransaction.replace("{address}", myAddress).replace("{contract}", token.tokenContract as string);
        const tokenTransaction = await axios.get(urlTokenTransaction);
        const { data } = tokenTransaction;
        return get(data, "result", []);
      })
    );
    const result: HistoryResponseERC20[] = listHistory.flat();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const preProcessHistoryResponse = async (currentNetwork: ChainNetwork | undefined, myAddress: string, listToken: Token[]) => {
  const historyResponseNormal = await getHistoryTransaction(currentNetwork, myAddress);
  const historyResponseERC20 = await getHistoryTransactionToken(currentNetwork, myAddress, listToken);
  try {
    let preProcessHistory: PreProcessHistoryResponse[] = [];
    let idCounter = 0;
    historyResponseNormal.forEach(item => {
      if (typeof item.from === "string") {
        const preProcessedItem: PreProcessHistoryResponse = {
          id: idCounter++,
          timeStamp: item.timeStamp,
          method: "Approve",
          tokenSymbol: currentNetwork?.title || "",
          value: item.value,
          from: item.from,
          to: item.to,
          blockHash: item.blockHash,
        };

        preProcessHistory.push(preProcessedItem);
      }
    });

    historyResponseERC20.forEach(item => {
      if (typeof item.from === "string") {
        const preProcessedItem: PreProcessHistoryResponse = {
          id: idCounter++,
          timeStamp: item.timeStamp,
          method: "Approve",
          tokenSymbol: item.tokenSymbol,
          value: item.value,
          from: item.from,
          to: item.to,
          blockHash: item.blockHash,
        };
        preProcessHistory.push(preProcessedItem);
      }
    });

    return preProcessHistory.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp));
  } catch (err) {
    console.error(err);
    return [];
  }
};
