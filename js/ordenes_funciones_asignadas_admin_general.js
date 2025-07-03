if (localStorage.getItem("usuario") == null) {
  window.location.href = "index.html";
}

/* document.getElementById("inicio").addEventListener("click", function () {
  window.location.href = "principal.html";
}) */

let ordenesFiltradas = []; // global

//buscarOrdenesPorCodEstructurado(localStorage.getItem("tecnico_visualizar_user")).then(data => {
leerOrden_general().then(data => { 
 //   console.log(data);
    /* const jsondata = data.sort((a, b) => {
      return a.PRIORIDAD.localeCompare(b.PRIORIDAD);
    }); */

    console.log(data)
    function parseFecha(fechaStr) {
      if (!fechaStr || typeof fechaStr !== 'string') return null;

      const partes = fechaStr.trim().split('/');
      if (partes.length !== 3) return null;

      const [dia, mes, anio] = partes;
      return new Date(`${anio}-${mes}-${dia}`);
    }

const actividades = Object.values(data).flat();
const jsondata = actividades.sort((a, b) => {
  const prioridadOrden = a.PRIORIDAD.localeCompare(b.PRIORIDAD);
  if (prioridadOrden !== 0) return prioridadOrden;

  const fechaA = parseFecha(a.FECHA_EMISION);
  const fechaB = parseFecha(b.FECHA_EMISION);

  if (!fechaA || isNaN(fechaA)) return 1; // fechas inválidas al final
  if (!fechaB || isNaN(fechaB)) return -1;

  return fechaA - fechaB;
});

ordenesFiltradas = jsondata





    /* jsondata.forEach(item => {
      console.log(item.PRIORIDAD, item.FECHA_EMISION);
    }); */

    console.log(jsondata)


    /* console.log(jsondata); */

    const container = document.getElementById('ordenes_asignadas');
    const ordenesUnicas = new Set(); // Para rastrear órdenes ya agregadas

    document.getElementById("ordenes_asignadas").innerHTML =
      '<table class="tabla_notificacions" id="tabla_requisiciones"><tbody><tr><th scope="col" width="40px">ORDEN</th><th scope="col" width="40px">PRIO</th><th scope="col" width="280px">DESCRIPCION</th><th scope="col" width="280px">TECNICO</th><th scope="col" width="140px">EMISION</th><th scope="col" width="140px">STATUS</th></tr></tbody></table>';


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
          localStorage.removeItem("autorizaciones");
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

      

      console.log(jsondata[i].NOMBRE)
      //if ((jsondata[i].NOMBRE == localStorage.getItem("tecnico_visualizar_user")) || (localStorage.getItem("tecnico_visualizar_user")=="TODOS")){
      //if (jsondata[i].ESTATUS !== "FINALIZADA") {
        console.log(jsondata[i].TECNICO)
        let tablaRef = document.getElementById("tabla_requisiciones");
        let filaRef = tablaRef.insertRow(-1);
        //filaRef.onclick = iniciar_orden;

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

        filaRef.insertCell(2).textContent = jsondata[i].DESCRIPCION;
        filaRef.insertCell(3).textContent = jsondata[i].TECNICO;
        filaRef.insertCell(4).textContent = jsondata[i].FECHA_EMISION;
        filaRef.insertCell(5).textContent = jsondata[i].ESTATUS
        //console.log(jsondata[i].FECHA_EMISION)
      //}
   // }
    }
  });



 

