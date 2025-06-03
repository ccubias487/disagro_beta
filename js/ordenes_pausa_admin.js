if (localStorage.getItem("usuario") == null) {
  window.location.href = "index.html";
}

document.getElementById("inicio").addEventListener("click", function () {
  window.location.href = "principal.html";
})

buscarOrdenesPorCodEstructurado(localStorage.getItem("tecnico_visualizar_user")).then(data => {

   data = Object.values(data).flat();

    console.log(data);
    /* const jsondata = data.sort((a, b) => {
      return a.PRIORIDAD.localeCompare(b.PRIORIDAD);
    }); */

    function parseFecha(fechaStr) {
      if (!fechaStr || typeof fechaStr !== 'string') return null;

      const partes = fechaStr.trim().split('/');
      if (partes.length !== 3) return null;

      const [dia, mes, anio] = partes;
      return new Date(`${anio}-${mes}-${dia}`);
    }

    const jsondata = data.sort((a, b) => {
      const prioridadOrden = a.PRIORIDAD.localeCompare(b.PRIORIDAD);
      if (prioridadOrden !== 0) return prioridadOrden;

      const fechaA = parseFecha(a.FECHA_EMISION);
      const fechaB = parseFecha(b.FECHA_EMISION);

      if (!fechaA) return 1; // pone al final las fechas inválidas
      if (!fechaB) return -1;

      return fechaA - fechaB;
    });


    /* jsondata.forEach(item => {
      console.log(item.PRIORIDAD, item.FECHA_EMISION);
    }); */

    console.log(jsondata)


    /* console.log(jsondata); */

    const container = document.getElementById('ordenes_asignadas');
    const ordenesUnicas = new Set(); // Para rastrear órdenes ya agregadas

    document.getElementById("ordenes_asignadas").innerHTML =
      '<table class="tabla_notificacions" id="tabla_requisiciones"><tbody><tr><th scope="col" width="40px">ORDEN</th><th scope="col" width="40px">PRIO</th><th scope="col" width="80px">TIEMPO</th><th scope="col" width="680px">DESCRIPCION</th><th scope="col" width="140px">EMISION</th></tr></tbody></table>';


    function orden_elegida() {
      fila = this.rowIndex;
      /*   console.log(fila) */
    }

    for (let i in jsondata) {
      const orden = jsondata[i].ORDEN;

      // Omitir si ya se procesó esta orden
      if (ordenesUnicas.has(orden)) continue;
      ordenesUnicas.add(orden); // Marcar orden como procesada

      //console.log(jsondata[i].NOMBRE);

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

      function iniciar_orden() {
        localStorage.setItem("iniciar_orden_hr", jsondata[i].HOJARUTA);
        localStorage.setItem("iniciar_orden", jsondata[i].ORDEN);
        localStorage.setItem("iniciar_orden_d", jsondata[i].DESCRIPCION);
        localStorage.removeItem("agregar_material");

        let material = [];

        try {
          material = JSON.parse(localStorage.getItem("autorizaciones") || "[]");
        } catch (e) {
          console.error("Error al parsear autorizaciones:", e);
          //localStorage.removeItem("autorizaciones");
        }


        if (material !== null) {
          const indice = material.findIndex(item =>
            Object.values(item).some(valor =>
              typeof valor === "string" && valor.includes(jsondata[i].ORDEN)
            )
          );

          /* console.log(material);
          console.log(jsondata[i].ORDEN);
          console.log(material[i]); */
       if (indice !== -1 && material[indice].hasOwnProperty("INICIO") == true) {


            window.location.href = "ejecutando.html"

          } else {
            window.location.href = "actividades.html";
          }
        } else {
          window.location.href = "actividades.html";
        }
      }

      /* if (jsondata[i].NOMBRE == localStorage.getItem("cod_empleado")) {
        const div = document.createElement('div');
        div.className = 'cuadro_resumen_ordenes';
        div.innerHTML =
          '<div class="cuadro_resumen_ordenes_superpuesto"></div>' +
          '<div class="titulo_resumen_ordenes">' +
          '<div class="titulo_resumen_ordenes">ORDEN: ' + jsondata[i].ORDEN + '</div>' +
          '<div class="titulo_resumen_ordenes">NOMBRE:' + jsondata[i].NOMBRE + '</div>' +
          '<div class="titulo_resumen_ordenes">DESCRIPCION: ' + jsondata[i].DESCRIPCION + '</div>' +
          '</div><div class="prioridad" id="prioridad' + i + '"></div>';

        div.onclick = iniciar_orden;
        container.appendChild(div);

        // Colorear según prioridad
        const prioridadColor = {
          "A": "rgb(175, 8, 5)",
          "B": "rgb(202 169 5)",
          "C": "rgb(83, 202, 5)"
        };

        const prioridad = jsondata[i].PRIORIDAD;
        if (prioridadColor[prioridad]) {
          document.getElementById("prioridad" + i).style.backgroundColor = prioridadColor[prioridad];
        }
      } */

      console.log(jsondata[i].NOMBRE)
      if (jsondata[i].NOMBRE == localStorage.getItem("tecnico_visualizar_user")) {
      if (jsondata[i].ESTATUS == "PAUSADA") {
        let tablaRef = document.getElementById("tabla_requisiciones");
        let filaRef = tablaRef.insertRow(-1);
        filaRef.onclick = iniciar_orden;

         const prioridadColor = {
          "A": "rgb(202, 80, 80)",
          "B": "rgb(223, 236, 89)",
          "C": "rgb(87, 220, 82)",
          "1": "rgb(201, 52, 52)"
        };

        filaRef.insertCell(0).textContent = jsondata[i].ORDEN;

        const prioridad = jsondata[i].PRIORIDAD;
        const celdaPrioridad = filaRef.insertCell(1);

        // Crear el círculo de color
        if (prioridadColor[prioridad]) {
          const circulo = document.createElement("div");
          circulo.style.width = "35px";
          circulo.style.height = "35px";
          circulo.style.borderRadius = "50%";
          circulo.style.backgroundColor = prioridadColor[prioridad];
          circulo.style.margin = "auto"; // Centrado en la celda
          celdaPrioridad.appendChild(circulo);
        }

filaRef.insertCell(2).textContent = jsondata[i].TIEMPO_ORDEN;
        filaRef.insertCell(3).textContent = jsondata[i].DESCRIPCION;
        filaRef.insertCell(4).textContent = jsondata[i].FECHA_EMISION;
        //console.log(jsondata[i].FECHA_EMISION)
      }
    }
    }
  });
