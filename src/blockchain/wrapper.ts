import { useAppSelector } from "@app/store";
import { useEVMBlockchain } from "./evm";
import { useFlowBlockchain } from "./flow";
import { isEmpty } from "lodash";
import { Callbacks, TransferNative, TransferToken } from "./types";
// interface Blockchain {
//   getBalance: () => number;
//   transferNative: () => number;
// }
// interface Callbacks {
//   onError: (msg: string) => void;
// }
const useBlockchain = () => {
  const networkState = useAppSelector(state => state.network);

  const { web3, getBalance: evmGetBalance, account: evmAccount, transfer: evmTransfer, transferToken: evmTransferToken } = useEVMBlockchain();
  const { getBalance: fvmGetBalance, account: fvmAccount, transfer: fvmTransfer, transferToken: fvmTransferToken } = useFlowBlockchain();

  const getBalance = async () => {
    if (isEmpty(networkState.currentNetwork.data)) return 0;
    const { core } = networkState.currentNetwork.data;
    if (core === "evm" && web3) {
      return evmGetBalance(web3);
    }
    if (core === "fvm") {
      return fvmGetBalance();
    }
    return 0;
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

  const transfer = async (data: TransferNative, cb: Callbacks) => {
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

  return { getBalance, getAccount, transfer, transferToken };
};

export default useBlockchain;
