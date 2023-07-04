import { ChainCore } from "@app/types/blockchain.type";
import { isAddress } from "ethers";
export const FlowAddressRegex = /^0x[0-9a-fA-F]{16}$/;
export const isValidAddress = (address: string, core: ChainCore): boolean => {
  switch (core) {
    case "evm":
      return isAddress(address);
    case "fvm":
      return FlowAddressRegex.test(address);
    default:
      return true;
  }
};
