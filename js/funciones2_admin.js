if (localStorage.getItem("usuario") == null) {
  window.location.href = "index.html";
}

document.getElementById("inventario").addEventListener("click", function () {

  window.location.href = "existencias_disagro.html";
})


document.getElementById("requisicion").addEventListener("click", function () {

  window.location.href = "asignar_ordenes.html";
})

document.getElementById("equipos").addEventListener("click", function () {

  window.location.href = "equipos.html";
})



if (localStorage.getItem("firma_user") == null) {
  window.location.href = "firma.html";
}
document.getElementById("cuenta").addEventListener("click", function () {
  localStorage.removeItem("firma_user")
  localStorage.removeItem("nombre")
  localStorage.removeItem("usuario")
  localStorage.removeItem("cod_empleado")
  localStorage.removeItem("realizadas")
  localStorage.removeItem("proceso")
  localStorage.removeItem("orden_ejecucion")
  localStorage.removeItem("autorizaciones")


  window.location.href = "index.html";
})


function convertirNombrePropio(nombre) {
  return nombre
    .split(' ')
    .map(palabra =>
      palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    )
    .join(' ');
}

let nombre = convertirNombrePropio(localStorage.getItem("usuario"));

let ejecutando = localStorage.getItem("proceso")
/*  console.log(ejecutando) */
if (ejecutando == null) {
  document.getElementById("proceso").innerHTML = 0

} else {
  document.getElementById("proceso").innerHTML = ejecutando
}


document.getElementById("ordenes").addEventListener("click", function () {
  window.location.href = "ordenes_admin.html";
})

document.getElementById("nombre_user").innerHTML = "Hola, " + nombre


leerOrden_general().then(data => {

  let realizadas = localStorage.getItem("realizadas")
  let asignadas = 0
  let pendiente = 0
  let pausa = 0
  let finalizadas = 0
  let proceso = 0

  //console.log(data)

  const contadores = {
    PENDIENTE: 0,
    PAUSA: 0,
    FINALIZADA: 0,
    PROCESO: 0
  };

  const ordenesContadas = new Set();
  let usuario = localStorage.getItem("cod_empleado")


  for (const ordenId in data) {
    const actividades = data[ordenId];
    for (const item of actividades) {
     // if (item.NOMBRE === usuario) {
        if (!ordenesContadas.has(item.ORDEN)) {
          ordenesContadas.add(item.ORDEN);
          console.log(item.ESTATUS)
          switch (item.ESTATUS) {
            case "PENDIENTE":
              contadores.PENDIENTE++;
              break;
            case "PAUSADA":
              contadores.PAUSA++;
              break;
            case "FINALIZADA":
              contadores.FINALIZADA++;
              break;
            case "EJECUTANDO":
              contadores.PROCESO++;
              break;
          }
        }
      //}
    }
  }

  console.log("Pendientes:", contadores.PENDIENTE);
  console.log("Pausas:", contadores.PAUSA);
  console.log("Finalizadas:", contadores.FINALIZADA);
  console.log("Proceso:", contadores.PROCESO);

  /*   if (realizadas==null){
     document.getElementById("realizadas").innerHTML=0
    }else{
    
      document.getElementById("realizadas").innerHTML=realizadas
    } */

  document.getElementById("realizadas").innerHTML = contadores.FINALIZADA
  document.getElementById("asignadas").innerHTML = asignadas
  document.getElementById("proceso").innerHTML = contadores.PROCESO
  document.getElementById("no_finalizadas").innerHTML = contadores.PAUSA
  const ordenesUnicas = new Set();



  /*   for (const ordenId in data) {
  const actividades = data[ordenId]; */

  for (let i in data) {
    const orden = data[i];
    for (let j in orden) {
      // Omitir si ya se procesó esta orden
     // if (orden[j].NOMBRE == localStorage.getItem("cod_empleado")) {
        if (ordenesUnicas.has(orden[j].ORDEN)) continue;
        ordenesUnicas.add(orden[j].ORDEN); // Marcar orden como procesada
        asignadas = asignadas + 1
     // }
    }
  }


  document.getElementById("asignadas").innerHTML = asignadas


  if (contadores.FINALIZADA !== 0) {
    document.getElementById("procentaje").innerHTML = (((contadores.FINALIZADA / asignadas) * 100).toFixed(2)) + "%"
    document.getElementById("procentaje").style.width = ((contadores.FINALIZADA / asignadas) * 100).toFixed(2) + "%"
  } else {
    /*   console.log(realizadas) */
    document.getElementById("procentaje").innerHTML = "0%"
    document.getElementById("procentaje").style.width = "0%"
  }

})



/* document.getElementById("cuadro_resumen_realizadas").addEventListener("click", function () {
  window.location.href = "ordenes_realizadas.html";
})

document.getElementById("cuadro_resumen_proceso").addEventListener("click", function () {
  window.location.href = "ordenes_proceso.html";
})

document.getElementById("cuadro_resumen_no_finalizadas").addEventListener("click", function () {
  window.location.href = "ordenes_pausa.html";
})

document.getElementById("cuadro_resumen_asignadas").addEventListener("click", function () {
  window.location.href = "ordenes.html";
}) */