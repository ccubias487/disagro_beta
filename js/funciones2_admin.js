if (localStorage.getItem("usuario") == null) {
  window.location.href = "index.html";
}

if (localStorage.getItem("firma_user") == null) {
  window.location.href = "firma.html";
}

// Redirecciones por clic
document.getElementById("inventario").addEventListener("click", () => {
  window.location.href = "existencias_disagro.html";
});

document.getElementById("requisicion").addEventListener("click", () => {
  window.location.href = "asignar_ordenes.html";
});

document.getElementById("ordenes").addEventListener("click", () => {
  window.location.href = "ordenes_asignadas_admin_general.html";
});

document.getElementById("aprobaciones").addEventListener("click", () => {
  window.location.href = "autorizacion.html";
});

document.getElementById("equipos").addEventListener("click", () => {
  window.location.href = "equipos.html";
});

document.getElementById("personal").addEventListener("click", () => {
  window.location.href = "ordenes_admin_general.html";
});

document.getElementById("cuenta").addEventListener("click", () => {
  localStorage.removeItem("firma_user");
  localStorage.removeItem("nombre");
  localStorage.removeItem("usuario");
  localStorage.removeItem("cod_empleado");
  localStorage.removeItem("realizadas");
  localStorage.removeItem("proceso");
  localStorage.removeItem("orden_ejecucion");
  localStorage.removeItem("autorizaciones");
  window.location.href = "index.html";
});

document.getElementById("cuadro_resumen_no_finalizadas").style.marginBottom = "250px";

// Mostrar nombre del usuario
function convertirNombrePropio(nombre) {
  return nombre
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(' ');
}

let nombre = convertirNombrePropio(localStorage.getItem("usuario"));
document.getElementById("nombre_user").innerHTML = "Hola, " + nombre;

// Cargar datos y contar órdenes
leerOrden_general().then(data => {
  let asignadas = 0;
  const contadores = {
    PENDIENTE: 0,
    PAUSA: 0,
    FINALIZADA: 0,
    PROCESO: 0
  };

  const ordenesContadas = new Set();
  const ordenesUnicas = new Set();

  for (const orden of Object.values(data)) {
    if (!Array.isArray(orden)) continue;

    for (const item of orden) {
      if (!item || typeof item !== "object") continue;

      // Evita contar la misma orden varias veces para el estado
      if (!ordenesContadas.has(item.ORDEN)) {
        ordenesContadas.add(item.ORDEN);
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

      // Contar órdenes asignadas únicas
      if (!ordenesUnicas.has(item.ORDEN)) {
        ordenesUnicas.add(item.ORDEN);
        asignadas++;
      }
    }
  }

  document.getElementById("realizadas").innerHTML = contadores.FINALIZADA;
  document.getElementById("asignadas").innerHTML = asignadas;
  document.getElementById("proceso").innerHTML = contadores.PROCESO;
  document.getElementById("no_finalizadas").innerHTML = contadores.PAUSA;

  if (asignadas > 0) {
    const porcentaje = ((contadores.FINALIZADA / asignadas) * 100).toFixed(2);
    document.getElementById("procentaje").innerHTML = porcentaje + "%";
    document.getElementById("procentaje").style.width = porcentaje + "%";
  } else {
    document.getElementById("procentaje").innerHTML = "0%";
    document.getElementById("procentaje").style.width = "0%";
  }
});
