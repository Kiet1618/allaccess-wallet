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

const getNodeKey = async (verifier: string, verifierId: string, idToken: string): Promise<KeyPair> => {
  const fetchNodes = new FetchNodeDetails({ network: "local", proxyAddress: "0xD44F7724b0a0800e41283E97BE5eC9E875f59811" });
  const nodesList = await fetchNodes.getNodeDetails();
  const torus = new TorusUtils({ network: "testnet" });
  // const verifier = 'google'
  // const verifierId = 'khiemnguyen@lecle.co.kr'
  // const idToken =
  //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWE1ZWY1YjEyNjIzYzkxNjcxYTcwOTNjYjMyMzMzM2NkMDdkMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk5NzA0NTE1MDQwNDYzNzcxNzgiLCJoZCI6ImxlY2xlLmNvLmtyIiwiZW1haWwiOiJraGllbW5ndXllbkBsZWNsZS5jby5rciIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoidGY5ZWg2Z3pSSHhSTy01ZmJsMnhGZyIsIm5hbWUiOiJLaGllbSBOZ3V5ZW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZUVIR3p5NFZPd3gzTFptdWpNanFmWENmQTVBbmRUbWYtWUQ0RTA9czk2LWMiLCJnaXZlbl9uYW1lIjoiS2hpZW0iLCJmYW1pbHlfbmFtZSI6Ik5ndXllbiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjg1NTMyODA5LCJleHAiOjE2ODU1MzY0MDl9.Fy0uiAhZjCTkjIncbpVKbZsk4ISjbhcDlgrLlm6n8EllWl8qR3Vht0up3N6TfQZgQnoIGQXuyl636zVDXn8zCk6i1mMX6SVqrfvp-oGHtYHvx24GsNe77z21oH86r9T6EJQqB949BaXqUw2MdwIzRyxCaz_sG9scNmpR3WZhLLxl3vWaMul18Rokvsgg-KB95jCJjDEXKUSuo599MAAm0zT8DbosiOLDeHplY_cPCKw4FswCOjzSxkbRYixsNNrrRxPdjY_k3jTnco-X3U8otdNh2zeDMoayBVi6rye7JBPZ13vKFrlsQpVlc1JGA4qgRkzsNvrxUKUrU3Wztp-qFg";
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
export const getMasterKey = async (verifier: string, verifierId: string, idToken: string): Promise<{ error?: string; key?: KeyPair | null }> => {
  try {
    const nodeKey = await getNodeKey(verifier, verifierId, idToken);
    const { pubKey } = nodeKey;
    // Get info master key or create
    const { error, data: infoMasterKey } = await getOrSetInfoMasterKey({
      verifier,
      verifierId,
      networkPublicKey: pubKey,
      // Api will handle create if info not exsited
      masterPublicKey: generateRandomPrivateKey().toString("hex"),
    });
    const {} = infoMasterKey as GetOrSetMasterKeyResponse;
    if (error) {
      throw new Error(error);
    }
    return { error: "", key: nodeKey };
  } catch (error) {
    return {
      error: get(error, "message", "Unknown error"),
      key: null,
    };
  }
};
