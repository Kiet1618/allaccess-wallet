import { useCallback } from "react";
import { get, isEmpty, map } from "lodash";
import { useSessionStorage } from "usehooks-ts";
import { KeyPair, getNodeKey } from "@app/wallet/node-service";
import { InfoMasterKey, ShareInfo, initialedShares, getOrSetInfoMasterKey } from "@app/wallet/metadata";
import { combineTest1, decryptedMessage, encryptedMessage, sharmirCombinePrivateKey, sharmirSplitPrivateKey } from "@app/wallet/algorithm";
import BN from "bn.js";

export const useFetchWallet = () => {
  const [infoMasterKey, setInMasterKey] = useSessionStorage<InfoMasterKey | null>("info-master-key", null);
  const [masterKey, setMasterKey] = useSessionStorage<KeyPair>("master-key", { ethAddress: "", priKey: "", pubKey: "" });
  const [networkKey, setNetworkKey] = useSessionStorage<KeyPair>("network-key", { ethAddress: "", priKey: "", pubKey: "" });
  const [deviceKey, setDeviceKey] = useSessionStorage<KeyPair | null>("device-key", null);

  // Get info master key
  const getInfoWallet = async (verifier: string, verifierId: string, idToken: string): Promise<{ error: string; info: InfoMasterKey | null }> => {
    try {
      const networkKey = await getNodeKey(verifier, verifierId, idToken);
      const { error, data: info } = await getOrSetInfoMasterKey(verifier, verifierId, networkKey);
      if (error) throw new Error(error);
      const { masterPrivateKey, masterPublicKey, networkPublicKey } = info as InfoMasterKey;
      // set session storage
      setNetworkKey(networkKey);
      setInMasterKey({
        ...info,
        // masterPrivateKey: "",
      } as InfoMasterKey);

      // First, generate master-key, and initial 2 shares by network key
      if (!info?.initialed) {
        const splits = sharmirSplitPrivateKey(Buffer.from(masterPrivateKey || "", "hex"));
        const masterKey = sharmirCombinePrivateKey([splits[0], splits[1]]);
        console.log("🚀 ~ file: useFetchWallet.ts:34 ~ getInfoWal ~ masterKey:", masterKey.toString("hex"));

        const share1 = await encryptedMessage(splits[0], new BN(networkKey.priKey, "hex"));
        const share2 = await encryptedMessage(splits[1], new BN(networkKey.priKey, "hex"));
        const shares = map([share1, share2], share => {
          return {
            masterPublicKey: masterPublicKey,
            publicKey: networkPublicKey,
            encryptedData: share.encryptedToString,
            type: "network-key" as ShareInfo["type"],
          };
        });
        const encrypted = await encryptedMessage(Buffer.from(Date.now().toString()), new BN(networkKey.priKey, "hex"));
        const createdShares = await initialedShares({
          masterPublicKey: masterPublicKey,
          networkPublicKey: encrypted.publicKey,
          shares,
          encryptedData: encrypted.encryptedToString,
          signature: encrypted.signature,
        });

        setInMasterKey({
          ...infoMasterKey,
          shares: createdShares.data,
        } as InfoMasterKey);
      }
      console.log("🚀 ~ file 13323132131");

      return {
        error: "",
        info,
      };
    } catch (error) {
      return { error: get(error, "message", "Unknown"), info: null };
    }
  };

  const fetchMasterKey = async (): Promise<{ error: string }> => {
    console.log("🚀 ~ file đâsdsa");
    if (isEmpty(networkKey)) {
      return { error: "Please initial network key before" };
    }
    if (isEmpty(infoMasterKey)) {
      return { error: "Please initial master key before" };
    }
    const { mfa, initialed, shares } = infoMasterKey as InfoMasterKey;
    if (!initialed) {
      return { error: "Please initial shares of master key before" };
    }

    // Always get from device first
    if (!isEmpty(deviceKey)) {
      const deviceShare = shares?.find(share => {
        return share.publicKey.toLowerCase().padStart(130, "0") === deviceKey.pubKey?.padStart(130, "0") && share.type === "device";
      });
      if (isEmpty(deviceShare)) {
        setDeviceKey(null);
        return { error: "Device share not existed" };
      }
      const networkShares = shares?.find(share => {
        return share.publicKey.toLowerCase().padStart(130, "0") === deviceKey.pubKey?.padStart(130, "0") && share.type === "network-key";
      });
    }

    if (!mfa) {
      const networkShares = shares?.filter(share => {
        return share.publicKey.toLowerCase().padStart(130, "0") === networkKey.pubKey?.padStart(130, "0") && share.type === "network-key";
      });
      if (networkShares && networkShares?.length < 2) {
        return { error: "Cannot combine from network share" };
      }
      const decryptedShares = await Promise.all(
        (networkShares || []).map(async elm => {
          return (await decryptedMessage(new BN(networkKey.priKey, "hex"), elm.shareData ?? ({} as any))) as Buffer;
        })
      );
      const masterKey = sharmirCombinePrivateKey(decryptedShares);
      console.log("🚀 ~ file: useFetchWallet.ts:101 ~ fetchMasterKey ~ masterKey:", masterKey.toString("hex"));
      return { error: "" };
    }

    return { error: "Enter recovery phrase" };
  };

  return { networkKey, getInfoWallet, fetchMasterKey };
};
