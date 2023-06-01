import Web3 from "web3";
import abi from "../common/ERC20_ABI.json";
import { AbiItem } from "web3-utils";
import { Token } from "../types/blockchain.type";
export const getToken = async (web3: Web3, addressToken: string, networkRpc: string, chainId: string) => {
  const symbolToken = await getSymbolToken(web3, addressToken);
  const nameToken = await getNameToken(web3, addressToken);
  if (symbolToken && nameToken) {
    return {
      chainId: chainId,
      rpcUrls: networkRpc,
      img: "https://upload.wikimedia.org/wikipedia/commons/6/61/MemeCoin_Crypto_Currency_Logo.png",
      symbol: symbolToken,
      name: nameToken,
      tokenContract: addressToken,
    } as Token;
  } else {
    return undefined;
  }
};

const getNameToken = async (web3: Web3, addressToken: string) => {
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

const getSymbolToken = async (web3: Web3, addressToken: string) => {
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
