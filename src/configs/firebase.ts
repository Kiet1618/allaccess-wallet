export const firebaseConfig = {
  apiKey: "AIzaSyBYhJEVhj3Fu3z0UeCD0TyaKXYElJy40KE",
  authDomain: "allaccess-one.firebaseapp.com",
  projectId: "allaccess-one",
  storageBucket: "allaccess-one.appspot.com",
  messagingSenderId: "791661831404",
  appId: "1:791661831404:web:5484d30da64d36b2c971c9",
  measurementId: "G-PHGT9BVR2G",
};

import { initializeApp } from "@firebase/app";
import { getMessaging, getToken, onMessage } from "@firebase/messaging";
const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

export const getTokenFCM = async () => {
  const token = await getToken(messaging, { vapidKey: "BPYTJ9zPkpaRL4iGagDAFiAeQ_9zQsPg0N51-sf0JTBrjfAFdDgd-o3RlkkMLR_fly2oKkEpnyZR_lamgAFiDo0" });
  return token;
};

export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      resolve(payload);
    });
  });
