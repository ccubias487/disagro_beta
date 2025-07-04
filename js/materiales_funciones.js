if (localStorage.getItem("usuario") == null) {
  window.location.href = "index.html";
}

document.getElementById("titulo_logo").innerHTML =
  localStorage.getItem("iniciar_orden_d");

let orden = localStorage.getItem("iniciar_orden");

document.getElementById("inicio").addEventListener("click", function () {
  window.location.href = "principal.html";
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // La página viene desde la caché, forzar recarga
    window.location.reload();
  }
});

document.getElementById("boton_agregar").addEventListener("click", function () {
  window.location.href = "existencias.html";
});



function abrirYCerrarPagina(url, tiempo = 5000) {
  // Abrir una nueva ventana/pestaña
  const nuevaVentana = window.open(url, '_blank');

  if (!nuevaVentana) {
    console.log("El navegador bloqueó la ventana emergente.");
    return;
  }

  // Simular alguna tarea que toma 'tiempo' milisegundos
  setTimeout(() => {
    // Cerrar la ventana después de que finalice la "tarea"
    nuevaVentana.close();
    console.log("La ventana ha sido cerrada.");
  }, tiempo);
}


function fecha_actual() {
  const fechaActual = new Date();

  // Obtener fecha y hora formateada
  const dia = fechaActual.getDate().toString().padStart(2, "0");
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
  const año = fechaActual.getFullYear();

  const horas = fechaActual.getHours().toString().padStart(2, "0");
  const minutos = fechaActual.getMinutes().toString().padStart(2, "0");
  const segundos = fechaActual.getSeconds().toString().padStart(2, "0");

  // Formatear la fecha y hora
  const fechaFormateada = `${año}-${mes}-${dia}`;
  const horaFormateada = `${horas}:${minutos}:${segundos}`;
  return `${fechaFormateada} ${horaFormateada}`;
}

