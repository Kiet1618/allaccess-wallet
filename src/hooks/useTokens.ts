import { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import Web3 from "web3";
import { getListTokens } from "../storage/storage-service";
import { Token } from "../types/blockchain.type";
import { getToken } from "../blockchain/token";
export const useTokens = (web3: Web3, addressToken: string, networkRpc: string, chainId: string) => {
  const [tokens, setTokens] = useState<Array<Token>>([]);
  const tokensRedux = useAppSelector(state => state.token).currentListTokens.data;

  useEffect(() => {
    const tokensLocal: Array<Token> = getListTokens();
    setTokens([...tokensRedux, ...tokensLocal]);
    // merge tokens
  }, []);

  // Import token to local storage and redux
  const importToken = async () => {
    // handle
    return await getToken(web3, addressToken, networkRpc, chainId);
  };

  const deleteToken = () => {
    // delete from local storage
    // set new tokens
  };

  // Search token, import token if it is not exist
  const searchToken = () => {
    // Filter it from tokens list
  };

  return { tokens, importToken, deleteToken, searchToken };
};
