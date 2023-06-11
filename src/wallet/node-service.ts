import FetchNodeDetails from "@allaccessone/fetch-node-details";
import TorusUtils from "@allaccessone/allaccessone.js";
import { BN } from "bn.js";
import { generatePublicKeyFromPrivateKey } from "./algorithm";

import { KeyPair } from "./types";

export const getNodeKey = async (verifier: string, verifierId: string, idToken: string): Promise<KeyPair> => {
  const fetchNodes = new FetchNodeDetails({ network: "local", proxyAddress: "0xD44F7724b0a0800e41283E97BE5eC9E875f59811" });
  const nodesList = await fetchNodes.getNodeDetails();
  const torus = new TorusUtils({ network: "testnet" });
  const { torusNodeEndpoints, torusIndexes } = nodesList;
  const keyData = await torus.retrieveShares(torusNodeEndpoints, torusIndexes, verifier, { verifier_id: verifierId }, idToken, {});
  return {
    ethAddress: keyData.ethAddress,
    priKey: keyData.privKey,
    pubKey: generatePublicKeyFromPrivateKey(new BN(keyData.privKey, "hex")).toString("hex").padStart(130, "0"),
  };
};
