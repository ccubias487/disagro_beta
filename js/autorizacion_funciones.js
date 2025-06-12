// Redirección si no hay sesión
if (!localStorage.getItem("usuario")) {
  window.location.href = "index.html";
}

// Eliminar autorizaciones anteriores
localStorage.removeItem("autorizaciones");

// Redirección a página principal
document.getElementById("inicio").addEventListener("click", () => {
  window.location.href = "principal.html";
});

// Ajuste de estilo
document.getElementById("actividades_asignadas").style.paddingBottom = "300px";

// Función para obtener la fecha y hora actual formateada
function obtenerFechaHoraActual() {
  const f = new Date();
  const fecha = `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, "0")}-${String(f.getDate()).padStart(2, "0")}`;
  const hora = `${String(f.getHours()).padStart(2, "0")}:${String(f.getMinutes()).padStart(2, "0")}:${String(f.getSeconds()).padStart(2, "0")}`;
  return `${fecha} ${hora}`;
}

// Función para calcular diferencia entre dos fechas
function calcularDiferencia(fechaInicio, fechaFin) {
  const dif = new Date(fechaFin) - new Date(fechaInicio);
  if (dif < 0) return "La segunda fecha debe ser posterior a la primera";

  const totalSeg = Math.floor(dif / 1000);
  const h = String(Math.floor(totalSeg / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeg % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeg % 60).padStart(2, "0");

  return `${h}:${m}:${s}`;
}

// Función para crear select con opciones AUTORIZADO/RECHAZADO
function crearSelectAutorizacion() {
  const select = document.createElement("select");
  ["AUTORIZADO", "RECHAZADO"].forEach(opcion => {
    const opt = document.createElement("option");
    opt.value = opcion;
    opt.textContent = opcion;
    select.appendChild(opt);
  });
  return select;
}

// Función para mostrar el modal con tabla para autorizar
function mostrarModalAutorizacion(reqData) {
  const modal = document.getElementById("myModal2");
  modal.style.display = "flex";
  let filas = 0
  const tabla = document.getElementById("tabla_autorizacion");
  if (reqData.length > 0) {
    tabla.innerHTML = "<tr><th>Cantidad</th><th>Descripción</th><th>Código</th><th>Acción</th></tr>"
  }
  console.log(reqData)
  reqData.forEach(item => {
    if (item.STATUS !== "PENDIENTE") return;
    filas = filas + 1
    const fila = tabla.insertRow(-1);
    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.value = item.CANTIDAD;
    inputCantidad.min = 0;
    inputCantidad.style = "width:80px; text-align:center";

    fila.insertCell(0).appendChild(inputCantidad);
    fila.insertCell(1).textContent = item.DESCRIPCION;
    fila.insertCell(2).textContent = item.CODIGO;
    fila.insertCell(3).appendChild(crearSelectAutorizacion());
  });

  if (filas == 0) {
    document.getElementById("autorizar").style.display = "none"
    document.getElementById("rechazar").style.display = "none"
  } else {
    document.getElementById("autorizar").style.display = "flex"
    document.getElementById("rechazar").style.display = "flex"
  }
  document.getElementById("autorizar").onclick = () => procesarAutorizacion(reqData);
  document.getElementById("cerrarModal2").onclick = () => {
    modal.style.display = "none";
  }
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("myModal2");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Procesar tabla de autorización y guardar datos
function procesarAutorizacion(reqData) {
  console.log(reqData)
  const tabla = document.getElementById("tabla_autorizacion").querySelector("tbody");
  const nuevasAutorizaciones = [];

  for (let i = 1; i < tabla.rows.length; i++) {
    const celdas = tabla.rows[i].cells;
    const cantidad = celdas[0].querySelector("input").value;
    const descripcion = celdas[1].textContent.trim();
    const codigo = celdas[2].textContent.trim();
    const estado = celdas[3].querySelector("select").value;

    if (estado === "AUTORIZADO") {
      nuevasAutorizaciones.push({
        ORDEN: reqData[0].ORDEN,
        CODIGO: codigo,
        DESCRIPCION: descripcion,
        CANTIDAD: cantidad,
        DETALLE: reqData[0].DETALLE,
        STATUS: estado,
        FIRMAAUTORIZADO: localStorage.getItem("firma_user"),
        AUTORIZADO: localStorage.getItem("nombre"),
        FIRMASOLICITANTE: reqData[0].FIRMASOLICITANTE,
        SOLICITANTE: reqData[0].SOLICITANTE,
        REQUISICION: reqData[0].REQUISICION,
        VALIDADOR: reqData[0].REQUISICION,
      });
    }
  }

  guardarRequisicion(nuevasAutorizaciones);
  actualizarReq_Auto(localStorage.getItem("requisicion_autorizar"), nuevasAutorizaciones);
  generarPDF_Autorizada(localStorage.getItem("requisicion_autorizar"));
  eliminarReq(localStorage.getItem("requisicion_autorizar"))

  document.getElementById("myModal2").style.display = "none";
}

// Función principal
leerReq_general().then(data => {
  const actividades = Object.values(data).flat().sort((a, b) => a.PRIORIDAD - b.PRIORIDAD);
  let datosJSON = JSON.parse(localStorage.getItem("autorizaciones")) || [];

  // Sin duplicar autorizaciones ya existentes
  actividades.forEach(act => {
    if (!datosJSON.some(d => d.ORDEN === act.ORDEN)) {
      datosJSON.push({ ORDEN: act.ORDEN, DETALLE: act.DETALLE, STATUS: act.STATUS });
    }
  });

  localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));

  const contenedor = document.getElementById("actividades_asignadas");
  const ordenesAgregadas = new Set();
  let contador = 0;

  datosJSON.forEach((item, i) => {
    if ((item.STATUS === "PENDIENTE" || item.STATUS === "AUTORIZADO") && !ordenesAgregadas.has(item.ORDEN)) {
      const div = document.createElement("div");
      div.className = "cuadro_resumen_insumos";
      div.id = i;
      div.innerHTML = `
        <div class="cuadro_resumen_ordenes_superpuesto"></div>
        <div class="titulo_resumen_ordenes">
          <div>ORDEN : &nbsp;&nbsp;${item.ORDEN}</div>
          <div>DESCRIPCION: &nbsp;&nbsp;${item.DETALLE.substring(0, 28)}</div>
          <div>STATUS : &nbsp;&nbsp;${item.STATUS}</div>
        </div>`;

      div.onclick = () => {
        localStorage.setItem("requisicion_autorizar", item.ORDEN);
        localStorage.setItem("solicitante_req", item.SOLICITANTE || "");
        localStorage.setItem("requisicion", item.REQUISICION || "");

        leerReq(item.ORDEN).then(reqData => {
          if (localStorage.getItem("usuario_tipo") === "ADMIN") {
            mostrarModalAutorizacion(Object.values(reqData).flat());
          } else {
            const modal = document.getElementById("myModal");
            modal.style.display = "flex";
            setTimeout(() => (modal.style.display = "none"), 1500);
          }
        });
      };

      contenedor.appendChild(div);
      ordenesAgregadas.add(item.ORDEN);
      contador++;
    }
  });

  if (contador === 0) {
    const imagen = document.createElement("img");
    imagen.src = `https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/empty${Math.floor(Math.random() * 3 + 1)}.png`;
    imagen.style.width = "400px";
    imagen.style.height = "400px";

    const mensaje = document.getElementById("no_encontrado");
    mensaje.appendChild(imagen);

    const texto = document.getElementById("no_encontrado_texto");
    texto.textContent = "NO SE ENCONTRARON INSUMOS PARA ESTA ORDEN";
    texto.style.cssText = "font-size: xx-large; font-weight: bold; color: white;";
  }
});
