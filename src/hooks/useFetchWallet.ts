import { useCallback, useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { useSessionStorage } from "usehooks-ts";
import { KeyPair, getInfoMasterKey, getNodeKey } from "@app/wallet/node-service";
import { InfoMasterKey, ShareInfo, getSharesByMasterPublicKey } from "@app/wallet/metadata";
import { info } from "console";

export const useFetchWallet = () => {
  const [infoMasterKey, setInMasterKey] = useSessionStorage<InfoMasterKey | null>("info-master-key", null);
  const [masterKey, setMasterKey] = useSessionStorage<KeyPair>("master-key", { ethAddress: "", priKey: "", pubKey: "" });
  const [sharesInfo, setSharesInfo] = useSessionStorage<ShareInfo[]>("shares", []);
  const [networkKey, setNetworkKey] = useSessionStorage<KeyPair>("network-key", { ethAddress: "", priKey: "", pubKey: "" });
  const [deviceKey, setDeviceKey] = useSessionStorage<KeyPair>("device-key", { ethAddress: "", priKey: "", pubKey: "" });
  // Get info master key
  const getInfoWallet = useCallback(async (verifier: string, verifierId: string, idToken: string): Promise<{ error: string; info: InfoMasterKey | null }> => {
    try {
      const networkKey = await getNodeKey(verifier, verifierId, idToken);
      let info = await getInfoMasterKey(verifier, verifierId, networkKey);
      const { error, data: shares } = await getSharesByMasterPublicKey({ masterPublicKey: info.masterPublicKey });
      if (error) {
        throw new Error(error);
      }
      // Is MFA by check existed share type "recovery"
      const isMfa = shares.findIndex(share => share.type === "recovery-phrase");

      info = {
        ...info,
        mfa: isMfa < 0 ? false : true,
      };
      setNetworkKey(networkKey);
      setSharesInfo(shares);
      setInMasterKey(info);

      return {
        error: "",
        info,
      };
    } catch (error) {
      return { error: get(error, "message", "Unknown"), info: null };
    }
  }, []);

  const loginWithRecovery = () => {
    if (isEmpty(networkKey)) {
      // Throw new error
      return;
    }
  };

  const loginWithDevice = async (): Promise<{ error: string }> => {
    if (isEmpty(networkKey)) {
      // Throw new error
      return { error: "Not found network key" };
    }
    // Check local device
    if (isEmpty(deviceKey)) {
      // Throw new error
      return { error: "Not found device" };
    }
    const { mfa } = infoMasterKey as InfoMasterKey;

    return { error: "Not found device" };
  };

  //

  return { networkKey, getInfoWallet, loginWithDevice };
};
