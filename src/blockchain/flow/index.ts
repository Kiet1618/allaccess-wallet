import { SHA3 } from "sha3";
import { formatUnits } from "ethers";
import * as EC from "elliptic";
import { KeyPair } from "@app/wallet/types";
import { useLocalStorage } from "usehooks-ts";
import { useAppSelector } from "@app/store";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import { TransferFlowScript } from "./transactions";
import { isEmpty } from "lodash";
import { createFlowAccount } from "./apis";
import { Callbacks, TransferNative, TransferToken } from "../types";
const { t } = fcl;
const ec = new EC.ec("secp256k1");

export const useFlowBlockchain = () => {
  const [account, setAccount] = useState("");
  const [masterKey, _] = useLocalStorage<KeyPair | null>("master-key", null);
  const networkState = useAppSelector(state => state.network);

  const hashMsgHex = (msgHex: string): Buffer => {
    const sha = new SHA3(256);
    sha.update(Buffer.from(msgHex, "hex"));
    return sha.digest();
  };

  const signWithKey = (privateKey: Buffer, msgHex: string) => {
    const key = ec.keyFromPrivate(privateKey);
    const sig = key.sign(hashMsgHex(msgHex));
    const n = 32; // half of signature length?
    const r = sig.r.toArrayLike(Buffer, "be", n);
    const s = sig.s.toArrayLike(Buffer, "be", n);
    return Buffer.concat([r, s]).toString("hex");
  };

  const authorization = async (account: any = {}) => {
    const user = await getAccount();
    const key = user.keys[0];

    let sequenceNum;
    if (account.role && account.role.proposer) sequenceNum = key.sequenceNumber;

    const signingFunction = async (data: any) => {
      return {
        addr: user.address,
        keyId: key.index,
        signature: signWithKey(Buffer.from(masterKey?.priKey || "", "hex"), data.message),
      };
    };

    return {
      ...account,
      addr: user.address,
      keyId: key.index,
      sequenceNum,
      signature: account.signature || null,
      signingFunction,
      resolve: null,
      roles: account.roles,
    };
  };

  useEffect(() => {
    if (isEmpty(networkState.currentNetwork.data)) return;
    if (!networkState.currentNetwork.data.chainID.includes("flow")) return;
    const { rpcUrls, chainID } = networkState.currentNetwork.data;
    createOrGetAccount();
    fcl.config({
      "accessNode.api": rpcUrls,
      "flow.network": chainID.split("-")[1],
    });
  }, [masterKey, networkState.currentNetwork.data]);

  const getBlock = async () => {
    const blockResponse = await fcl.send([fcl.getBlock(true) as any]);
    return await fcl.decode(blockResponse);
  };

  const getAccount = async () => {
    const accountResponse = await fcl.send([fcl.getAccount(account || "") as any]);
    return await fcl.decode(accountResponse);
  };

  const getBalance = async () => {
    const accountResponse = await fcl.send([fcl.getAccount(account || "") as any]);
    const { balance } = await fcl.decode(accountResponse);
    return formatUnits(balance, 8);
  };

  const getBalanceToken = async () => {
    const accountResponse = await fcl.send([fcl.getAccount(account || "") as any]);
    const { balance } = await fcl.decode(accountResponse);
    return balance;
  };

  const transfer = async (data: TransferNative, callbacks: Callbacks) => {
    const blockResponse = await fcl.send([fcl.getBlock(true) as any]);
    const response = await fcl.send([
      fcl.transaction(TransferFlowScript),
      fcl.args([
        fcl.arg(data.amount, t.UFix64), // Amount to transfer
        fcl.arg(data.addressTo, t.Address), // Recipient's address
      ]),
      fcl.payer(authorization),
      fcl.proposer(authorization),
      fcl.authorizations([authorization]),
      fcl.ref(blockResponse.block.id),
      fcl.limit(100),
    ]);

    fcl.tx(response).subscribe(status => {
      console.log("🚀 ~ file: index.ts:95 ~ fcl.tx ~ status:", status);
    });

    const transaction = await fcl.tx(response).onceSealed();
    if (typeof callbacks.onSuccess === "function") callbacks.onSuccess(transaction);
    return transaction;
  };

  const transferToken = async (data: TransferToken, callbacks: Callbacks) => {
    const blockResponse = await fcl.send([fcl.getBlock(true) as any]);
    const response = await fcl.send([
      fcl.transaction(TransferFlowScript),
      fcl.args([
        fcl.arg(data.amount, t.UFix64), // Amount to transfer
        fcl.arg(data.addressTo, t.Address), // Recipient's address
      ]),
      fcl.payer(authorization),
      fcl.proposer(authorization),
      fcl.authorizations([authorization]),
      fcl.ref(blockResponse.block.id),
      fcl.limit(100),
    ]);

    fcl.tx(response).subscribe(status => {
      console.log("🚀 ~ file: index.ts:95 ~ fcl.tx ~ status:", status);
    });

    const transaction = await fcl.tx(response).onceSealed();
    if (typeof callbacks.onSuccess === "function") callbacks.onSuccess(transaction);
    return transaction;
  };

  const createOrGetAccount = async (): Promise<string> => {
    const { data, error } = await createFlowAccount({ publicKey: masterKey?.pubKey || "", hashAlgo: 3, signAlgo: 2 });
    if (error) {
      throw new Error(error);
    }
    setAccount(data);
    // setMasterKey({
    //   ...masterKey!,
    //   flowAddress: data,
    // });
    return data;
  };

  return { fcl, account, createOrGetAccount, getBlock, getAccount, getBalance, getBalanceToken, transfer, transferToken };
};
