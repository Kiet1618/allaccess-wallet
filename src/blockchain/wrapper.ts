import { useAppSelector } from "@app/store";
import { useEVMBlockchain } from "./evm";
import { useFlowBlockchain } from "./flow";
import { isEmpty } from "lodash";
// interface Blockchain {
//   getBalance: () => number;
//   transferNative: () => number;
// }
// interface Callbacks {
//   onError: (msg: string) => void;
// }
const useBlockchain = () => {
  const networkState = useAppSelector(state => state.network);
  const { web3, getBalance: evmGetBalance, account: evmAccount } = useEVMBlockchain();
  const { fcl, getBalance: fvmGetBalance, account: fvmAccount } = useFlowBlockchain();

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

  const getAccount = async () => {
    if (isEmpty(networkState.currentNetwork.data)) return 0;
    const { core } = networkState.currentNetwork.data;
    if (core === "evm" && web3) {
      return evmAccount;
    }
    if (core === "fvm") {
      return fvmAccount;
    }
    return 0;
  };

  return { getBalance, getAccount };
};

export default useBlockchain;
