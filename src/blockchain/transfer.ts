import Web3 from "web3";
import { FormData } from "../pages/Transaction/Transfer/type";
// import { privateKey } from "../configs/data/test";
import abi from "../common/ERC20_ABI.json";
import { getTorusKey } from "@app/storage/storage-service";
export const sendTransaction = async (
  web3: Web3,
  data: FormData,
  setTransactionHash: React.Dispatch<React.SetStateAction<string>>,
  setInfoTransaction: React.Dispatch<React.SetStateAction<string>>,
  setErrorTransaction: React.Dispatch<React.SetStateAction<string>>
) => {
  setInfoTransaction("pending");
  setTimeout(() => {
    setErrorTransaction("Error: Time out");
    setInfoTransaction("Error");
    setTransactionHash("");
  }, 60000);
  const privateKey = getTorusKey().priKey;
  if (!privateKey) {
    setErrorTransaction("Error: Don't have private key");
    setInfoTransaction("Error");
    setTransactionHash("");
    return;
  }
  const { addressTo, amount } = data;
  const weiValue = Math.round(parseFloat(amount) * 10 ** 18);
  const hexValue = web3.utils.toHex(weiValue ? weiValue : 0);
  const price = await web3.eth.getGasPrice();

  const gasLimit = await web3.eth
    .estimateGas({
      to: addressTo,
      from: web3.defaultAccount as string,
      value: hexValue,
      data: "0x",
    })
    .catch((error: Error) => {
      setErrorTransaction(error.message);
      setInfoTransaction("Error");
      setTransactionHash("");
      return;
    });

  const tx = {
    to: addressTo,
    from: web3.defaultAccount as string,
    value: hexValue,
    gas: gasLimit as number,
    gasPrice: price,
    data: "0x",
  };

  const signedTransaction: any = await web3.eth.accounts.signTransaction(tx, privateKey);

  const sendSignedTransaction = web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  sendSignedTransaction
    .on("transactionHash", transactionHash => {
      setTransactionHash(transactionHash);
    })
    .on("receipt", () => {
      setInfoTransaction("success");
      return;
    })
    .on("error", error => {
      setErrorTransaction(error.message);
      setInfoTransaction("Error");
      setTransactionHash("");
      return;
    });
};
export const sendTransactionToken = async (
  web3: Web3,
  data: FormData,
  tokenContract: string,
  setTransactionHash: React.Dispatch<React.SetStateAction<string>>,
  setInfoTransaction: React.Dispatch<React.SetStateAction<string>>,
  setErrorTransaction: React.Dispatch<React.SetStateAction<string>>
) => {
  setInfoTransaction("pending");
  setTimeout(() => {
    setErrorTransaction("Error: Time out");
    setInfoTransaction("Error");
    setTransactionHash("");
  }, 60000);
  const { addressTo, amount } = data;
  const tokenAddress = new web3.eth.Contract(abi as any, tokenContract);
  const price = await web3.eth.getGasPrice();
  const recipient = addressTo;
  const value = web3.utils.toWei(amount, "ether");
  const transferData = tokenAddress.methods.transfer(recipient, value).encodeABI();
  const gasLimit = await tokenAddress.methods
    .transfer(recipient, value)
    .estimateGas({ from: web3.defaultAccount })
    .catch((error: Error) => {
      setErrorTransaction(error.message);
      setInfoTransaction("Error");
      setTransactionHash("");
      return;
    });

  const transactionObject = {
    from: web3.defaultAccount as string,
    to: tokenAddress.options.address,
    gas: gasLimit,
    gasPrice: price,
    data: transferData,
  };
  const privateKey = getTorusKey().priKey ? getTorusKey().priKey : "";
  if (!privateKey) {
    setErrorTransaction("Error: Don't have private key");
    setInfoTransaction("Error");
    setTransactionHash("");
    return;
  }
  const signedTransaction: any = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
  const transactionReceipt = web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  transactionReceipt
    .on("transactionHash", transactionHash => {
      setTransactionHash(transactionHash);
    })
    .on("receipt", () => {
      setInfoTransaction("success");
      return;
    })
    .on("error", error => {
      setErrorTransaction(error.message);
      setInfoTransaction("Error");
      setTransactionHash("");
      return;
    });
};
