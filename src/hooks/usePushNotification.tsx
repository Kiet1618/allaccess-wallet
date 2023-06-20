import { useEffect, useState } from "react";
import { getTokenFCM, onMessageListener } from "@app/configs/firebase"; // import from your firebase file
import { MessagePayload } from "firebase/messaging"; // import from your firebase file

export function usePushNotifications(callback?: (_: MessagePayload) => void) {
  const [token, setToken] = useState("");

  useEffect(() => {
    getTokenFCM()
      .then(token => {
        setToken(token);
      })
      .catch(error => console.error(error));
  }, []);

  // Handle insert token by master public key
  onMessageListener().then(data => {
    console.log("Receive foreground: ", JSON.parse(data.notification?.body || "{}"));
    if (typeof callback === "function") callback(data);
  });

  return { token, onMessageListener };
}
