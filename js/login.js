

document.getElementById("bt-ingresar").addEventListener("click", function(){

    document.getElementById("imagen_login").style.backgroundImage ='url("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/consultando2.png")';
    document.getElementById("mensaje").innerHTML="Espere un momento estamos consultando los datos..."

    setTimeout(function() {
    fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/user.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
let usuario=document.getElementById("user").value
let password=(document.getElementById("password").value).toUpperCase()

console.log(usuario)
console.log(password)

for (let i in data) {
if(data[i].USUARIO==usuario && data[i].CONTRASEÑA==password){
    localStorage.setItem("usuario", data[i].NICK)
    localStorage.setItem("nombre", data[i].NOMBRE)  
    localStorage.setItem("cod_empleado", data[i].USUARIO) 
    localStorage.setItem("usuario_tipo", data[i].TIPO) 
    window.location.href = "principal.html";
}else{
    document.getElementById("imagen_login").style.backgroundImage ='url("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/empty1.png")';
    document.getElementById("mensaje").innerHTML="LOS DATOS INGRESADOS SON INCORRECTOS"
    document.getElementById("mensaje").style.color="red"
    document.getElementById("mensaje").style.fontWeight="bold"
    
     setTimeout(function() {
        document.getElementById("imagen_login").style.backgroundImage ='url("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/escribiendo.png")';
        document.getElementById("mensaje").innerHTML="Ingresa tus datos para iniciar sesion"
        document.getElementById("mensaje").style.color="white"
        document.getElementById("mensaje").style.fontWeight="normal"
    

      }, 3000)
}

}


        })

    }, 2000)
})
