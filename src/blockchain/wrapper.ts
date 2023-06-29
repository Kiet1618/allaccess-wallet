import { useAppSelector } from "@app/store";
import { useEVMBlockchain } from "./evm";
import { useFlowBlockchain } from "./flow";
import { isEmpty } from "lodash";
interface Blockchain {
  getBalance: () => number;
  transferNative: () => number;
}
const useBlockchain = () => {
  const networkState = useAppSelector(state => state.network);
  const { web3 } = useEVMBlockchain();
  const { fcl } = useFlowBlockchain();

  const getBalance = async () => {
    if (isEmpty(networkState.currentNetwork.data)) return 0;
    const { core } = networkState.currentNetwork.data;
    if (core === "evm") {
      return 1;
    }
    if (core === "fvm") {
      return 2;
    }
    return 0;
  };

  return { getBalance };
};

export default useBlockchain;
