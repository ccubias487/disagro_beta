document.getElementById("boton_agregar_insumo").addEventListener("click", function () {
  window.location.href = "existencias.html";
});

document.getElementById("boton_agregar_actividad").style.display="none"

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // La página viene desde la caché, forzar recarga
    window.location.reload();
  }
});



document.getElementById("inicio").addEventListener("click", function () {
  window.location.href = "principal.html";
});
materiales = JSON.parse(localStorage.getItem("agregar_material"));

console.log(materiales)
try{
if ((materiales == null)) {
    document.getElementById("boton_enviar").style.display = "none";
  } }catch {
    document.getElementById("boton_enviar").style.display = "inline_block";
  }


document.getElementById("tabla_requisiciones").innerHTML = "";


function ventana_flotante() {
  let fila = this.rowIndex - 1;
  console.log(fila);

  localStorage.setItem("ventana_flotante", fila);
  //document.getElementById("cantidad_insumo").value=""
  const modal = document.getElementById("myModal");
  const closeBtn = document.getElementById("closeBtn");
  modal.style.display = "flex";
  document.getElementById("producto").innerHTML = materiales[fila].DESCRIPCION;
  document.getElementById("existencia").innerHTML =
    "EXISTENCIA: " + materiales[fila].EXISTENCIA;
    document.getElementById("cantidad_insumo").focus()
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  document
    .getElementById("boton_cancelar")
    .addEventListener("click", function () {
      modal.style.display = "none";
    });

  document
    .getElementById("boton_eliminar")
    .addEventListener("click", function () {
      materiales = JSON.parse(localStorage.getItem("agregar_material"));
      console.log("borrando: ", fila);

      const ordenesFiltradas = materiales.filter(
        (item) => item.SAP !== materiales[fila].SAP
      );

      localStorage.setItem(
        "agregar_material",
        JSON.stringify(ordenesFiltradas)
      );
      location.reload();
    });

  document
    .getElementById("boton_modificar")
    .addEventListener("click", function () {
      //venta_flotante(localStorage.getItem("ventana_flotante"))
      k = localStorage.getItem("ventana_flotante");
      let orden = localStorage.getItem("iniciar_orden");
      let datosJSON = [];
      let material = "";
      const modal = document.getElementById("myModal");
      const nuevoDato = {
        ORDEN: orden,
        SAP: materiales[fila].SAP,
        DESCRIPCION: materiales[fila].DESCRIPCION,
        CANTIDAD: document.getElementById("cantidad_insumo").value,
        EXISTENCIA: materiales[fila].EXISTENCIA,
        VALOR_TOTAL: materiales[fila].VALOR_TOTAL,
      };
      //const nuevoDato = {  ORDEN: jsondata[k].ORDEN, SAP: jsondata[k].SAP, DESCRIPCION: jsondata[k].DESCRIPCION, CANTIDAD: jsondata[k].CANTIDAD, EXISTENCIA: jsondata[k].EXISTENCIA, VALOR_TOTAL: jsondata[k].VALOR_TOTAL };

      material = localStorage.getItem("agregar_material");

      if (localStorage.getItem("agregar_material") == null) {
        datosJSON.push(nuevoDato);
        console.log("1 " + datosJSON);
        localStorage.setItem("agregar_material", JSON.stringify(datosJSON));
        modal.style.display = "none";
      } else {
        datosJSON = JSON.parse(material);
        datosJSON = datosJSON.filter(
          (item) => item.SAP !== materiales[fila].SAP
        );
        datosJSON.push(nuevoDato);
        localStorage.setItem("agregar_material", JSON.stringify(datosJSON));
        modal.style.display = "none";
      }
      location.reload();
    });
}

