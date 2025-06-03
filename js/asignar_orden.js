    const form = document.getElementById('ordenForm');
    const tabla = document.querySelector('#tablaOrdenes tbody');
    const actividadesContainer = document.getElementById('actividadesContainer');
    const tecnicoSelect = document.getElementById('tecnico');

    let actividades = [];

    // Función para cargar técnicos desde el JSON remoto
    function cargarTecnicos() {
      const url = 'https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/user.json';
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Filtrar sólo técnicos
        //  console.log(data)
          const tecnicos = data.filter(u => u.TIPO === 'USER');
          tecnicoSelect.innerHTML = '<option value="">-- Seleccione un técnico --</option>';
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

function agregarActividad() {
  const descInput = document.getElementById('actividadInput');
  const tiempoInput = document.getElementById('tiempoInput');
  const unidad = document.getElementById('unidadTiempo').value;

  const desc = descInput.value.trim();
  const tiempo = tiempoInput.value.trim();

  // Quitar clases previas
  descInput.classList.remove('is-invalid');
  tiempoInput.classList.remove('is-invalid');

  if (!desc) {
  //  alert("Por favor, ingrese la descripción de la actividad.");
    descInput.classList.add('is-invalid');
    descInput.focus();
    return;
  }

  if (!tiempo) {
   // alert("Por favor, ingrese el tiempo estimado.");
    tiempoInput.classList.add('is-invalid');
    tiempoInput.focus();
    return;
  }

  let minutos_orden=0
  if(unidad=="H"){
    minutos_orden=String(tiempo*60)
  }else{
    minutos_orden=String(tiempo)
  }

  
  actividades.push({ descripcion: desc.toUpperCase(), tiempo:minutos_orden, unidad:"MIN" });

  descInput.value = '';
  tiempoInput.value = '';
  descInput.classList.remove('is-invalid');
  tiempoInput.classList.remove('is-invalid');
  document.getElementById("unidadTiempo").value="MIN"
  descInput.focus();
  renderizarActividades();
}

function eliminarActividad(index) {
  if (confirm("¿Seguro que deseas eliminar esta actividad?")) {
    actividades.splice(index, 1);
    renderizarActividades();
  }
}

   function renderizarActividades() {
  actividadesContainer.innerHTML = '';
  actividades.forEach((a, index) => {
    const tiempoTxt = a.tiempo ? ` (${a.tiempo} ${a.unidad})` : '';
    
    const div = document.createElement('div');
    div.className = 'actividad-item d-flex justify-content-between align-items-center';

    div.innerHTML = `
      <div>${index + 1}. ${a.descripcion}${tiempoTxt}</div>
      <button type="button" class="btn btn-sm btn-danger" onclick="eliminarActividad(${index})">Eliminar</button>
    `;

    actividadesContainer.appendChild(div);
  });
}



    function cargarOrdenes() {
      tabla.innerHTML = '';
      const ordenes = JSON.parse(localStorage.getItem('ordenesTrabajo') || '[]');
      ordenes.forEach((orden, i) => {
        const actividadesHtml = orden.actividades?.map((a, j) => {
          const tiempoTxt = a.tiempo ? ` (${a.tiempo} ${a.unidad})` : '';
          return `<div>${j + 1}. ${a.descripcion}${tiempoTxt}</div>`;
        }).join('') || '';
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${orden.cod}</td>
          <td>${orden.tipo}</td>
          <td>${orden.fecha}</td>
          <td>${orden.ubicacion}</td>
          <td>${actividadesHtml}</td>
          <td><button class="btn btn-danger btn-sm" onclick="eliminarOrden(${i})">Eliminar</button></td>
        `;
        tabla.appendChild(fila);
      });
    }

    function eliminarOrden(index) {
      const ordenes = JSON.parse(localStorage.getItem('ordenesTrabajo') || '[]');
      ordenes.splice(index, 1);
      localStorage.setItem('ordenesTrabajo', JSON.stringify(ordenes));
      cargarOrdenes();
    }
form.addEventListener('submit', e => {
  e.preventDefault();

  if (!form.tecnico.value.trim()) {
    alert("Debe seleccionar un técnico.");
    form.tecnico.focus();
    return;
  }

  if (actividades.length===0) {
    alert("Debe agregar al menos una actividad.");
    document.getElementById("actividadInput").focus();
    return;
  }

  const tecnico = form.tecnico.value.trim();
  const fecha = new Date(form.fecha.value);
  const fechaFormateada = fecha.toLocaleDateString('es-ES');
  const ubicacion = form.ubicacion.value.trim();

  // Valores fijos de equipo
  const equipo = "";
  const equipoCod = "";

  // Generar número de orden aleatorio de 10 dígitos
  /* let numeroOrden;
  do {
    numeroOrden = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  } while (JSON.parse(localStorage.getItem('jsonOrdenes') || '{}')[numeroOrden]); */

const now = new Date();

const año = now.getFullYear();
const mes = String(now.getMonth() + 1).padStart(2, '0');
const dia = String(now.getDate()).padStart(2, '0');
const minutos = String(now.getMinutes()).padStart(2, '0');
const segundos = String(now.getSeconds()).padStart(2, '0');

// ORDEN = AAAAMMDDmmss
const numeroOrden = `${año}${mes}${dia}${minutos}${segundos}`;


  const baseData = {
    CENTRO: "",
    ESTATUS: "PENDIENTE",
    FECHA_EMISION: fechaFormateada,
    HOJA: "",
    ORDEN: numeroOrden,
    PRIORIDAD: "1",
    TECNICO: tecnico,
    TIEMPO_ORDEN: "00:00:00",
    UBICACION: ubicacion
  };

 // let dataJSON = JSON.parse(localStorage.getItem('jsonOrdenes') || '{}');

  let dataJSON ={}

  dataJSON = actividades.map((actividad, index) => ({
    ...baseData,
    ACTIVIDAD: actividad.descripcion.toUpperCase(),
    CLASE_MANTTO: document.getElementById("tipo").value,
    DESCRIPCION: document.getElementById("descripcion_orden").value,
    POSICION: `${(index + 1) * 10}`,
    TIEMPO: actividad.tiempo,
    UNIDAD_TRABAJO: actividad.unidad.toUpperCase(),
    COD: tecnico || "undefined",      // si no usas COD puedes quitar esta línea
    NOMBRE: tecnico || "undefined",   // lo mismo aquí
    EQUIPO: equipoCod,
    EQUIPO_COD: equipoCod
  }));

  localStorage.setItem('jsonOrdenes', JSON.stringify(dataJSON, null, 2));
//console.log(JSON.parse(dataJSON))
agregarData(dataJSON)
console.log(dataJSON)
  alert(`Orden ${numeroOrden} guardada exitosamente.`);

  actividades = [];
  form.reset();
  renderizarActividades();
  //cargarOrdenes(); // si tienes tabla visible
});


    window.onload = () => {
      cargarTecnicos();
     // cargarOrdenes();
    };