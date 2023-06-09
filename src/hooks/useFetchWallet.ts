import { useSessionStorage } from "usehooks-ts";
import { useCallback, useEffect, useState } from "react";
import { KeyPair, getInfoMasterKey, getNodeKey } from "@app/wallet/node-service";
import { get, isEmpty } from "lodash";
import { InfoMasterKey } from "@app/wallet/metadata";

export const useFetchWallet = () => {
  const [masterKey, setMasterKey] = useSessionStorage<KeyPair>("master-key", { ethAddress: "", priKey: "", pubKey: "" });
  const [networkKey, setNetworkKey] = useSessionStorage<KeyPair>("network-key", { ethAddress: "", priKey: "", pubKey: "" });
  // Get info master key
  const getInfoMasterKey = useCallback(async (verifier: string, verifierId: string, idToken: string): Promise<InfoMasterKey | null> => {
    try {
      const networkKey = await getNodeKey(verifier, verifierId, idToken);
      console.log("🚀 ~ file: useFetchWallet.ts:15 ~ getInfoMasterKey ~ networkKey:", networkKey);

      const info = await getInfoMasterKey(verifier, verifierId, idToken);
      return info;
    } catch (error) {
      console.log("🚀 ~ file: useFetchWallet.ts:21 ~ getInfoMasterKey ~ error:", error);
      return null;
    }
  }, []);

  const loginMFA = () => {
    if (isEmpty(networkKey)) {
      // Throw new error
      return;
    }
  };

  const loginDevice = () => {
    // Check local device
    if (isEmpty(networkKey)) {
      // Throw new error
      return;
    }
  };

  //

  return { networkKey, getInfoMasterKey };
};
