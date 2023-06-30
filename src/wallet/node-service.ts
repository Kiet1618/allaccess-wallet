import FetchNodeDetails from "@allaccessone/fetch-node-details";
import TorusUtils from "@allaccessone/allaccessone.js";
import { BN } from "bn.js";
import { generatePublicKeyFromPrivateKey } from "./algorithm";

import { KeyPair } from "./types";
import { NODE_NETWORK, PROXY_ADDRESS } from "@app/configs";

export const getNodeKey = async (verifier: string, verifierId: string, idToken: string): Promise<KeyPair> => {
  const fetchNodes = new FetchNodeDetails({ network: NODE_NETWORK, proxyAddress: PROXY_ADDRESS });
  const nodesList = await fetchNodes.getNodeDetails();
  const torus = new TorusUtils({ network: "testnet" });
  const { torusNodeEndpoints, torusIndexes, torusNodePub } = nodesList;
  await torus.getPublicAddress(torusNodeEndpoints, torusNodePub, { verifier, verifierId });
  const keyData = await torus.retrieveShares(torusNodeEndpoints, torusIndexes, verifier, { verifier_id: verifierId }, idToken, {});
  return {
    ethAddress: keyData.ethAddress,
    priKey: keyData.privKey,
    pubKey: generatePublicKeyFromPrivateKey(new BN(keyData.privKey, "hex")).toString("hex").padStart(130, "0"),
  };
};