function calcularDiferenciaTiempo(fecha1, fecha2) {
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
  return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(
    2,
    "0"
  )}:${String(segundos).padStart(2, "0")}`;
}

document
  .getElementById("boton_siguiente")
  .addEventListener("click", async function () {
    document.getElementById("loader-container").style.display = "flex";


    try {

      leerOrden(localStorage.getItem("iniciar_orden")).then(data => {


        function obtenerFechaHora() {
          const ahora = new Date();

          const dia = String(ahora.getDate()).padStart(2, '0');
          const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // +1 porque los meses empiezan en 0
          const año = String(ahora.getFullYear()).slice(-2); // Solo los últimos 2 dígitos

          const horas = String(ahora.getHours()).padStart(2, '0');
          const minutos = String(ahora.getMinutes()).padStart(2, '0');
          const segundos = String(ahora.getSeconds()).padStart(2, '0');

          return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
        }




        if (data) {
          data.forEach(item => {
            item.ESTATUS = "EJECUTANDO"
            if (!item.FECHA_INICIO || item.FECHA_INICIO.trim() === "") {
              item.FECHA_INICIO = obtenerFechaHora();
            }
          }
          );
          console.log(data);
          guardarActividades(data); // << mover aquí, no afuera
        } else {
          console.warn("No se cargaron datos para modificar");
        }
      });

    } catch (error) {
      console.error("Error al ejecutar orden:", error);
    }
    ////////////////////////////////////////////////////

    let materiales_utilizados = [];

    if (localStorage.getItem("agregar_material") !== null) {


      // Obtener lo que ya está en localStorage
      const guardados = localStorage.getItem("materiales_utilizados");
      if (guardados) {
        materiales_utilizados = JSON.parse(guardados); // ✅ Convertir a array real
      }

      const nuevos_materiales = JSON.parse(localStorage.getItem("agregar_material"));

      // Asegurarse que ambos son arrays
      if (Array.isArray(nuevos_materiales)) {
        materiales_utilizados = materiales_utilizados.concat(nuevos_materiales);
      } else {
        materiales_utilizados.push(nuevos_materiales);
      }

      // Guardar de nuevo en localStorage
      localStorage.setItem("materiales_utilizados", JSON.stringify(materiales_utilizados));

      console.log("DEBUG")
      document.getElementById("loader-container").style.display = "flex";
      //await generarPDF();

      const nuevoDato = {
        ORDEN: orden,
        DETALLE: localStorage.getItem("iniciar_orden_d"),
        STATUS: "PROCESO DE AUTORIZACION",
      };

      let datosJSON = [];
      let material = localStorage.getItem("autorizaciones") || [];
      if (localStorage.getItem("autorizaciones") == null) {
        datosJSON.push(nuevoDato);
        console.log(datosJSON);
        //localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));

        //saltar autorizaciones
        const fechayhora = fecha_actual();
        if (localStorage.getItem("autorizaciones") == null) {
          let datosJSON = [];
          const nuevoDato = {
            ORDEN: orden,
            DETALLE: localStorage.getItem("iniciar_orden_d"),
            STATUS: "AUTORIZADO",
            INICIO: fechayhora,
          };
          console.log(nuevoDato);
          datosJSON.push(nuevoDato);
          datosJSON = datosJSON.sort((a, b) => {
            return parseInt(a.ORDEN) - parseInt(b.ORDEN);
          });
          localStorage.setItem("validadnod", "existe");
          localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));
        } else {
          let datos = JSON.parse(localStorage.getItem("autorizaciones"));
          const existe = datos.some(
            (item) => item.ORDEN === localStorage.getItem("iniciar_orden")
          );
          localStorage.setItem("validadnod", existe);
          if (existe) {
            localStorage.removeItem("agregar_material");
            //aca
            //window.location.href = "ejecutando.html";
            setTimeout(() => {
              window.location.href = "ejecutando.html";
            }, 1000);
          } else {
            const nuevoDato = {
              ORDEN: orden,
              DETALLE: localStorage.getItem("iniciar_orden_d"),
              STATUS: "AUTORIZADO",
              INICIO: fechayhora,
            };
            datosJSON = datosJSON.filter(
              (item) => item.ORDEN !== localStorage.getItem("iniciar_orden")
            );
            datosJSON.push(nuevoDato);
            datosJSON2 = datosJSON.sort((a, b) => {
              return Number(a.ORDEN) - Number(b.ORDEN);
            });
            localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));
          }
        }

        ///
        //actualizar_autorizacion()

        window.location.href = "autorizacion.html";

        localStorage.removeItem("agregar_material");
        //await generarPDF()
        setTimeout(() => {
          window.location.href = "ejecutando.html";
        }, 1000);
      } else {
        console.log(material)
        datosJSON = JSON.parse(material);
        console.log(datosJSON);
        //datosJSON = datosJSON.filter(item => item.SAP !== jsondata[i].CODIGO);
        datosJSON.push(nuevoDato);

        console.log(datosJSON);
        localStorage.setItem("autorizaciones", JSON.stringify(datosJSON))

        function actualizar_autorizacion() {

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

          const data_local = JSON.parse(
            localStorage.getItem("agregar_material") || "[]"
          );
          const nuevosObjetos = [];

          for (let i = 0; i < data_local.length; i++) {
            const objeto = {
              ORDEN: data_local[i].ORDEN,
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
        }
        if (localStorage.getItem("autorizaciones") == null) {
          let datosJSON = [];
          const nuevoDato = {
            ORDEN: orden,
            DETALLE: localStorage.getItem("iniciar_orden_d"),
            STATUS: "AUTORIZADO",
            INICIO: fecha_actual(),
          };
          console.log(nuevoDato);
          datosJSON.push(nuevoDato);
          datosJSON = datosJSON.sort((a, b) => {
            return parseInt(a.ORDEN) - parseInt(b.ORDEN);
          });

          localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));
        } else {
          const nuevoDato = {
            ORDEN: orden,
            DETALLE: localStorage.getItem("iniciar_orden_d"),
            STATUS: "AUTORIZADO",
            INICIO: fecha_actual(),
          };
          datosJSON = datosJSON.filter(
            (item) => item.ORDEN !== localStorage.getItem("iniciar_orden")
          );
          datosJSON.push(nuevoDato);
          datosJSON2 = datosJSON.sort((a, b) => {
            return Number(a.ORDEN) - Number(b.ORDEN);
          });
          localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));
        }

        await enviarCorreo()
/*         abrirYCerrarPagina("https://ccubias487.github.io/disagro_beta/materiales_orden_correo.html", 5000)
 */        await actualizar_autorizacion()

        setTimeout(() => {
          window.location.href = "ejecutando.html";
        }, 1000);
      }
      localStorage.removeItem("agregar_material")


    } else {
      const fechayhora = fecha_actual();
      let datosJSON = [];

      try {
        datosJSON = JSON.parse(localStorage.getItem("autorizaciones") || "[]");
      } catch (e) {
        console.error("Error al parsear 'autorizaciones':", e);
        localStorage.removeItem("autorizaciones");
      }


      if (localStorage.getItem("autorizaciones") == null) {
        let datosJSON = [];
        const nuevoDato = {
          ORDEN: orden,
          DETALLE: localStorage.getItem("iniciar_orden_d"),
          STATUS: "AUTORIZADO",
          INICIO: fechayhora,
        };
        console.log(nuevoDato);
        datosJSON.push(nuevoDato);
        datosJSON = datosJSON.sort((a, b) => {
          return parseInt(a.ORDEN) - parseInt(b.ORDEN);
        });

        localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));
      } else {
        //let datos = JSON.parse(localStorage.getItem("autorizaciones"));
        let datos = [];

        try {
          datos = JSON.parse(localStorage.getItem("autorizaciones") || "[]");
        } catch (e) {
          console.error("Error al parsear 'autorizaciones':", e);
          localStorage.removeItem("autorizaciones");
        }

        const existe = datos.some(
          (item) => item.ORDEN === localStorage.getItem("iniciar_orden_d")
        );

        if (existe) {
          //aca
          //window.location.href = "ejecutando.html";
          setTimeout(() => {
            window.location.href = "ejecutando.html";
          }, 1000);
        } else {
          const nuevoDato = {
            ORDEN: orden,
            DETALLE: localStorage.getItem("iniciar_orden_d"),
            STATUS: "PENDIENTE",
            INICIO: fechayhora,
          };
          datosJSON = datosJSON.filter(
            (item) => item.ORDEN !== localStorage.getItem("iniciar_orden")
          );
          datosJSON.push(nuevoDato);
          datosJSON2 = datosJSON.sort((a, b) => {
            return Number(a.ORDEN) - Number(b.ORDEN);
          });
          localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));
        }
      }
      //aca
      //window.location.href = "ejecutando.html";
      setTimeout(() => {
        window.location.href = "ejecutando.html";
      }, 1000);
    }
  });

buscarOrdenesPorCodEstructurado(localStorage.getItem("cod_empleado")).then(data => {

  data = Object.values(data).flat();

  const jsondata = data.sort((a, b) => {
    return parseInt(a.PRIORIDAD) - parseInt(b.PRIORIDAD);
  });

  function ventana_flotante(k) {
    let fila = this.rowIndex - 1;
    console.log(fila);
    materiales = JSON.parse(localStorage.getItem("agregar_material"));
    localStorage.setItem("ventana_flotante", fila);
    //document.getElementById("cantidad_insumo").value=""
    const modal = document.getElementById("myModal");
    const closeBtn = document.getElementById("closeBtn");
    modal.style.display = "flex";
    document.getElementById("producto").innerHTML = materiales[k].DESCRIPCION;
    document.getElementById("existencia").innerHTML =
      "EXISTENCIA: " + materiales[k].EXISTENCIA;
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
        console.log("borrando: ", k);

        const ordenesFiltradas = materiales.filter(
          (item) => item.SAP !== materiales[k].SAP
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
        materiales = JSON.parse(localStorage.getItem("agregar_material"));
        //k = localStorage.getItem("ventana_flotante");
        let orden = localStorage.getItem("iniciar_orden");
        let datosJSON = [];
        let material = "";
        const modal = document.getElementById("myModal");
        const nuevoDato = {
          ORDEN: orden,
          SAP: materiales[k].SAP,
          DESCRIPCION: materiales[k].DESCRIPCION,
          CANTIDAD: document.getElementById("cantidad_insumo").value,
          EXISTENCIA: materiales[k].EXISTENCIA,
          VALOR_TOTAL: materiales[k].VALOR_TOTAL,
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
            (item) => item.SAP !== materiales[k].SAP
          );
          datosJSON.push(nuevoDato);
          localStorage.setItem("agregar_material", JSON.stringify(datosJSON));
          modal.style.display = "none";
        }
        location.reload();
      });
  }






  //console.log(jsondata)
  const container = document.getElementById("actividades_asignadas");
  let contador = 1;
  let datosJSON = [];
  for (let i in jsondata) {
    //console.log(jsondata[i].HOJARUTA)

    function iniciar_orden() {
      localStorage.setItem("iniciar_orden_hr", jsondata[i].HOJARUTA);
    }

    if (jsondata[i].HOJARUTA == localStorage.getItem("iniciar_orden_hr")) {
      const nuevoDato = {
        ORDEN: orden,
        SAP: jsondata[i].CODIGO,
        DESCRIPCION: jsondata[i].DESCRIPCION,
        CANTIDAD: jsondata[i].CANTIDAD,
        EXISTENCIA: jsondata[i].EXISTENCIA,
        VALOR_TOTAL: jsondata[i].VALOR_TOTAL,
      };

      let material = localStorage.getItem("agregar_material");
      console.log(material)
      if ((localStorage.getItem("agregar_material") == null)) {
        datosJSON.push(nuevoDato);
        console.log(datosJSON);
        localStorage.setItem("agregar_material", JSON.stringify(datosJSON));
      } else {
        datosJSON = JSON.parse(material);
        //console.log(datosJSON)
        datosJSON = datosJSON.filter(
          (item) => item.SAP !== jsondata[i].CODIGO
        );
        datosJSON.push(nuevoDato);

        //console.log(datosJSON)
        localStorage.setItem("agregar_material", JSON.stringify(datosJSON));
      }

      contador = contador + 1;
      if (Number(jsondata[i].CANTIDAD) > Number(jsondata[i].EXISTENCIA)) {
        document.getElementById("insumos" + i).style.backgroundColor =
          "rgb(147, 81, 85)";
      }
    }
  }

  datosJSON = JSON.parse(localStorage.getItem("agregar_material"));
  for (let j in datosJSON) {
    const div = document.createElement("div");
    div.id = "insumos" + j;
    div.onclick = function () { ventana_flotante(j) }
    div.className = "cuadro_resumen_insumos";
    div.innerHTML =
      '<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">CODIGO: &nbsp &nbsp' +
      datosJSON[j].SAP +
      '</div><div class="titulo_resumen_ordenes">DESCRIPCION: &nbsp &nbsp' +
      datosJSON[j].DESCRIPCION.substring(0, 28) +
      '</div><div class="titulo_resumen_ordenes">CANTIDAD: &nbsp &nbsp' +
      datosJSON[j].CANTIDAD +
      '</div><div class="titulo_resumen_ordenes">EXISTENCIA: &nbsp &nbsp' +
      datosJSON[j].EXISTENCIA +
      "</div></div></div>";

    materiales_req = Number(datosJSON[j].EXISTENCIA) - Number(datosJSON[j].CANTIDAD)

    if (materiales_req < 0) {
      div.style.backgroundColor = "#d5383887";
    }

    container.appendChild(div);
  }
  function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  insumo_salir = JSON.parse(localStorage.getItem("agregar_material"));
  //console.log(insumo_salir)
  if ((insumo_salir == null) || (insumo_salir.length === 0)) {
    let aleatorio_image =
      "https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/empty" +
      numeroAleatorio(1, 3) +
      ".png";

    const div = document.getElementById("no_encontrado");
    const imagen = document.createElement("img");
    imagen.src = aleatorio_image;
    imagen.alt = "No encontrado";
    imagen.style.width = "400px";
    imagen.style.height = "400px";
    div.appendChild(imagen);
    document.getElementById("no_encontrado_texto").innerHTML =
      "NO SE ENCOTRARON INSUMOS PARA ESTA ORDEN";
    document.getElementById("no_encontrado_texto").style.fontSize =
      "xx-large";
    document.getElementById("no_encontrado_texto").style.fontWeight = "bold";
    document.getElementById("no_encontrado_texto").style.color = "White";
    document.getElementById("boton_siguiente").innerHTML = "Iniciar orden";
  } else {
    const div = document.getElementById("no_encontrado");
    const imagen = document.createElement("img");
    //imagen.src = aleatorio_image;
    imagen.alt = "No encontrado";
    imagen.style.width = "0px";
    imagen.style.height = "0px";
    div.appendChild(imagen);
    document.getElementById("no_encontrado_texto").innerHTML = "";

  }
});

