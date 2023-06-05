import Web3 from "web3";
import { FormData } from "../pages/Transaction/Transfer/type";
import abi from "../common/ERC20_ABI.json";

export const getGasPrice = async (web3: Web3) => {
  const price = await web3.eth.getGasPrice();
  const ethValue = Math.round((parseInt(price, 16) / 10 ** 18) * 10000000000000) / 10000000000000;
  return ethValue;
};
export const getGasLimit = async (web3: Web3, addressTo: string, amount: string, tokenContract: string | undefined = undefined) => {
  const weiValue = Math.round(parseFloat(amount) * 10 ** 18);
  const hexValue = web3.utils.toHex(weiValue ? weiValue : 0);
  if (!tokenContract) {
    const gasLimit = await web3.eth.estimateGas({
      to: addressTo,
      from: web3.defaultAccount as string,
      value: hexValue,
      data: "0x",
    });
    const ethValue = Math.round((gasLimit / 10 ** 18) * 100000000000) / 100000000000;

    return ethValue;
  } else {
    const tokenAddress = new web3.eth.Contract(abi as any, tokenContract);
    const gasLimit = await tokenAddress.methods.transfer(addressTo, hexValue).estimateGas({
      to: addressTo,
      from: web3.defaultAccount as string,
      value: hexValue,
      data: "0x",
    });
    const ethValue = Math.round((parseInt(gasLimit, 16) / 10 ** 18) * 100000000000) / 100000000000;

    return ethValue;
  }
};

export const getCurrentBlock = async (web3: Web3) => {
  return await web3.eth.getBlockNumber();
};