function renderizarTabla_Nombre(tecnico) {
  const tablaBody = document.getElementById("ordenes_asignadas")
  tablaBody.innerHTML = ""; // Limpiar solo el cuerpo, no los encabezados
/* document.getElementById("ordenes_asignadas").innerHTML ='' */

  tablaBody.innerHTML =
      '<table class="tabla_notificacions" id="tabla_requisiciones"><tbody><tr><th scope="col" width="40px">ORDEN</th><th scope="col" width="40px">PRIO</th><th scope="col" width="280px">DESCRIPCION</th><th scope="col" width="280px">TECNICO</th><th scope="col" width="140px">EMISION</th><th scope="col" width="140px">STATUS</th></tr></tbody></table>';

  const ordenesUnicas = new Set();

  for (let i in ordenesFiltradas) {
    const orden = ordenesFiltradas[i].ORDEN;
    if (ordenesUnicas.has(orden)) continue;
    ordenesUnicas.add(orden);

    if (tecnico && tecnico !== ordenesFiltradas[i].NOMBRE) continue;
        let tablaRef = document.getElementById("tabla_requisiciones");
        let filaRef = tablaRef.insertRow(-1);
        const prioridadColor = {
          "A": "rgb(202, 80, 80)",
          "B": "rgb(223, 236, 89)",
          "C": "rgb(87, 220, 82)",
          "1": "rgb(201, 52, 52)"
        };


        filaRef.insertCell(0).textContent = ordenesFiltradas[i].ORDEN;

        const prioridad = ordenesFiltradas[i].PRIORIDAD;
        const celdaPrioridad = filaRef.insertCell(1);

        if (prioridadColor[prioridad]) {
          const circulo = document.createElement("div");
          circulo.style.width = "35px";
          circulo.style.height = "35px";
          circulo.style.borderRadius = "50%";
          circulo.style.backgroundColor = prioridadColor[prioridad];
          circulo.style.margin = "auto"; // Centrado en la celda
          celdaPrioridad.appendChild(circulo);
        }

        filaRef.insertCell(2).textContent = ordenesFiltradas[i].DESCRIPCION;
        filaRef.insertCell(3).textContent = ordenesFiltradas[i].TECNICO;
        filaRef.insertCell(4).textContent = ordenesFiltradas[i].FECHA_EMISION;
        filaRef.insertCell(5).textContent = ordenesFiltradas[i].ESTATUS
  }
}

function renderizarTabla_Estatus(estatus) {
  const tablaBody = document.getElementById("ordenes_asignadas")
  tablaBody.innerHTML = ""; // Limpiar solo el cuerpo, no los encabezados
/* document.getElementById("ordenes_asignadas").innerHTML ='' */

  tablaBody.innerHTML =
      '<table class="tabla_notificacions" id="tabla_requisiciones"><tbody><tr><th scope="col" width="40px">ORDEN</th><th scope="col" width="40px">PRIO</th><th scope="col" width="280px">DESCRIPCION</th><th scope="col" width="280px">TECNICO</th><th scope="col" width="140px">EMISION</th><th scope="col" width="140px">STATUS</th></tr></tbody></table>';

  const ordenesUnicas = new Set();

  for (let i in ordenesFiltradas) {
    const orden = ordenesFiltradas[i].ORDEN;
    if (ordenesUnicas.has(orden)) continue;
    ordenesUnicas.add(orden);

    if (estatus && estatus !== ordenesFiltradas[i].ESTATUS) continue;
        let tablaRef = document.getElementById("tabla_requisiciones");
        let filaRef = tablaRef.insertRow(-1);
        const prioridadColor = {
          "A": "rgb(202, 80, 80)",
          "B": "rgb(223, 236, 89)",
          "C": "rgb(87, 220, 82)",
          "1": "rgb(201, 52, 52)"
        };


        filaRef.insertCell(0).textContent = ordenesFiltradas[i].ORDEN;

        const prioridad = ordenesFiltradas[i].PRIORIDAD;
        const celdaPrioridad = filaRef.insertCell(1);

        if (prioridadColor[prioridad]) {
          const circulo = document.createElement("div");
          circulo.style.width = "35px";
          circulo.style.height = "35px";
          circulo.style.borderRadius = "50%";
          circulo.style.backgroundColor = prioridadColor[prioridad];
          circulo.style.margin = "auto"; // Centrado en la celda
          celdaPrioridad.appendChild(circulo);
        }

        filaRef.insertCell(2).textContent = ordenesFiltradas[i].DESCRIPCION;
        filaRef.insertCell(3).textContent = ordenesFiltradas[i].TECNICO;
        filaRef.insertCell(4).textContent = ordenesFiltradas[i].FECHA_EMISION;
        filaRef.insertCell(5).textContent = ordenesFiltradas[i].ESTATUS
  }
}

