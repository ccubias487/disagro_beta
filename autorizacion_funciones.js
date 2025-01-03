document.getElementById("inicio").addEventListener("click", function () {
  window.location.href = "index.html";
})



document.getElementById("boton_agregar").addEventListener("click", function () {
 // window.location.href = "existencias.html";




 const fechaActual = new Date();

      // Obtener fecha y hora formateada
      const dia = fechaActual.getDate().toString().padStart(2, '0');
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
      const año = fechaActual.getFullYear();

      const horas = fechaActual.getHours().toString().padStart(2, '0');
      const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
      const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

      // Formatear la fecha y hora
      const fechaFormateada = `${dia}/${mes}/${año}`;
      const horaFormateada = `${horas}:${minutos}:${segundos}`;
      let material = JSON.parse(localStorage.getItem("autorizaciones"))

       fechafin= new Date (`${fechaFormateada} ${horaFormateada}`)
fechainicio= new Date (material[0].INICIO)

diferenciaMs=fechafin-fechainicio

const totalSegundos = Math.floor(diferenciaMs / 1000);
const horass = Math.floor(totalSegundos / 3600);
const minutoss = Math.floor((totalSegundos % 3600) / 60);
const segundoss = totalSegundos % 60;

// Formatear a hh:mm:ss
const formatoTiempo = `${horass.toString().padStart(2, '0')}:${minutoss.toString().padStart(2, '0')}:${segundoss.toString().padStart(2, '0')}`;


console.log(diferenciaMs)
console.log(formatoTiempo)

      console.log(material[0].INICIO)
      console.log(`${fechaFormateada} ${horaFormateada}`)
})


document.getElementById("titulo_logo").innerHTML = localStorage.getItem("iniciar_orden_d")
let orden = localStorage.getItem("iniciar_orden")


fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/autorizacion.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const jsondata = data.sort((a, b) => {
      return parseInt(a.PRIORIDAD) - parseInt(b.PRIORIDAD);
    });
    function hora(i) {
      const fechaActual = new Date();

      // Obtener fecha y hora formateada
      const dia = fechaActual.getDate().toString().padStart(2, '0');
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
      const año = fechaActual.getFullYear();

      const horas = fechaActual.getHours().toString().padStart(2, '0');
      const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
      const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

      // Formatear la fecha y hora
      const fechaFormateada = `${dia}/${mes}/${año}`;
      const horaFormateada = `${horas}:${minutos}:${segundos}`;

      let material = JSON.parse(localStorage.getItem("autorizaciones"))
      
      if ((localStorage.getItem("autorizaciones")) == null) {
        if (material[i].hasOwnProperty("INICIO") == false) {
          
          console.log("aqui1")
          const nuevoDato = { ORDEN: datosJSON[i].ORDEN, DETALLE: datosJSON[i].DETALLE, STATUS: datosJSON[i].STATUS, INICIO: `${fechaFormateada} ${horaFormateada}` };
          datosJSON = datosJSON.sort((a, b) => {
            return parseInt(a.ORDEN) - parseInt(b.ORDEN);
          });
          datosJSON.push(nuevoDato);
          localStorage.setItem("autorizaciones", JSON.stringify(datosJSON))
        }
      } else {
        if (material[i].hasOwnProperty("INICIO") == false) {
          const nuevoDato = { ORDEN: material[i].ORDEN, DETALLE: material[i].DETALLE, STATUS: material[i].STATUS, INICIO: `${fechaFormateada} ${horaFormateada}` };
          datosJSON = datosJSON.filter(item => item.ORDEN !== material[i].ORDEN);
          datosJSON.push(nuevoDato);
          datosJSON2 = datosJSON.sort((a, b) => {
            return Number(a.ORDEN) - Number(b.ORDEN);
          });
          localStorage.setItem("autorizaciones", JSON.stringify(datosJSON))
        }
      }

    }


    //console.log(jsondata)
    const container = document.getElementById('actividades_asignadas');
    let contador = 1
    let datosJSON = [];
    function iniciar() {
      let material = JSON.parse(localStorage.getItem("autorizaciones"))
      
      if ((localStorage.getItem("autorizaciones")) == null) {
        if (material[i].hasOwnProperty("INICIO") == false) {
          
          console.log("aqui1")
          const nuevoDato = { ORDEN: datosJSON[i].ORDEN, DETALLE: datosJSON[i].DETALLE, STATUS: datosJSON[i].STATUS };
          datosJSON = datosJSON.sort((a, b) => {
            return parseInt(a.ORDEN) - parseInt(b.ORDEN);
          });
          datosJSON.push(nuevoDato);
          localStorage.setItem("autorizaciones", JSON.stringify(datosJSON))
        }
      } else {
        if (material[i].hasOwnProperty("INICIO") == false) {
          const nuevoDato = { ORDEN: material[i].ORDEN, DETALLE: material[i].DETALLE, STATUS: material[i].STATUS };
          datosJSON = datosJSON.filter(item => item.ORDEN !== material[i].ORDEN);
          datosJSON.push(nuevoDato);
          datosJSON2 = datosJSON.sort((a, b) => {
            return Number(a.ORDEN) - Number(b.ORDEN);
          });
          localStorage.setItem("autorizaciones", JSON.stringify(datosJSON))
        }
      }

    }

    for (let i in jsondata ) {

      function iniciar_orden() {
        localStorage.setItem("iniciar_orden_hr", jsondata[i].HOJARUTA)
      }


      let material = JSON.parse(localStorage.getItem("autorizaciones"))
      
      if ((localStorage.getItem("autorizaciones")) == null) {
          
          console.log("aqui1")
          const nuevoDato = { ORDEN: jsondata[i].ORDEN, DETALLE: jsondata[i].DETALLE, STATUS: jsondata[i].STATUS };
          datosJSON = datosJSON.sort((a, b) => {
            return parseInt(a.ORDEN) - parseInt(b.ORDEN);
          });
          datosJSON.push(nuevoDato);
          localStorage.setItem("autorizaciones", JSON.stringify(datosJSON))
        
      } else {
        console.log(material)
        //if (material[i].hasOwnProperty("INICIO") == false) {
          const nuevoDato = { ORDEN: jsondata[i].ORDEN, DETALLE: jsondata[i].DETALLE, STATUS: jsondata[i].STATUS };
          datosJSON = datosJSON.filter(item => item.ORDEN !== jsondata[i].ORDEN);
          datosJSON.push(nuevoDato);
          datosJSON2 = datosJSON.sort((a, b) => {
            return Number(a.ORDEN) - Number(b.ORDEN);
          });
          localStorage.setItem("autorizaciones", JSON.stringify(datosJSON))
        //}
      }



      contador = contador + 1
      if (Number(jsondata[i].CANTIDAD) > Number(jsondata[i].EXISTENCIA)) {
        document.getElementById("insumos" + i).style.backgroundColor = "rgb(147, 81, 85)"
      }
    }
    datosJSON = (JSON.parse(localStorage.getItem("autorizaciones")))
    datosJSON = datosJSON.sort((a, b) => {
      return parseInt(a.ORDEN) - parseInt(b.ORDEN);
    });
    for (let j in datosJSON) {

      const div = document.createElement('div');
      div.id = "insumos" + j

      div.className = 'cuadro_resumen_insumos';
      div.innerHTML = '<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">ORDEN : &nbsp &nbsp' + datosJSON[j].ORDEN + '</div><div class="titulo_resumen_ordenes">DESCRIPCION: &nbsp &nbsp' + (datosJSON[j].DETALLE).substring(0, 28) + '</div><div class="titulo_resumen_ordenes">STATUS : &nbsp &nbsp' + datosJSON[j].STATUS + '</div></div></div>'
      div.onclick = function () { hora(j) }
      container.appendChild(div)

    }
    function numeroAleatorio(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (contador == 1) {

      let aleatorio_image = "https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/empty" + numeroAleatorio(1, 3) + ".png"

      const div = document.getElementById("no_encontrado");
      const imagen = document.createElement("img");
      imagen.src = aleatorio_image
      imagen.alt = "No encontrado";
      imagen.style.width = "400px";
      imagen.style.height = "400px";
      div.appendChild(imagen);
      document.getElementById("no_encontrado_texto").innerHTML = "NO SE ENCOTRARON INSUMOS PARA ESTA ORDEN"
      document.getElementById("no_encontrado_texto").style.fontSize = "xx-large"
      document.getElementById("no_encontrado_texto").style.fontWeight = "bold"
      document.getElementById("no_encontrado_texto").style.color = "White"
      document.getElementById("boton_siguiente").innerHTML = "Iniciar orden"
    }
  })