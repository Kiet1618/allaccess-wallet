import FetchNodeDetails from "@allaccessone/fetch-node-details";
import TorusUtils from "@allaccessone/allaccessone.js";
type KeyPair = {
  priKey: string;
  pubKey: string;
};

const getNodeKey = async (verifier: string, verifierId: string) => {
  const fetchNodes = new FetchNodeDetails({ network: "local", proxyAddress: "0xD44F7724b0a0800e41283E97BE5eC9E875f59811" });
  const nodesList = await fetchNodes.getNodeDetails();
  const torus = new TorusUtils({ network: "testnet" });
  // const verifier = 'google'
  // const verifierId = 'khiemnguyen@lecle.co.kr'
  const idToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWE1ZWY1YjEyNjIzYzkxNjcxYTcwOTNjYjMyMzMzM2NkMDdkMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk5NzA0NTE1MDQwNDYzNzcxNzgiLCJoZCI6ImxlY2xlLmNvLmtyIiwiZW1haWwiOiJraGllbW5ndXllbkBsZWNsZS5jby5rciIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoidGY5ZWg2Z3pSSHhSTy01ZmJsMnhGZyIsIm5hbWUiOiJLaGllbSBOZ3V5ZW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZUVIR3p5NFZPd3gzTFptdWpNanFmWENmQTVBbmRUbWYtWUQ0RTA9czk2LWMiLCJnaXZlbl9uYW1lIjoiS2hpZW0iLCJmYW1pbHlfbmFtZSI6Ik5ndXllbiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjg1NTMyODA5LCJleHAiOjE2ODU1MzY0MDl9.Fy0uiAhZjCTkjIncbpVKbZsk4ISjbhcDlgrLlm6n8EllWl8qR3Vht0up3N6TfQZgQnoIGQXuyl636zVDXn8zCk6i1mMX6SVqrfvp-oGHtYHvx24GsNe77z21oH86r9T6EJQqB949BaXqUw2MdwIzRyxCaz_sG9scNmpR3WZhLLxl3vWaMul18Rokvsgg-KB95jCJjDEXKUSuo599MAAm0zT8DbosiOLDeHplY_cPCKw4FswCOjzSxkbRYixsNNrrRxPdjY_k3jTnco-X3U8otdNh2zeDMoayBVi6rye7JBPZ13vKFrlsQpVlc1JGA4qgRkzsNvrxUKUrU3Wztp-qFg";
  const { torusNodeEndpoints, torusNodePub, torusIndexes, currentEpoch, nodeListAddress } = nodesList;
  const publicAddress = await torus.getPublicAddress(torusNodeEndpoints, torusNodePub, { verifier, verifierId });
  const keyData = await torus.retrieveShares(torusNodeEndpoints, torusIndexes, verifier, { verifier_id: verifierId }, idToken, {});
  // const keyPair: KeyPair = {
  //     priKey: keyData.privKey,
  //     pubKey: publicAddress.toString()
  // }
  console.log(keyData.privKey);
  return keyData;
};
