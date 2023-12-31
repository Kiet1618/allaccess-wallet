import FetchNodeDetails from "@allaccessone/fetch-node-details";
import TorusUtils from "@allaccessone/allaccessone.js";
import { BN } from "bn.js";
import { generatePublicKeyFromPrivateKey } from "./algorithm";
import { NODE_NETWORK, PROXY_ADDRESS } from "@app/configs";

import { KeyPair } from "./types";

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
  // console.log(verifier, verifierId, idToken);
  // return {
  //   ethAddress: "0x2e123e87AB37B2bE44b511Cde15c19c785a840D7",
  //   priKey: "2360afae7497c84aac89470fb9b5a5093b4408d4d9d816ca6888213cc666744e",
  //   pubKey: "043c0e17d37606a34ddd57c115b6b54fba2728c70878543144700be350b2f6c5c427ec464af71222bddf41643758748757c66b51415feb78884bea86251763831e",
  // };
};