function renderizarTabla_Orden(orden_buscar) {
  const tablaBody = document.getElementById("ordenes_asignadas")
  tablaBody.innerHTML = ""; // Limpiar solo el cuerpo, no los encabezados

  console.log(orden_buscar)
/* document.getElementById("ordenes_asignadas").innerHTML ='' */

  tablaBody.innerHTML =
      '<table class="tabla_notificacions" id="tabla_requisiciones"><tbody><tr><th scope="col" width="40px">ORDEN</th><th scope="col" width="40px">PRIO</th><th scope="col" width="280px">DESCRIPCION</th><th scope="col" width="280px">TECNICO</th><th scope="col" width="140px">EMISION</th><th scope="col" width="140px">STATUS</th></tr></tbody></table>';

  const ordenesUnicas = new Set();

  for (let i in ordenesFiltradas) {
    const orden = ordenesFiltradas[i].ORDEN;
    if (ordenesUnicas.has(orden)) continue;
    ordenesUnicas.add(orden);

    console.log(ordenesFiltradas[i].ORDEN)
    if (!ordenesFiltradas[i].ORDEN.includes(orden_buscar)) continue;
        let tablaRef = document.getElementById("tabla_requisiciones");
        let filaRef = tablaRef.insertRow(-1);
        const prioridadColor = {
          "A": "rgb(202, 80, 80)",
          "B": "rgb(223, 236, 89)",
          "C": "rgb(87, 220, 82)",
          "1": "rgb(201, 52, 52)"
        };


        filaRef.insertCell(0).textContent = ordenesFiltradas[i].ORDEN;

        const prioridad = ordenesFiltradas[i].PRIORIDAD;
        const celdaPrioridad = filaRef.insertCell(1);

        if (prioridadColor[prioridad]) {
          const circulo = document.createElement("div");
          circulo.style.width = "35px";
          circulo.style.height = "35px";
          circulo.style.borderRadius = "50%";
          circulo.style.backgroundColor = prioridadColor[prioridad];
          circulo.style.margin = "auto"; // Centrado en la celda
          celdaPrioridad.appendChild(circulo);
        }

        filaRef.insertCell(2).textContent = ordenesFiltradas[i].DESCRIPCION;
        filaRef.insertCell(3).textContent = ordenesFiltradas[i].TECNICO;
        filaRef.insertCell(4).textContent = ordenesFiltradas[i].FECHA_EMISION;
        filaRef.insertCell(5).textContent = ordenesFiltradas[i].ESTATUS
  }
}
    function cargarTecnicos() {
      const url = 'https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/user.json';
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Filtrar sólo técnicos
        //  console.log(data)
         const tecnicoSelect = document.getElementById('tecnico'); 
          const tecnicos = data.filter(u => u.TIPO === 'USER');
          tecnicoSelect.innerHTML = '<option value="">TECNICO</option>';
          tecnicos.forEach(t => {
            const option = document.createElement('option');
            option.value = t.USUARIO; // valor el nombre, puedes cambiar por id si quieres
            option.textContent = t.NOMBRE;
            tecnicoSelect.appendChild(option);
          });
        })
        .catch(err => {
          console.error('Error al cargar técnicos:', err);
          tecnicoSelect.innerHTML = '<option value="">Error cargando técnicos</option>';
        });
    }


     window.onload = () => {
      cargarTecnicos();
     // cargarOrdenes();
    };

    document.getElementById('tecnico').addEventListener('change', function () {
      document.getElementById("estatus").value=""
        document.getElementById("orden_buscar").value=""
  const tecnicoSeleccionado = this.value;
  console.log(tecnicoSeleccionado)
  renderizarTabla_Nombre(tecnicoSeleccionado);
});

    document.getElementById('estatus').addEventListener('change', function () {
      document.getElementById("tecnico").value=""
        document.getElementById("orden_buscar").value=""
  const estatusSeleccionado = this.value;
  console.log(estatusSeleccionado)
  renderizarTabla_Estatus(estatusSeleccionado);
});

    document.getElementById('orden_buscar').addEventListener('keydown', function () {
      if (event.key === 'Enter') {
        document.getElementById("tecnico").value=""
        document.getElementById("estatus").value=""
  const ordenSeleccionado = this.value;
  console.log(ordenSeleccionado)
  renderizarTabla_Orden(ordenSeleccionado);
      }
});