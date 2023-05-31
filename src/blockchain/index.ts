import Web3 from "web3";
import { getToken } from "./token";
import { formatValue } from "./format";
import { getGasPrice } from "./blockchain";
import { getBalanceToken, getBalance } from "./balance";
import { sendTransaction, sendTransactionToken } from "./transfer";
import { privateKey } from "../configs/data/test";

export const useBlockchain = (rpcUrl: string) => {
  try {
    const web3 = new Web3(rpcUrl);
    const account = web3.eth.accounts.wallet.add(privateKey.padStart(64, "0"));
    web3.defaultAccount = account.address;
    return { web3, account, getGasPrice, getBalanceToken, getBalance, sendTransaction, sendTransactionToken, formatValue, getToken };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
export { getGasPrice, getBalanceToken, getBalance, sendTransaction, sendTransactionToken, formatValue, getToken };
