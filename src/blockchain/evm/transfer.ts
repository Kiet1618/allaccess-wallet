import Web3 from "web3";
import { parseEther, parseUnits } from "ethers";
import { AbiItem } from "web3-utils";
import ERC20_ABI from "@app/common/ERC20_ABI.json";
import { Callbacks, DefaultCallbacks, SignedTransferResponse, TransferNative, TransferToken } from "../types";
export const transfer = async (web3: Web3, data: TransferNative, callbacks: Callbacks = DefaultCallbacks) => {
  const { onError, onHash, onSuccess } = callbacks;
  try {
    const { recipient, amount } = data;
    const hexValue = parseEther(amount);
    const price = await web3.eth.getGasPrice();

    const gasLimit = await web3.eth.estimateGas({
      to: recipient,
      from: web3.defaultAccount as string,
      value: hexValue.toString(),
      data: "0x",
    });

    const tx = {
      to: recipient,
      from: web3.defaultAccount as string,
      value: hexValue.toString(),
      gas: gasLimit as number,
      gasPrice: price,
      data: "0x",
    };

    const sendSignedTransaction = web3.eth.sendTransaction(tx);
    sendSignedTransaction
      .on("transactionHash", transactionHash => {
        onHash(transactionHash);
      })
      .on("receipt", receipt => {
        onSuccess(receipt.transactionHash);
        return;
      })
      .on("error", error => {
        onError(error.message);
        return;
      });
  } catch (error: any) {
    onError(error?.message || "Unknown error");
  }
};
export const transferToken = async (web3: Web3, data: TransferToken, callbacks: Callbacks) => {
  const { onError, onHash, onSuccess } = callbacks;
  const { recipient, amount, tokenContract } = data;
  const tokenAddress = new web3.eth.Contract(ERC20_ABI as AbiItem[], tokenContract);
  const [price, decimals] = await Promise.all([web3.eth.getGasPrice(), tokenAddress.methods.decimals().call()]);
  const value = parseUnits(amount, Number(decimals));
  const transferData = tokenAddress.methods.transfer(recipient, value).encodeABI();
  const gasLimit = await tokenAddress.methods.transfer(recipient, value).estimateGas({ from: web3.defaultAccount });

  const transactionObject = {
    from: web3.defaultAccount as string,
    to: tokenAddress.options.address,
    gas: gasLimit,
    gasPrice: price,
    data: transferData,
  };
  const transactionReceipt = web3.eth.sendTransaction(transactionObject);
  transactionReceipt
    .on("transactionHash", transactionHash => {
      onHash(transactionHash);
    })
    .on("receipt", () => {
      onSuccess("success");
      return;
    })
    .on("error", error => {
      onError(error.message);
      onHash("");
      return;
    });
};

export const signTransfer = async (web3: Web3, data: TransferNative): Promise<SignedTransferResponse> => {
  try {
    const { recipient, amount } = data;
    const tx = {
      to: recipient,
      from: web3.defaultAccount as string,
      value: parseUnits(amount, 18).toString(),
      data: "0x",
    } as any;
    const gasLimit = await web3.eth.estimateGas(tx);
    tx.gasLimit = gasLimit;

    const privateKey = web3.eth.accounts.wallet[0].privateKey;

    const signedTransaction = await web3.eth.accounts.signTransaction(tx, privateKey);
    return { signed: JSON.stringify(signedTransaction) };
  } catch (error: any) {
    return {
      error: error?.message || "Unknown sign transfer EVM",
      // signed: null,
    };
  }
};
