import { useCallback } from "react";
import { get, isEmpty, map } from "lodash";
import { useSessionStorage } from "usehooks-ts";
import { KeyPair, getInfoMasterKey, getNodeKey } from "@app/wallet/node-service";
import { InfoMasterKey, ShareInfo, initialedShares } from "@app/wallet/metadata";
import { combineTest1, encryptedMessage } from "@app/wallet/algorithm";
import { BN } from "bn.js";

export const useFetchWallet = () => {
  const [infoMasterKey, setInMasterKey] = useSessionStorage<InfoMasterKey | null>("info-master-key", null);
  const [masterKey, setMasterKey] = useSessionStorage<KeyPair>("master-key", { ethAddress: "", priKey: "", pubKey: "" });
  const [networkKey, setNetworkKey] = useSessionStorage<KeyPair>("network-key", { ethAddress: "", priKey: "", pubKey: "" });
  const [deviceKey, setDeviceKey] = useSessionStorage<KeyPair>("device-key", { ethAddress: "", priKey: "", pubKey: "" });

  // Get info master key
  const getInfoWallet = useCallback(async (verifier: string, verifierId: string, idToken: string): Promise<{ error: string; info: InfoMasterKey | null }> => {
    try {
      const networkKey = await getNodeKey(verifier, verifierId, idToken);
      const info = await getInfoMasterKey(verifier, verifierId, networkKey);

      // set session storage
      setNetworkKey(networkKey);
      setInMasterKey(info);

      // First, generate master-key, and initial 2 shares by network key
      if (!info.initialed) {
        const share1 = await encryptedMessage(Buffer.from("share1"), new BN(networkKey.priKey, "hex"));
        const share2 = await encryptedMessage(Buffer.from("share2"), new BN(networkKey.priKey, "hex"));
        const shares = map([share1, share2], share => {
          return {
            masterPublicKey: info.masterPublicKey,
            publicKey: info.networkPublicKey,
            encryptedData: share.encryptedToString,
            type: "network-key" as ShareInfo["type"],
          };
        });
        const encrypted = await encryptedMessage(Buffer.from(Date.now().toString()), new BN(networkKey.priKey, "hex"));
        await initialedShares({
          masterPublicKey: info.masterPublicKey,
          networkPublicKey: encrypted.publicKey,
          shares,
          encryptedData: encrypted.encryptedToString,
          signature: encrypted.signature,
        });
      }

      return {
        error: "",
        info,
      };
    } catch (error) {
      return { error: get(error, "message", "Unknown"), info: null };
    }
  }, []);

  const login = useCallback(async (): Promise<{ error: string }> => {
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
      }

      // combine
      const masterKey = combineTest1(new BN(infoMasterKey.masterPublicKey, "hex"));
      return { error: "" };
    }

    if (!mfa) {
      const sharesByNetworkKey = shares?.filter(share => {
        return share.publicKey.toLowerCase().padStart(130, "0") === deviceKey.pubKey?.padStart(130, "0") && share.type === "network-key";
      });
      return { error: "" };
    }

    return { error: "Enter recovery phrase" };
  }, []);

  return { networkKey, getInfoWallet, login };
};
