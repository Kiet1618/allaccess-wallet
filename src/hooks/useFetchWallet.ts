import { get, isEmpty, map } from "lodash";
import { useSessionStorage } from "usehooks-ts";
import { getNodeKey } from "@app/wallet/node-service";
import { KeyPair } from "@app/wallet/types";
import { InfoMasterKey, ShareInfo, initialedShares, getOrSetInfoMasterKey, createShare, getInfoMasterKey, enabledMasterKeyMFA, sendMailPhrase } from "@app/wallet/metadata";
import { decryptedMessage, encryptedMessage, formatPrivateKey, generateRandomPrivateKey, sharmirCombinePrivateKey, sharmirSplitPrivateKey } from "@app/wallet/algorithm";
import BN from "bn.js";
import { deviceInfo, hexToWords, wordsToHex } from "@app/utils";

export const useFetchWallet = () => {
  const [infoMasterKey, setInfoMasterKey] = useSessionStorage<InfoMasterKey | null>("info-master-key", null);
  const [masterKey, setMasterKey] = useSessionStorage<KeyPair | null>("master-key", null);
  const [networkKey, setNetworkKey] = useSessionStorage<KeyPair | null>("network-key", null);
  const [deviceKey, setDeviceKey] = useSessionStorage<KeyPair | null>("device-key", null);

  // Get info master key
  const getInfoWallet = async (verifier: string, verifierId: string, idToken: string): Promise<{ error: string; info?: InfoMasterKey | null; networkKey?: KeyPair | null; success?: boolean }> => {
    try {
      const networkKey = await getNodeKey(verifier, verifierId, idToken);
      let { error, data: info } = await getOrSetInfoMasterKey(verifier, verifierId, networkKey);
      if (error) throw new Error(error);
      const { masterPrivateKey, masterPublicKey, networkPublicKey } = info as InfoMasterKey;
      // set session storage
      setNetworkKey(networkKey);
      setInfoMasterKey(
        () =>
          ({
            ...info,
          } as InfoMasterKey)
      );

      // First, generate master-key, and initial 2 shares by network key
      if (!info?.initialed) {
        const splits = sharmirSplitPrivateKey(Buffer.from(masterPrivateKey || "", "hex"));

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

        setInfoMasterKey(
          () =>
            ({
              ...info,
              shares: createdShares.data,
            } as InfoMasterKey)
        );
        info!.shares = createdShares.data as ShareInfo[];
      }

      return {
        error: "",
        success: true,
        info,
        networkKey,
      };
    } catch (error) {
      return { error: get(error, "message", "Unknown"), info: null };
    }
  };

  const getInfoWalletByMasterKey = async (networkKey: KeyPair): Promise<{ error: string; info?: InfoMasterKey | null }> => {
    try {
      let { error, data: info } = await getInfoMasterKey(networkKey!);
      if (error) throw new Error(error);
      setInfoMasterKey(info);
      return {
        error: "",
        info,
      };
    } catch (error) {
      return { error: get(error, "message", "Unknown"), info: null };
    }
  };

  /**
   * TODO: Using session storage error because it async
   * @param infoMasterKey
   * @returns
   */
  const fetchMasterKey = async (infoMasterKey: InfoMasterKey, networkKey: KeyPair): Promise<{ error?: string; success?: boolean; mfa?: boolean }> => {
    try {
      if (isEmpty(networkKey)) {
        throw new Error("Please initial network key before");
      }
      if (isEmpty(infoMasterKey)) {
        throw new Error("Please initial master key before");
      }
      const { mfa, initialed, shares } = infoMasterKey as InfoMasterKey;
      if (!initialed) {
        throw new Error("Please initial shares of master key before");
      }

      // Always get from device first
      if (!isEmpty(deviceKey)) {
        const deviceShare = shares?.find(share => {
          return share.publicKey.toLowerCase().padStart(130, "0") === deviceKey.pubKey?.padStart(130, "0") && share.type === "device";
        });
        if (isEmpty(deviceShare)) {
          setDeviceKey(null);
          throw new Error("Device share not existed");
        }
        const networkShare = shares?.find(share => {
          return share.publicKey.toLowerCase().padStart(130, "0") === networkKey.pubKey?.padStart(130, "0") && share.type === "network-key";
        });
        if (isEmpty(networkShare)) {
          throw new Error("Network share not existed");
        }

        // Set private keys
        deviceShare.priKey = deviceKey.priKey;
        networkShare.priKey = networkKey.priKey;

        const decryptedShares = await Promise.all(
          [networkShare, deviceShare].map(async elm => {
            const data = await decryptedMessage(new BN(elm.priKey || "", "hex"), elm?.shareData ?? ({} as any));
            return data as Buffer;
          })
        );
        const masterKey = sharmirCombinePrivateKey(decryptedShares);
        const masterKeyFormatted = formatPrivateKey(new BN(masterKey, "hex"));
        if (masterKeyFormatted.pubKey?.toLowerCase() !== infoMasterKey.masterPublicKey.toLowerCase()) {
          throw new Error("Something went wrong, master public key not match with default");
        }
        setMasterKey(masterKeyFormatted);
        return { error: "", success: true, mfa: false };
      }

      if (!mfa) {
        const networkShares = shares?.filter(share => {
          return share.publicKey.toLowerCase().padStart(130, "0") === networkKey.pubKey?.padStart(130, "0") && share.type === "network-key";
        });
        if (networkShares && networkShares?.length < 2) {
          throw new Error("Cannot combine from network share");
        }
        const decryptedShares = await Promise.all(
          (networkShares || []).map(async elm => {
            return (await decryptedMessage(new BN(networkKey.priKey, "hex"), elm.shareData ?? ({} as any))) as Buffer;
          })
        );
        const masterKey = sharmirCombinePrivateKey(decryptedShares);
        const masterKeyFormatted = formatPrivateKey(new BN(masterKey, "hex"));
        if (masterKeyFormatted.pubKey?.toLowerCase() !== infoMasterKey.masterPublicKey.toLowerCase()) {
          throw new Error("Something went wrong, master public key not match with default");
        }
        setMasterKey(masterKeyFormatted);

        // Add device key share
        const deviceKey = formatPrivateKey(generateRandomPrivateKey());
        const deviceShare = await encryptedMessage(decryptedShares[1], new BN(deviceKey.priKey, "hex"));

        createShare({
          masterPublicKey: infoMasterKey.masterPublicKey,
          publicKey: deviceShare.publicKey,
          encryptedData: deviceShare.encryptedToString,
          signature: deviceShare.signature,
          type: "device",
          deviceInfo: await deviceInfo(),
        });
        setDeviceKey(deviceKey);
        return { error: "", success: true, mfa: false };
      }

      // Case if user enable MFA
      return { error: "", success: true, mfa: true };
    } catch (error) {
      setMasterKey(null);
      setDeviceKey(null);
      setNetworkKey(null);
      return { error: get(error, "message") };
    }
  };

  const fetchMasterKeyWithPhrase = async (phrase: string) => {
    try {
      if (isEmpty(infoMasterKey)) {
        throw new Error("Please initial master key before");
      }
      if (!infoMasterKey.mfa) {
        throw new Error("Please enable mfa");
      }
      if (isEmpty(networkKey)) {
        throw new Error("Please initial network key before");
      }
      const { shares } = infoMasterKey;
      const networkShare = shares?.find(share => {
        return share.publicKey.toLowerCase().padStart(130, "0") === networkKey.pubKey?.padStart(130, "0") && share.type === "network-key";
      });
      if (isEmpty(networkShare)) {
        throw new Error("Network share not existed");
      }
      const recoveryKey = formatPrivateKey(new BN(wordsToHex(phrase), "hex"));
      const recoveryShare = shares?.find(share => {
        return share.publicKey.toLowerCase().padStart(130, "0") === recoveryKey.pubKey?.padStart(130, "0") && share.type === "recovery-phrase";
      });
      if (isEmpty(recoveryShare)) {
        throw new Error("Recovery share not existed");
      }
      // Set private keys
      networkShare.priKey = networkKey.priKey;
      recoveryShare.priKey = recoveryKey.priKey;

      const decryptedShares = await Promise.all(
        [networkShare, recoveryShare].map(async elm => {
          const data = await decryptedMessage(new BN(elm.priKey || "", "hex"), elm?.shareData ?? ({} as any));
          return data as Buffer;
        })
      );
      const masterKey = sharmirCombinePrivateKey(decryptedShares);
      const masterKeyFormatted = formatPrivateKey(new BN(masterKey, "hex"));
      if (masterKeyFormatted.pubKey?.toLowerCase() !== infoMasterKey.masterPublicKey.toLowerCase()) {
        throw new Error("Something went wrong, master public key not match with default");
      }
      setMasterKey(masterKeyFormatted);
      // set device
      // Add device key share
      const deviceKey = formatPrivateKey(generateRandomPrivateKey());
      const deviceShare = await encryptedMessage(decryptedShares[1], new BN(deviceKey.priKey, "hex"));

      createShare({
        masterPublicKey: infoMasterKey.masterPublicKey,
        publicKey: deviceShare.publicKey,
        encryptedData: deviceShare.encryptedToString,
        signature: deviceShare.signature,
        type: "device",
        deviceInfo: await deviceInfo(),
      });
      setDeviceKey(deviceKey);
      return { error: "", success: true, mfa: false };
    } catch (error) {
      return { error: get(error, "message", "") };
    }
  };

  const enableMFA = async (email: string): Promise<{ error: string; success?: boolean }> => {
    try {
      if (isEmpty(masterKey)) {
        throw new Error("Master key not found");
      }
      if (isEmpty(infoMasterKey)) {
        throw new Error("Please initial master key before");
      }
      if (infoMasterKey.mfa) {
        throw new Error("Enabled mfa");
      }
      if (isEmpty(networkKey)) {
        throw new Error("Please initial network key before");
      }
      const { priKey: masterPrivateKey, pubKey: masterPublicKey } = masterKey;
      // Split shares
      const splits = sharmirSplitPrivateKey(Buffer.from(masterPrivateKey, "hex"));
      // Encrypted by network key
      const networkShare = await encryptedMessage(splits[0], new BN(networkKey.priKey, "hex"));
      // Encrypted by device key
      const deviceKey = formatPrivateKey(generateRandomPrivateKey());
      const deviceShare = await encryptedMessage(splits[1], new BN(deviceKey.priKey, "hex"));
      // Encrypted by recovery key
      // Generate 24 words
      const recoveryKey = formatPrivateKey(generateRandomPrivateKey());
      const phrase = hexToWords(recoveryKey.priKey);
      const recoveryShare = await encryptedMessage(splits[1], new BN(recoveryKey.priKey, "hex"));

      const shares = [
        {
          masterPublicKey: masterPublicKey,
          publicKey: networkShare.publicKey,
          encryptedData: networkShare.encryptedToString,
          type: "network-key" as ShareInfo["type"],
        },
        {
          masterPublicKey: masterPublicKey,
          publicKey: deviceShare.publicKey,
          encryptedData: deviceShare.encryptedToString,
          deviceInfo: await deviceInfo(),
          type: "device" as ShareInfo["type"],
        },
        {
          masterPublicKey: masterPublicKey,
          publicKey: recoveryShare.publicKey,
          encryptedData: recoveryShare.encryptedToString,
          email,
          type: "recovery-phrase" as ShareInfo["type"],
        },
      ];
      const encrypted = await encryptedMessage(Buffer.from(Date.now().toString()), new BN(networkKey.priKey, "hex"));
      const enabledMFA = await enabledMasterKeyMFA({
        masterPublicKey: masterPublicKey!,
        networkPublicKey: encrypted.publicKey,
        encryptedData: encrypted.encryptedToString,
        signature: encrypted.signature,
        networkShare: shares[0],
        deviceShare: shares[1],
        recoveryShare: shares[2],
      });
      // Send mail

      setDeviceKey(deviceKey);
      await sendMailPhrase({
        email,
        phrase,
      });

      return { error: "" };
    } catch (error) {
      return { error: get(error, "message", "") };
    }
  };

  return { getInfoWallet, getInfoWalletByMasterKey, fetchMasterKey, enableMFA, fetchMasterKeyWithPhrase };
};
