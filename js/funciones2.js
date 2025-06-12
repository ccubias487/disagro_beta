if (localStorage.getItem("usuario") == null) {
  window.location.href = "index.html";
}

if (localStorage.getItem("firma_user") == null) {
  window.location.href = "firma.html";
}

if (localStorage.getItem("usuario_tipo") == "ADMIN") {
  window.location.href = "principal_admin.html";
}

// Redirecciones
document.getElementById("inventario").addEventListener("click", () => {
  window.location.href = "existencias_disagro.html";
});

document.getElementById("requisicion").addEventListener("click", () => {
  window.location.href = "requisiciones.html";
});

document.getElementById("equipos").addEventListener("click", () => {
  window.location.href = "equipos.html";
});

document.getElementById("ordenes").addEventListener("click", () => {
  window.location.href = "ordenes.html";
});

document.getElementById("cuenta").addEventListener("click", () => {
  [
    "firma_user", "nombre", "usuario", "cod_empleado",
    "realizadas", "proceso", "orden_ejecucion", "autorizaciones"
  ].forEach(key => localStorage.removeItem(key));
  window.location.href = "index.html";
});

// Mostrar nombre de usuario
function convertirNombrePropio(nombre) {
  return nombre
    .split(' ')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(' ');
}

let nombre = convertirNombrePropio(localStorage.getItem("usuario") || "");
document.getElementById("nombre_user").innerHTML = "Hola, " + nombre;

let ejecutando = localStorage.getItem("proceso");
document.getElementById("proceso").innerHTML = ejecutando ?? 0;

// Datos del usuario
const usuario = localStorage.getItem("cod_empleado");

buscarOrdenesPorCodEstructurado(usuario).then(data => {
  const contadores = {
    PENDIENTE: 0,
    PAUSA: 0,
    FINALIZADA: 0,
    PROCESO: 0
  };

  const ordenesContadas = new Set();
  const ordenesUnicas = new Set();
  let asignadas = 0;

  for (const actividades of Object.values(data)) {
    if (!Array.isArray(actividades)) continue;

    for (const item of actividades) {
      if (!item || typeof item !== "object") continue;

      // Contar estados sin duplicar por orden
      if (item.NOMBRE === usuario && !ordenesContadas.has(item.ORDEN)) {
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

      // Contar órdenes únicas asignadas al usuario
      if (item.NOMBRE === usuario && !ordenesUnicas.has(item.ORDEN)) {
        ordenesUnicas.add(item.ORDEN);
        asignadas++;
      }
    }
  }

  // Mostrar resultados
  document.getElementById("realizadas").innerHTML = contadores.FINALIZADA;
  document.getElementById("asignadas").innerHTML = asignadas;
  document.getElementById("proceso").innerHTML = contadores.PROCESO;
  document.getElementById("no_finalizadas").innerHTML = contadores.PAUSA;

  const porcentaje = asignadas > 0 ? ((contadores.FINALIZADA / asignadas) * 100).toFixed(2) : "0";
  document.getElementById("procentaje").innerHTML = porcentaje + "%";
  document.getElementById("procentaje").style.width = porcentaje + "%";
});

// Cuadros resumen
document.getElementById("cuadro_resumen_realizadas").addEventListener("click", () => {
  window.location.href = "ordenes_realizadas.html";
});

document.getElementById("cuadro_resumen_proceso").addEventListener("click", () => {
  window.location.href = "ordenes_proceso.html";
});

document.getElementById("cuadro_resumen_no_finalizadas").addEventListener("click", () => {
  window.location.href = "ordenes_pausa.html";
});

document.getElementById("cuadro_resumen_asignadas").addEventListener("click", () => {
  window.location.href = "ordenes.html";
});
