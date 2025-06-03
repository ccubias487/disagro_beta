

document.getElementById("bt-ingresar").addEventListener("click", function () {

  function esDispositivoMovil() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }



  document.getElementById("imagen_login").style.backgroundImage = 'url("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/consultando2.png")';
  document.getElementById("mensaje").innerHTML = "Espere un momento estamos consultando los datos..."

  setTimeout(function () {
    fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/user_critico.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        let usuario = (document.getElementById("user").value).toUpperCase()
        let password = (document.getElementById("password").value).toUpperCase()

        console.log(usuario)
        console.log(password)
        let ingreso = false

        for (let i in data) {
          if (data[i].USUARIO == usuario && data[i].CONTRASEÑA == password) {
            localStorage.setItem("usuario_critico", data[i].USUARIO)
            localStorage.setItem("nombre_critico", data[i].NOMBRE)
            localStorage.setItem("pais", data[i].PAIS)
            localStorage.setItem("region", data[i].PLANTA)
            ingreso = true
            localStorage.setItem("region_critico_planta","EL SALVADOR / ACAJUTLA")
            localStorage.setItem("mostrar_critico","SV_A")
            if (esDispositivoMovil()) {
              window.location.href = "mostrar_critico_mobile.html";
            } else {
              window.location.href = "importar_critico.html";
            }
          } 

        }

        if(!ingreso) {
            document.getElementById("imagen_login").style.backgroundImage = 'url("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/empty1.png")';
            document.getElementById("mensaje").innerHTML = "LOS DATOS INGRESADOS SON INCORRECTOS"
            document.getElementById("mensaje").style.color = "red"
            document.getElementById("mensaje").style.fontWeight = "bold"

            setTimeout(function () {
              document.getElementById("imagen_login").style.backgroundImage = 'url("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/escribiendo.png")';
              document.getElementById("mensaje").innerHTML = "Ingresa tus datos para iniciar sesion"
              document.getElementById("mensaje").style.color = "white"
              document.getElementById("mensaje").style.fontWeight = "normal"


            }, 3000)
          }


      })

  }, 2000)
})
