import Web3 from "web3";
import abi from "../../common/ERC20_ABI.json";
import { GetGasTransaction } from "../types";
import { parseEther, parseUnits } from "ethers";

export const getGasPrice = async (web3: Web3): Promise<string> => {
  try {
    const price = await web3.eth.getGasPrice();
    const ethValue = (parseInt(price, 16) / 10 ** 18).toFixed(15);
    return ethValue;
  } catch (error) {
    return "0";
  }
};
export const getGasLimit = async (web3: Web3, data: GetGasTransaction) => {
  const { addressTo, amount, tokenContract } = data;
  try {
    if (!tokenContract) {
      const gasLimit = await web3.eth.estimateGas({
        to: addressTo,
        from: web3.defaultAccount as string,
        value: parseEther(amount).toString(),
        data: "0x",
      });

      const ethValue = (gasLimit / 10 ** 18).toFixed(15);

      return ethValue;
    } else {
      const tokenAddress = new web3.eth.Contract(abi as any, tokenContract);
      const [decimals] = await Promise.all([tokenAddress.methods.decimals().call()]);

      const gasLimit = await tokenAddress.methods.transfer(addressTo, parseUnits(amount, Number(decimals))).estimateGas({
        from: web3.defaultAccount as string,
      });

      const ethValue = (parseInt(gasLimit, 16) / 10 ** 18).toFixed(15);

      return ethValue;
    }
  } catch (error) {
    return 0;
  }
};

export const getCurrentBlock = async (web3: Web3) => {
  return await web3.eth.getBlockNumber();
};
