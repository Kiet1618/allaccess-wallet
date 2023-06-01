import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useAppSelector } from "@app/store";
import Web3 from "web3";
export const useTokens = (web3: Web3, addressToken: string, networkRpc: string, chainId: string) => {
  const [tokens, setTokens] = useState([]);

  // Get list token from local storage or redux
  useEffect(() => {
    // Merge tokens from local storage
    // const tokens = useAppSelector(state => state.token.currentListTokens);
    const [tokens] = useLocalStorage("tokens", []);
  }, []);

  // Import token to local storage and redux
  const importToken = () => {
    // set new tokens
    setTokens([]);
  };

  // Delete token from local storage and redux
  const deleteToken = () => {
    // delete from local storage
    // set new tokens
    setTokens([]);
  };

  // Search token, import token if it is not exist
  const searchToken = (keyword: string) => {
    // Filter it from tokens list
  };

  return { tokens, importToken, deleteToken, searchToken };
};
