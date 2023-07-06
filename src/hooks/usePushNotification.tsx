import { useEffect, useState } from "react";
import { getTokenFCM, onMessageListener } from "@app/configs/firebase"; // import from your firebase file
import { MessagePayload } from "firebase/messaging"; // import from your firebase file
import { useLocalStorage } from "usehooks-ts";
import { KeyPair } from "@app/wallet/types";
import { isEmpty } from "lodash";
import { insertTokenByMasterPublicKey } from "@app/wallet/metadata";

export function usePushNotifications(callback?: (_: MessagePayload) => void) {
  const [token, setToken] = useState("");
  const [masterKey, _] = useLocalStorage<KeyPair | null>("master-key", null);

  const handleGetTokenFCM = async () => {
    const token = await getTokenFCM();
    return token;
  };

  useEffect(() => {
    if (Notification.permission === "granted") {
      handleGetTokenFCM().then(token => {
        if (!isEmpty(masterKey)) {
          insertTokenByMasterPublicKey({ token, masterPublicKey: masterKey.pubKey! });
        }
      });
    }
  }, []);

  useEffect(() => {
    handleGetTokenFCM().then(token => setToken(token));
  }, []);

  // Handle insert token by master public key
  onMessageListener().then(data => {
    console.log("Receive foreground: ", JSON.parse(data.notification?.body || "{}"));
    if (typeof callback === "function") callback(data);
  });

  return { token, onMessageListener };
}
