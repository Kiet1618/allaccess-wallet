import { useAppSelector } from "@app/store";
import { useEVMBlockchain } from "./evm";
import { useFlowBlockchain } from "./flow";
import { isEmpty } from "lodash";
import { Callbacks, DefaultCallbacks, GetBalanceToken, GetGasTransaction, TransferNative, TransferToken } from "./types";
// interface Blockchain {
//   getBalance: () => number;
//   transferNative: () => number;
// }
// interface Callbacks {
//   onError: (msg: string) => void;
// }
const useBlockchain = () => {
  const networkState = useAppSelector(state => state.network);

  const {
    web3,
    account: evmAccount,
    transfer: evmTransfer,
    transferToken: evmTransferToken,
    getBalance: evmGetBalance,
    getBalanceToken: evmGetBalanceToken,
    getGasPrice: evmGetGasPrice,
    getGasLimit: evmGetGasLimit,
  } = useEVMBlockchain();
  const {
    account: fvmAccount,
    transfer: fvmTransfer,
    transferToken: fvmTransferToken,
    getBalance: fvmGetBalance,
    getBalanceToken: fvmGetBalanceToken,
    getGasPrice: fvmGetGasPrice,
    getGasLimit: fvmGetGasLimit,
  } = useFlowBlockchain();

  const getBalance = async () => {
    if (isEmpty(networkState.currentNetwork.data)) return "0";
    const { core } = networkState.currentNetwork.data;
    if (core === "evm" && web3) {
      return evmGetBalance(web3);
    }
    if (core === "fvm") {
      return fvmGetBalance();
    }
    return "0";
  };

  const getBalanceToken = async (data: GetBalanceToken) => {
    if (isEmpty(networkState.currentNetwork.data)) return "0";
    const { core } = networkState.currentNetwork.data;
    if (core === "evm" && web3) {
      return evmGetBalanceToken(web3, data.tokenContract);
    }
    if (core === "fvm") {
      return fvmGetBalanceToken();
    }
    return "0";
  };

  const getAccount = (): string => {
    if (isEmpty(networkState.currentNetwork.data)) return "";
    const { core } = networkState.currentNetwork.data;
    if (core === "evm") {
      return evmAccount;
    }
    if (core === "fvm") {
      return fvmAccount;
    }
    return "";
  };

  const getAccountByCore = (core: string): string => {
    if (core === "evm") {
      return evmAccount;
    }
    if (core === "fvm") {
      return fvmAccount;
    }
    return "";
  };

  const transfer = async (data: TransferNative, cb: Callbacks = DefaultCallbacks) => {
    if (isEmpty(networkState.currentNetwork.data)) return;
    const { core } = networkState.currentNetwork.data;
    if (core === "evm") {
      return evmTransfer(web3!, data, cb);
    }
    if (core === "fvm") {
      return fvmTransfer(data, cb);
    }
    return "";
  };

  const transferToken = async (data: TransferToken, cb: Callbacks) => {
    if (isEmpty(networkState.currentNetwork.data)) return;
    const { core } = networkState.currentNetwork.data;
    if (core === "evm") {
      return evmTransferToken(web3!, data, cb);
    }
    if (core === "fvm") {
      return fvmTransferToken(data, cb);
    }
    return "";
  };

  const getGasPrice = async () => {
    if (isEmpty(networkState.currentNetwork.data)) return "0";
    const { core } = networkState.currentNetwork.data;
    if (core === "evm") {
      return evmGetGasPrice(web3!);
    }
    if (core === "fvm") {
      return fvmGetGasPrice();
    }
    return "0";
  };

  const getGasLimit = async (data: GetGasTransaction) => {
    if (isEmpty(networkState.currentNetwork.data)) return "0";
    const { core } = networkState.currentNetwork.data;
    if (core === "evm") {
      return evmGetGasLimit(web3!, data);
    }
    if (core === "fvm") {
      return fvmGetGasLimit();
    }
    return "0";
  };

  return { web3, getBalance, getBalanceToken, getAccount, getAccountByCore, transfer, transferToken, getGasPrice, getGasLimit };
};

export default useBlockchain;