function borrado() {
  fila = this.rowIndex;
  borrar = [];
  for (k = 1; k <= localStorage.getItem("contador"); k++) {
    borrar.push(localStorage.getItem(k));
  }
  localStorage.setItem(
    "contador",
    Number(localStorage.getItem("contador")) - 1
  );

  for (k = 1; k <= Number(localStorage.getItem("contador") + 1); k++) {
    localStorage.removeItem(k);
  }

  delete borrar[fila - 1];
  let r = 1;
  for (k = 1; k <= borrar.length; k++) {
    if (borrar[k - 1] != null) {
      localStorage.setItem(r, borrar[k - 1]);
      r = r + 1;
    }
  }
  location.reload();
}

try {
  if (materiales.length == 0) {
    document.getElementById("boton_enviar").style.display = "none";
  } else {
    document.getElementById("boton_enviar").style.display = "inline_block";
  }

  document.getElementById("tabla_requisiciones").innerHTML =
    '<tbody><tr><th scope="col" width="40px">CANTIDAD</th><th scope="col" width="680px">DESCRIPCION</th><th scope="col" width="100px">SAP</th></tr></tbody>';

  for (i = 0; i <= materiales.length - 1; i++) {
    let date = new Date();
    let fecha_actual =
      String(date.getDate()).padStart(2, "0") +
      "/" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      date.getFullYear();

    let tablaRef = document.getElementById("tabla_requisiciones");
    let filaRef = tablaRef.insertRow(-1);
    //filaRef.ondblclick = borrado;
    //filaRef.onclick = function () {ventana_flotante(i);};
    filaRef.onclick = ventana_flotante;
    console.log(i);

    filaRef.insertCell(0).textContent = materiales[i].CANTIDAD;
    filaRef.insertCell(1).textContent = materiales[i].DESCRIPCION;
    salidas = Number(materiales[i].EXISTENCIA) - Number(materiales[i].CANTIDAD);
    if (salidas < 0) {
      filaRef.style.backgroundColor = "#d5383887";
    }
    filaRef.insertCell(2).textContent = materiales[i].SAP;
  }
} catch (error) {
  console.log(error);
}

document.getElementById("boton_enviar").addEventListener("click", function () {
  if (document.getElementById("user").value == "") {
    document.getElementById("mensaje").innerHTML =
      "Se debe especificar en donde se utilizara el material";
    document.getElementById("user").focus();
    return;
  }

  localStorage.setItem(
    "usoen",
    document.getElementById("user").value.toUpperCase()
  );
  //generarPDF2();

  const data_local = JSON.parse(
            localStorage.getItem("agregar_material") || "[]"
          );
          const nuevosObjetos = [];
             function obtenerFechaFormato() {
            const ahora = new Date();

            const dia = String(ahora.getDate()).padStart(2, '0');
            const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
            const año = ahora.getFullYear();
            const horas = String(ahora.getHours()).padStart(2, '0');
            const minutos = String(ahora.getMinutes()).padStart(2, '0');
            const segundos = String(ahora.getSeconds()).padStart(2, '0');

            return `${dia}${mes}${año}${horas}${minutos}${segundos}`;
          }
for (let i = 0; i < data_local.length; i++) {
            const objeto = {
              ORDEN: localStorage.getItem("cod_empleado") + obtenerFechaFormato(),
              CODIGO: data_local[i].SAP,
              DESCRIPCION: data_local[i].DESCRIPCION,
              CANTIDAD: data_local[i].CANTIDAD,
              DETALLE: localStorage.getItem("iniciar_orden_d"),
              STATUS: "PENDIENTE",
              FIRMASOLICITANTE: localStorage.getItem("firma_user"),
              SOLICITANTE: localStorage.getItem("nombre"),
              AUTORIZADO: "",
              REQUISICION: localStorage.getItem("cod_empleado") + obtenerFechaFormato(),
              VALIDADOR: localStorage.getItem("cod_empleado") + obtenerFechaFormato(),
            };
            nuevosObjetos.push(objeto);
          }
          console.log(nuevosObjetos)
          guardarRequisicion(nuevosObjetos)
          console.log(nuevosObjetos)






  enviarCorreo()
  localStorage.removeItem("agregar_material")
});
