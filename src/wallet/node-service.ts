import FetchNodeDetails from "@allaccessone/fetch-node-details";
import TorusUtils from "@allaccessone/allaccessone.js";
import { BN } from "bn.js";
import { get } from "lodash";
import { GetOrSetMasterKeyResponse, getOrSetInfoMasterKey } from "./metadata";
import { generatePublicKeyFromPrivateKey, generateRandomPrivateKey } from "./algorithm";
export type KeyPair = {
  priKey: string;
  pubKey?: string;
  ethAddress: string;
};

export const getNodeKey = async (verifier: string, verifierId: string, idToken: string): Promise<KeyPair> => {
  const fetchNodes = new FetchNodeDetails({ network: "local", proxyAddress: "0xD44F7724b0a0800e41283E97BE5eC9E875f59811" });
  const nodesList = await fetchNodes.getNodeDetails();
  const torus = new TorusUtils({ network: "testnet" });
  const { torusNodeEndpoints, torusNodePub, torusIndexes, currentEpoch, nodeListAddress } = nodesList;
  // const publicAddress = await torus.getPublicAddress(torusNodeEndpoints, torusNodePub, { verifier, verifierId });
  const keyData = await torus.retrieveShares(torusNodeEndpoints, torusIndexes, verifier, { verifier_id: verifierId }, idToken, {});
  // const keyPair: KeyPair = {
  //     priKey: keyData.privKey,
  //     pubKey: publicAddress.toString()
  // }
  return {
    ethAddress: keyData.ethAddress,
    priKey: keyData.privKey,
    pubKey: generatePublicKeyFromPrivateKey(new BN(keyData.privKey, "hex")).toString("hex"),
  };
};

export const getInfoMasterKey = async (verifier: string, verifierId: string, networkKey: KeyPair): Promise<GetOrSetMasterKeyResponse> => {
  const { pubKey } = networkKey;
  // Get info master key or create
  const { error, data: infoMasterKey } = await getOrSetInfoMasterKey({
    verifier,
    verifierId,
    networkPublicKey: pubKey,
    // Api will handle create if info not exsited
    masterPublicKey: generateRandomPrivateKey().toString("hex"),
  });
  if (error) {
    throw new Error(error);
  }
  return infoMasterKey as GetOrSetMasterKeyResponse;
};
