// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/11.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging-compat.js");

if (!firebase.apps.length) {
firebase.initializeApp({
  apiKey: "AIzaSyCqafxFuN5Siu1HqqDdBHHsJQczarutnOw",
  authDomain: "disagroapp-a7fec.firebaseapp.com",
  projectId: "disagroapp-a7fec",
  messagingSenderId: "841529436199",
  appId: "1:841529436199:web:544f9a3fec62025f8d0602",
})} else {
  firebase.app(); // usa la app ya inicializada
};


const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png"
  });
});

