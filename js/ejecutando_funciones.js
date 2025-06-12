if (localStorage.getItem("usuario") == null) {
  window.location.href = "index.html";
}

document.getElementById("inicio").addEventListener("click", function () {
  window.location.href = "principal.html";
})

let ejecutando = localStorage.getItem("proceso")
let ejecutando_orden = JSON.parse(localStorage.getItem("orden_ejecucion"))




datosJSON = []

if ((ejecutando_orden) == null) {
  const nuevoDato = { ORDEN: localStorage.getItem("iniciar_orden") };
  datosJSON = datosJSON.sort((a, b) => {
    return parseInt(a.ORDEN) - parseInt(b.ORDEN);
  });
  datosJSON.push(nuevoDato);
  localStorage.setItem("orden_ejecucion", JSON.stringify(datosJSON))
  ejecutando_orden = JSON.parse(localStorage.getItem("orden_ejecucion"))
  localStorage.setItem("proceso", ejecutando_orden.length)
} else {
  datosJSON = ejecutando_orden
  const nuevoDato = { ORDEN: localStorage.getItem("iniciar_orden") };
  datosJSON = datosJSON.filter(item => item.ORDEN !== localStorage.getItem("iniciar_orden"));
  datosJSON.push(nuevoDato);
  datosJSON2 = datosJSON.sort((a, b) => {
    return Number(a.ORDEN) - Number(b.ORDEN);
  });
  localStorage.setItem("orden_ejecucion", JSON.stringify(datosJSON))
  ejecutando_orden = JSON.parse(localStorage.getItem("orden_ejecucion"))
  localStorage.setItem("proceso", ejecutando_orden.length)
}





document.getElementById("boton_finalizar").addEventListener("click", function () {


  window.location.href = "reporte.html";
})

function sumarTiempos(t1, t2) {
  const [h1, m1, s1] = t1.split(":").map(Number);
  const [h2, m2, s2] = t2.split(":").map(Number);

  let totalSegundos = s1 + s2;
  let totalMinutos = m1 + m2 + Math.floor(totalSegundos / 60);
  let totalHoras = h1 + h2 + Math.floor(totalMinutos / 60);

  totalSegundos %= 60;
  totalMinutos %= 60;
  totalHoras %= 24; // Si quieres limitar a 24h, o quita esto si no hay límite

  // Formateo con ceros delante
  const pad = num => String(num).padStart(2, '0');

  return `${pad(totalHoras)}:${pad(totalMinutos)}:${pad(totalSegundos)}`;
}

function tiempo_orden() {
  const ahora = new Date();
  let tiempo_atras = localStorage.getItem("tiempo_atras") || "00:00:00";
  if ((tiempo_atras == undefined) || (tiempo_atras == "undefined")) {
    tiempo_atras = "00:00:00"
  }
  orden = (JSON.parse(localStorage.getItem("autorizaciones")))

  let reloj = document.getElementById("icono_reloj")

  for (k in orden) {
    if (orden[k].ORDEN == localStorage.getItem("iniciar_orden")) {
      console.log("fecha_inicio: ", orden[k].INICIO)
      const diferencia = calcularDiferenciaTiempo(orden[k].INICIO, fecha_actual());
      const tiempo_anterior = sumarTiempos(diferencia, tiempo_atras)
      document.getElementById("tiempo").innerHTML = "Fecha de inicio : " + localStorage.getItem("fecha_inicio_orden") + "<br> Tiempo de ejecucion " + tiempo_anterior
      localStorage.setItem("tiempo_orden", tiempo_anterior)
      break
      // console.log("Diferencia de tiempo:", diferencia);
    }

  }


}

/* setInterval(tiempo_orden, 1000); */

document.getElementById("titulo_logo").innerHTML = localStorage.getItem("iniciar_orden_d")
document.getElementById("subtitulo_logo").innerHTML = "ORDEN " + localStorage.getItem("iniciar_orden") + " INICIADA"
document.getElementById("subtitulo_logo").style.fontSize = "2.0rem"
document.getElementById("titulo_tiempo").style.fontSize = "2.0rem"
document.getElementById("tiempo").style.fontSize = "2.0rem"
document.getElementById("titulo_tiempo").style.marginTop = "25px"
document.getElementById("caja_botones").style.paddingBottom = "300px"


