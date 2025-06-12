/* importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js');
 */
firebase.initializeApp({
  apiKey: "AIzaSyCqafxFuN5Siu1HqqDdBHHsJQczarutnOw",
  authDomain: "disagroapp-a7fec.firebaseapp.com",
  projectId: "disagroapp-a7fec",
  messagingSenderId: "841529436199",
  appId: "1:841529436199:web:544f9a3fec62025f8d0602",
});

const messaging = firebase.messaging();

// Este bloque muestra la notificación cuando llega en segundo plano
messaging.onBackgroundMessage(function(payload) {
  console.log("[firebase-messaging-sw.js] Mensaje recibido:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png", // Opcional
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});




