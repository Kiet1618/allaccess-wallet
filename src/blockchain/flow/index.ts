import { SHA3 } from "sha3";
import * as EC from "elliptic";
import { BN } from "bn.js";
import { KeyPair } from "@app/wallet/types";
import { useLocalStorage } from "usehooks-ts";
import { useAppSelector } from "@app/store";
import { useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { TransferFlowScript } from "./transactions";
const { t } = fcl;
const ec = new EC.ec("secp256k1");

export const useFlowBlockchain = (rpcUrl?: string) => {
  const [masterKey] = useLocalStorage<KeyPair | null>("master-key", null);
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
    fcl.config({
      "accessNode.api": "https://access-testnet.onflow.org",
      "flow.network": "testnet",
    });
  }, [networkState]);

  const getBlock = async () => {
    const blockResponse = await fcl.send([fcl.getBlock(true) as any]);
    return await fcl.decode(blockResponse);
  };

  const getAccount = async () => {
    const accountResponse = await fcl.send([fcl.getAccount(masterKey?.flowAddress || "0xf2eb21c72bc9903a") as any]);
    return await fcl.decode(accountResponse);
  };

  const transferFlow = async (amount: string, recipient: string) => {
    const blockResponse = await fcl.send([fcl.getBlock(true) as any]);
    const response = await fcl.send([
      fcl.transaction(TransferFlowScript),
      fcl.args([
        fcl.arg(amount, t.UFix64), // Amount to transfer
        fcl.arg(recipient, t.Address), // Recipient's address
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

    return transaction;
  };

  const transferToken = async (amount: string, recipient: string) => {
    const blockResponse = await fcl.send([fcl.getBlock(true) as any]);
    const response = await fcl.send([
      fcl.transaction(TransferFlowScript),
      fcl.args([
        fcl.arg(amount, t.UFix64), // Amount to transfer
        fcl.arg(recipient, t.Address), // Recipient's address
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

    return transaction;
  };

  return { fcl, getBlock, getAccount, transferFlow };
};