function fecha_actual() {
  const fechaActual = new Date();

  // Obtener fecha y hora formateada
  const dia = fechaActual.getDate().toString().padStart(2, '0');
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const año = fechaActual.getFullYear();

  const horas = fechaActual.getHours().toString().padStart(2, '0');
  const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
  const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

  // Formatear la fecha y hora
  const fechaFormateada = `${año}-${mes}-${dia}`;
  const horaFormateada = `${horas}:${minutos}:${segundos}`;
  return (`${fechaFormateada} ${horaFormateada}`)
}

function calcularDiferenciaTiempo(fecha1, fecha2) {
  console.log(fecha1)
if(fecha1==undefined){
  fecha1="00:00:00"
}
console.log(fecha1)
  // Convertir las fechas a objetos Date
  const inicio = new Date(fecha1);
  const fin = new Date(fecha2);

  // Calcular la diferencia en milisegundos
  const diferenciaMilisegundos = fin - inicio;

  // Asegurarse de que la diferencia sea positiva
  if (diferenciaMilisegundos < 0) {
    return "La segunda fecha debe ser posterior a la primera";
  }

  // Calcular horas, minutos y segundos
  const segundosTotales = Math.floor(diferenciaMilisegundos / 1000);
  const horas = Math.floor(segundosTotales / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;

  // Formatear el resultado como HH:MM:SS
  return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

document.getElementById("boton_insumo").addEventListener("click", function () {
  // let material = JSON.parse(localStorage.getItem("autorizaciones"))
  // const diferencia = calcularDiferenciaTiempo(material[0].INICIO, fecha_actual());
  //console.log("Diferencia de tiempo:", diferencia);

  window.location.href = "materiales_orden.html";



})



let orden = localStorage.getItem("iniciar_orden")


buscarOrdenesPorCodEstructurado(localStorage.getItem("cod_empleado")).then(data => {

  data = Object.values(data).flat();

  const jsondata = data.sort((a, b) => {
    return parseInt(a.PRIORIDAD) - parseInt(b.PRIORIDAD);
  });



  document.getElementById("actividades_asignadas").innerHTML =
    '<table class="tabla_notificacions" id="tabla_requisiciones"><tbody><tr><th scope="col" width="220px">#</th><th scope="col" width="520px">ACTIVIDAD</th><th scope="col" width="300px">TIEMPO</th></tr></tbody></table>';


  function minutosAFormatoHora(minutosTotales) {
    const totalSegundos = Math.floor(minutosTotales * 60);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    // Agrega ceros delante si es necesario
    const formatoHora = String(horas).padStart(2, '0');
    const formatoMinuto = String(minutos).padStart(2, '0');
    const formatoSegundo = String(segundos).padStart(2, '0');

    return `${formatoHora}:${formatoMinuto}:${formatoSegundo}`;
  }



  //console.log(jsondata)
  const container = document.getElementById('actividades_asignadas');
  let contador = 0
  let datosJSON = [];
  let equipo
  let ubicacion

  datosJSON = (JSON.parse(localStorage.getItem("autorizaciones")))
  datosJSON = datosJSON.sort((a, b) => {
    return parseInt(a.ORDEN) - parseInt(b.ORDEN);
  });

  let tiempo_estimado = 0
  let data_actividad = []

  for (let j in jsondata) {


    /* if (String(jsondata[j].HOJARUTA) == localStorage.getItem("iniciar_orden_hr")) {
      if (String(jsondata[j].ORDEN) == localStorage.getItem("iniciar_orden")) {
        localStorage.setItem("tiempo_atras", String(jsondata[j].TIEMPO_ORDEN))
        const div = document.createElement('div');
        div.id = "insumos" + j


        tiempo_estimado = tiempo_estimado + Number(jsondata[j].TIEMPO)
        localStorage.setItem("tiempo_estimado", tiempo_estimado)

        tiempo_formato = minutosAFormatoHora(jsondata[j].TIEMPO)

        if (String(jsondata[j].EQUIPO) == "undefined") {
          equipo = "EQUIPO NO ASIGNADO"
        } else {
          equipo = jsondata[j].EQUIPO
        }

        if (String(jsondata[j].UBICACION) == "undefined") {
          ubicacion = "UBICACION NO ASIGNADA"
        } else {
          ubicacion = jsondata[j].UBICACION
        }

        localStorage.setItem("equipo", equipo)
        localStorage.setItem("ubicacion", ubicacion)
        div.className = 'cuadro_resumen_insumos';
        div.innerHTML = '<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes"><a class="titulo_parrafo">ACTIVIDAD </a> : &nbsp &nbsp <a class="descripcion_parrafo">' + jsondata[j].ACTIVIDAD + '</a></div><div class="titulo_resumen_ordenes"><a class="titulo_parrafo">TIEMPO ESTIMADO</a>: &nbsp &nbsp<a class="descripcion_parrafo">' + tiempo_formato + ' </a></div></div></div>'


        div.onclick = function () { hora(j) }
        container.appendChild(div)
        contador = contador + 1
        data_actividad.push([contador.toString().padStart(3, "0"), jsondata[j].ACTIVIDAD, jsondata[j].TIEMPO])
      }
    } */

    /* if (String(jsondata[j].HOJARUTA) == localStorage.getItem("iniciar_orden_hr")) {
      if (String(jsondata[j].ORDEN) == localStorage.getItem("iniciar_orden")) {
        contador = contador + 1
        if (String(jsondata[j].EQUIPO) == "undefined") {
          equipo = "EQUIPO NO ASIGNADO"
        } else {
          equipo = jsondata[j].EQUIPO
        }

        if (String(jsondata[j].UBICACION) == "undefined") {
          ubicacion = "UBICACION NO ASIGNADA"
        } else {
          ubicacion = jsondata[j].UBICACION
        }
        localStorage.setItem("tiempo_atras", String(jsondata[j].TIEMPO_ORDEN))
        tiempo_estimado = tiempo_estimado + Number(jsondata[j].TIEMPO)
        localStorage.setItem("tiempo_estimado", tiempo_estimado)
        tiempo_formato = minutosAFormatoHora(jsondata[j].TIEMPO)
        localStorage.setItem("equipo", equipo)
        localStorage.setItem("ubicacion", ubicacion)
        let tablaRef = document.getElementById("tabla_requisiciones");
        let filaRef = tablaRef.insertRow(-1);
        //filaRef.onclick = iniciar_orden;

        const prioridadColor = {
          "A": "rgb(202, 80, 80)",
          "B": "rgb(223, 236, 89)",
          "C": "rgb(87, 220, 82)"
        };

        filaRef.insertCell(0).textContent = contador;
        filaRef.insertCell(1).textContent = jsondata[j].ACTIVIDAD;
        filaRef.insertCell(2).textContent = tiempo_formato

data_actividad.push([contador.toString().padStart(3, "0"), jsondata[j].ACTIVIDAD, jsondata[j].TIEMPO])

      }
    } */

    if (String(jsondata[j].HOJARUTA) == localStorage.getItem("iniciar_orden_hr")) {
      if (String(jsondata[j].ORDEN) == localStorage.getItem("iniciar_orden")) {
        contador = contador + 1;
        if (jsondata[j].FECHA_INICIO || jsondata[j].FECHA_INICIO.trim() === "") {
          fecha_inicio = jsondata[j].FECHA_INICIO
        } else {
          fecha_inicio = "00/00/00 00:00:00"
        }

        localStorage.setItem("fecha_inicio_orden", fecha_inicio)

        if (jsondata[j].CLASE_MANTTO == "119") {
          boton = document.getElementById("boton_insumo")
          if (boton) {
            boton.style.display = "none"; // Oculta completamente el botón
          }
        }


        if (String(jsondata[j].EQUIPO) == "undefined") {
          equipo = "EQUIPO NO ASIGNADO";
        } else {
          equipo = jsondata[j].EQUIPO;
        }

        if (String(jsondata[j].UBICACION) == "undefined") {
          ubicacion = "UBICACION NO ASIGNADA";
        } else {
          ubicacion = jsondata[j].UBICACION;
        }

        localStorage.setItem("tiempo_atras", String(jsondata[j].TIEMPO_ORDEN));
        tiempo_estimado = tiempo_estimado + Number(jsondata[j].TIEMPO);
        localStorage.setItem("tiempo_estimado", tiempo_estimado);
        tiempo_formato = minutosAFormatoHora(jsondata[j].TIEMPO);
        localStorage.setItem("equipo", equipo);
        localStorage.setItem("ubicacion", ubicacion);

        let tablaRef = document.getElementById("tabla_requisiciones");
        let filaRef = tablaRef.insertRow(-1);
        //filaRef.onclick = iniciar_orden;

         const prioridadColor = {
          "A": "rgb(202, 80, 80)",
          "B": "rgb(223, 236, 89)",
          "C": "rgb(87, 220, 82)",
          "1": "rgb(201, 52, 52)"
        };


        // Columna 0: contador
        filaRef.insertCell(0).textContent = contador;

        // Columna 1: actividad, con texto alineado a la izquierda
        let celdaActividad = filaRef.insertCell(1);
        celdaActividad.textContent = jsondata[j].ACTIVIDAD;
        celdaActividad.style.textAlign = "left";

        // Columna 2: tiempo formateado
        filaRef.insertCell(2).textContent = tiempo_formato;

        data_actividad.push([
          contador.toString().padStart(3, "0"),
          jsondata[j].ACTIVIDAD,
          jsondata[j].TIEMPO
        ]);
      }
    }



  }


  //console.log(data_actividad)
  localStorage.setItem("data_actividad", JSON.stringify(data_actividad))
  function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (contador == 0) {

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
    //document.getElementById("boton_siguiente").innerHTML = "Iniciar orden"
  }
  setInterval(tiempo_orden, 1000);
})

document.getElementById("boton_pausar").addEventListener("click", async function () {
  /*  try {
     const response = await fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/ordenes_asignadas.json");
     const data = await response.json();
 
     data.forEach(orden => {
       if (orden.ORDEN === String(localStorage.getItem("iniciar_orden"))) {
         orden.ESTATUS = "PAUSADA";
         orden.TIEMPO_ORDEN = localStorage.getItem("tiempo_orden");
       }
     });
     
 
     console.log(data);
     await actualizar_ordenes_proceso_git(data);
     const ordenes = JSON.parse(localStorage.getItem("autorizaciones"))
     const ordenesFiltradas = ordenes.filter(orden => orden.ORDEN !== String(localStorage.getItem("iniciar_orden")));
     localStorage.setItem("autorizaciones", ordenesFiltradas)
     window.location.href = "principal.html";
   } catch (error) {
     console.error("Error al pausar orden:", error);
   }
  */



  try {

    leerOrden(localStorage.getItem("iniciar_orden")).then(data => {
      if (data) {
        data.forEach(item => {
          item.ESTATUS = "PAUSADA";
          item.TIEMPO_ORDEN = localStorage.getItem("tiempo_orden")
        }
        );

        console.log(data);
        guardarActividades(data); // << mover aquí, no afuera
        const ordenes = JSON.parse(localStorage.getItem("autorizaciones"))
        const ordenesFiltradas = ordenes.filter(orden => orden.ORDEN !== String(localStorage.getItem("iniciar_orden")));
        console.log(ordenesFiltradas.length)
        if(ordenesFiltradas.length==0){
localStorage.removeItem("autorizaciones")
        }else{
        localStorage.setItem("autorizaciones", ordenesFiltradas)
        }
        window.location.href = "principal.html";
      } else {
        console.warn("Error al pausar orden:", error);
      }
    });

  } catch (error) {
    console.error("Error al ejecutar orden:", error);
  }
});
