// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.2/firebase-messaging.js");
// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyBYhJEVhj3Fu3z0UeCD0TyaKXYElJy40KE",
  authDomain: "allaccess-one.firebaseapp.com",
  projectId: "allaccess-one",
  storageBucket: "allaccess-one.appspot.com",
  messagingSenderId: "791661831404",
  appId: "1:791661831404:web:5484d30da64d36b2c971c9",
  measurementId: "G-PHGT9BVR2G",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  const channel = new BroadcastChannel("notifications");
  channel.postMessage(payload);

  self.registration.showNotification(notificationTitle, notificationOptions);
});
