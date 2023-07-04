import Web3 from "web3";
import { isEmpty } from "lodash";
import { useLocalStorage } from "usehooks-ts";

import { KeyPair } from "@app/wallet/types";
import { useAppSelector } from "@app/store";

import { getToken } from "./token";
import { formatValue } from "./format";
import { getGasPrice, getGasLimit } from "./blockchain";
import { getBalanceToken, getBalance } from "./balance";
import { transfer, transferToken } from "./transfer";
import { useEffect, useState } from "react";

export const useEVMBlockchain = (rpcUrl?: string) => {
  const [masterKey] = useLocalStorage<KeyPair | null>("master-key", null);
  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(new Web3());
  const [account, setAccount] = useState("");

  const networkState = useAppSelector(state => state.network);

  useEffect(() => {
    if (masterKey && !isEmpty(masterKey)) {
      const web3 = new Web3(rpcUrl || networkState.currentNetwork.data.rpcUrls);
      const account = web3.eth.accounts.wallet.add(masterKey?.priKey.padStart(64, "0"));
      web3.defaultAccount = account.address;
      setWeb3Instance(web3);
      setAccount(account.address);
    } else {
      // throw new Error("Invalid master key");
    }
  }, [masterKey, networkState.currentNetwork.data]);

  return { web3: web3Instance, account, getGasPrice, getGasLimit, getBalanceToken, getBalance, transfer, transferToken, formatValue, getToken };
};

export { getGasPrice, getGasLimit, getBalanceToken, getBalance, transfer, transferToken, formatValue, getToken };
