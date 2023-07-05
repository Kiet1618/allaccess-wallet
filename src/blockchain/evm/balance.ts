import Web3 from "web3";
import abi from "../../common/ERC20_ABI.json";
import { formatUnits } from "ethers";
export const getBalanceToken = async (web3: Web3, tokenAddress: string) => {
  try {
    const tokenContract = new web3.eth.Contract(abi as any, tokenAddress);
    const [balance, decimals] = await Promise.all([tokenContract.methods.balanceOf(web3.defaultAccount).call(), tokenContract.methods.decimals().call()]);

    const formatBalance = formatUnits(balance, Number(decimals));
    return formatBalance;
  } catch {
    return "0";
  }
};
export const getBalance = async (web3: Web3) => {
  try {
    const balance = await web3.eth.getBalance(web3.defaultAccount as string);
    const formatBalance = web3.utils.fromWei(balance, "ether");
    return formatBalance.slice(0, 6);
  } catch {
    return "0";
  }
};
