
  // Inicializa EmailJS con tu clave pública (user/public key)
  (function(){
    emailjs.init('MCcn2qH7970fj-MGR'); // ejemplo: 'yXxYzXxY123ABC'
  })();

  function enviarCorreo() {
    const params = {
      nombre: "Juan Pérez",
      correo: "juan@example.com",
      mensaje: "Hola, este es un mensaje de prueba desde EmailJS con plantilla."
    };

    // Reemplaza 'tu_service_id' y 'tu_template_id' con tus valores reales
    emailjs.send('service_t5o7zyj', 'template_vdpy7bm', params)
      .then(function(response) {
        console.log("Correo enviado con éxito", response.status, response.text);
        alert("✅ Correo enviado correctamente.");
      }, function(error) {
        console.error("Error al enviar el correo", error);
        alert("❌ Hubo un error al enviar el correo.");
      });
  }


  



