



// Inicializar Firebase
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

// Inicializar messaging
const messaging = firebase.messaging();




navigator.serviceWorker.register('/disagro_beta/firebase-messaging-sw.js')
  .then(registration => {
    console.log('Service Worker registrado correctamente:', registration);

    return Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        return messaging.getToken({
          vapidKey: 'BKnh82NuB0_Ni49Q2zLorbMWmw64zCQYOqYkU5Y6u_x-R4GLyAogHJMDA6Nx7U6tD86h2zeqvDQRWBnAi5eH9mM',
          serviceWorkerRegistration: registration  // ✅ AQUI LE DICES CUAL USAR
        });
      } else {
        throw new Error('Permiso de notificación denegado');
      }
    });
  })
  .then(token => {
    console.log('Token FCM:', token);
    alert(token);
  })
  .catch(err => {
    console.error('Error durante el registro o al obtener el token:', err);
  });
