import Web3 from "web3";
import abi from "../../common/ERC20_ABI.json";
export const getBalanceToken = async (web3: Web3, tokenContract: string) => {
  try {
    const contractInstance = new web3.eth.Contract(abi as any, tokenContract);
    const balance = await contractInstance.methods
      .balanceOf(web3.defaultAccount)
      .call()
      .then((balance: string) => {
        return balance;
      });
    const formatBalance = web3.utils.fromWei(balance, "ether");
    return formatBalance.slice(0, 6);
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
