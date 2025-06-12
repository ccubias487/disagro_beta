const messaging = firebase.messaging();

// Solicitar permiso
messaging
  .requestPermission()
  .then(() => {
    return messaging.getToken({
      vapidKey: "TU_CLAVE_VAPID_PUBLICA", // Está en Firebase Console → Cloud Messaging
    });
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log("Token del navegador:", currentToken);
      // Puedes enviarlo a tu backend o guardarlo en Firebase Realtime Database
    } else {
      console.log("No se obtuvo token.");
    }
  })
  .catch((err) => {
    console.error("Error al obtener token o permisos", err);
  });


  messaging.onMessage((payload) => {
  console.log("Mensaje en primer plano:", payload);

  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png"
  });
});




