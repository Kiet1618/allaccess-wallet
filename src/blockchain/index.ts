import Web3 from "web3";
import abi from "../common/ERC20_ABI.json";
import { FormData } from "../pages/Transaction/Transfer/type";
import { privateKey } from "../configs/data/test";
import { AbiItem } from "web3-utils";

export const useBlockchain = (rpcUrl: string) => {
  try {
    const web3 = new Web3(rpcUrl);
    const account = web3.eth.accounts.wallet.add(privateKey.padStart(64, "0"));
    web3.defaultAccount = account.address;

    return { web3, account, getGasPrice, getBalanceToken, getBalance, sendTransaction, sendTransactionToken, formatValue };
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
export const getCurrentBlock = async (web3: Web3) => {
  return await web3.eth.getBlockNumber();
};
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
export const sendTransaction = async (web3: Web3, data: FormData) => {
  const { addressTo, amount } = data;
  try {
    const weiValue = Math.round(parseFloat(amount) * 10 ** 18);
    const hexValue = web3.utils.toHex(weiValue ? weiValue : 0);
    const price = await web3.eth.getGasPrice();
    const tx = {
      to: addressTo,
      from: web3.defaultAccount as string,
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
    return "Error";
  }
};

export const sendTransactionToken = async (web3: Web3, data: FormData, tokenContract: string) => {
  const { addressTo, amount } = data;
  try {
    const tokenAddress = new web3.eth.Contract(abi as any, tokenContract);
    const price = await web3.eth.getGasPrice();
    const recipient = addressTo;
    const value = web3.utils.toWei(amount, "ether");
    const transferData = tokenAddress.methods.transfer(recipient, value).encodeABI();
    const transactionObject = {
      from: web3.defaultAccount as string,
      to: tokenAddress.options.address,
      gas: await tokenAddress.methods.transfer(recipient, value).estimateGas({ from: web3.defaultAccount }),
      gasPrice: price,
      data: transferData,
    };
    const signedTransaction: any = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    return transactionReceipt.transactionHash;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

export const getNameToken = async (web3: Web3, addressToken: string) => {
  try {
    const tokenContract = new web3.eth.Contract(abi as AbiItem[], addressToken);

    const name: string = await tokenContract.methods.name().call((error: Error | null, name: string) => {
      if (error) {
        console.error(error);
      } else {
        return name;
      }
    });
    return name;
  } catch {
    return "";
  }
};

export const getSymbolToken = async (web3: Web3, addressToken: string) => {
  try {
    const tokenContract = new web3.eth.Contract(abi as AbiItem[], addressToken);

    const symbol: string = await tokenContract.methods.symbol().call((error: Error | null, symbol: string) => {
      if (error) {
        console.error(error);
      } else {
        return symbol;
      }
    });
    return symbol;
  } catch {
    return "";
  }
};
