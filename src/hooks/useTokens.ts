import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { useAppSelector } from "@app/store";

export const useTokens = () => {
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
