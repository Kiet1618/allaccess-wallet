import Web3 from "web3";
import abi from "../common/ERC20_ABI.json";
import { FormData } from "../pages/Transaction";

export const useBlockchain = (rpcUrl: string) => {
  try {
    const web3 = new Web3(rpcUrl);
    return { web3, getGasPrice, getBalance, sendTransaction, sendTransactionToken, formatValue };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getGasPrice = async (web3: Web3) => {
  const price = await web3.eth.getGasPrice();
  const ethValue = Math.round((parseInt(price, 16) / 10 ** 18) * 1000000) / 1000000;
  return ethValue;
};

export const formatValue = (web3: Web3, value: string) => {
  try {
    const formatBalance = web3.utils.fromWei(value, "ether");
    return formatBalance.slice(0, 5);
  } catch {
    return value;
  }
};
export const getBalance = async (web3: Web3, address: string, symbol: string = "ETH", tokenContract: string = "") => {
  try {
    if (tokenContract === "") {
      const balance = await web3.eth.getBalance(address);
      const formatBalance = web3.utils.fromWei(balance, "ether");
      return formatBalance.slice(0, 6);
    } else {
      const contractInstance = new web3.eth.Contract(abi as any, tokenContract);
      const balance = await contractInstance.methods
        .balanceOf(web3.defaultAccount)
        .call()
        .then((balance: string) => {
          return balance;
        });
      const formatBalance = web3.utils.fromWei(balance, "ether");
      return formatBalance.slice(0, 6);
    }
  } catch {
    return "0";
  }
};

export const sendTransaction = async (web3: Web3, data: FormData, privateKey: string) => {
  const { addressTo, amount } = data;
  try {
    const weiValue = Math.round(parseFloat(amount) * 10 ** 18);
    const hexValue = web3.utils.toHex(weiValue ? weiValue : 0);
    const price = await web3.eth.getGasPrice();
    const tx = {
      to: addressTo,
      from: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe",
      value: hexValue,
      gas: 210000,
      gasPrice: price,
      data: "0x",
    };
    const signedTransaction: any = await web3.eth.accounts.signTransaction(tx, privateKey);
    const sendSignedTransaction = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log(sendSignedTransaction.transactionHash);
    return sendSignedTransaction.transactionHash;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendTransactionToken = async (web3: Web3, data: FormData, privateKey: string) => {
  const { addressTo, amount, tokenContract } = data;
  try {
    const tokenAddress = new web3.eth.Contract(abi as any, tokenContract);
    const price = await web3.eth.getGasPrice();

    const recipient = addressTo;
    const value = web3.utils.toWei(amount, "ether");
    const transferData = tokenAddress.methods.transfer(recipient, value).encodeABI();

    const transactionObject = {
      from: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe",
      to: tokenAddress.options.address,
      gas: await tokenAddress.methods.transfer(recipient, value).estimateGas({ from: web3.defaultAccount }),
      gasPrice: price,
      data: transferData,
    };
    const signedTransaction: any = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    return transactionReceipt.transactionHash;
  } catch (error) {
    return error;
  }
};
