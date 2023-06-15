import { useEffect, useState } from "react";
import { messaging, getTokenFCM, onMessageListener } from "@app/configs/firebase"; // import from your firebase file

export function usePushNotifications() {
  const [token, setToken] = useState("");

  useEffect(() => {
    getTokenFCM()
      .then(token => {
        setToken(token);
      })
      .catch(error => console.error(error));
  }, []);

  // Handle insert token by master public key
  useEffect(() => {
    onMessageListener().then(data => {
      console.log("Receive foreground: ", data);
    });
  });

  // Handle detect new device, and verify it
  useEffect(() => {
    onMessageListener().then(data => {
      console.log("Receive foreground: ", data);
    });
  });

  return { token };
}
