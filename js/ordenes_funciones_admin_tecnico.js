document.getElementById("loader-container").style.display = "flex";
if (localStorage.getItem("usuario") == null) {
  window.location.href = "index.html";
}

document.getElementById("inicio").addEventListener("click", function () {
  window.location.href = "principal.html";
});

document.getElementById("proceso").addEventListener("click", function () {
  localStorage.setItem("ordenes_mostrar", "EJECUTANDO")
  window.location.href = "ordenes_realizadas_admin.html";
});

document.getElementById("realizadas").addEventListener("click", function () {
  localStorage.setItem("ordenes_mostrar", "FINALIZADA")
  window.location.href = "ordenes_realizadas_admin.html";
});

document.getElementById("no_finalizadas").addEventListener("click", function () {
  window.location.href = "ordenes_pausa_admin.html";
});

document.getElementById("asignadas").addEventListener("click", function () {
  window.location.href = "ordenes_asignadas_admin.html";
});

fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/user.json")
  .then((response) => response.json())
  .then((empleado) => {


    buscarOrdenesPorCodEstructurado(localStorage.getItem("cod_empleado")).then(data => {

   data = Object.values(data).flat();

    const container = document.getElementById('ordenes_asignadas');
    const ordenesUnicas = new Set();


    function consolidarOrdenesPorUsuario(ordenes, usuarios) {
      const estados = ["PENDIENTE", "EJECUTANDO", "PAUSADA", "FINALIZADA"];

      const resultado = usuarios.map(user => ({
        USUARIO: user.USUARIO,
        NOMBRE: user.NOMBRE,
        ORDENES: {
          PENDIENTE: 0,
          EJECUTANDO: 0,
          PAUSADA: 0,
          FINALIZADA: 0
        }
      }));

      const ordenesPorOrden = {};
      for (const orden of ordenes) {
        const clave = `${orden.ORDEN}_${orden.COD}`;
        if (!ordenesPorOrden[clave]) {
          ordenesPorOrden[clave] = {
            ORDEN: orden.ORDEN,
            COD: orden.COD,
            ESTATUS: orden.ESTATUS
          };
        }
      }

      for (const key in ordenesPorOrden) {
        const { COD, ESTATUS } = ordenesPorOrden[key];
        const usuario = resultado.find(u => u.USUARIO === COD);
        if (usuario && estados.includes(ESTATUS)) {
          usuario.ORDENES[ESTATUS]++;
        }
      }

      return resultado;
    }


    buscarOrdenesPorEmpleado(localStorage.getItem("tecnico_visualizar_user")).then(resultado => {
  console.log("Órdenes agrupadas por estado:", resultado);

let total_ordenes= resultado.EJECUTANDO.length+resultado.FINALIZADA.length+resultado.PAUSADA.length+resultado.PENDIENTE.length
    //console.log(buscarOrdenesPorEmpleado(localStorage.getItem("tecnico_visualizar_user")))
    document.getElementById("asignadas").innerHTML = "<div class='card_titulo'>ASIGNADAS</div><div class='card_cantidad'>"+total_ordenes+"</div>"
    document.getElementById("realizadas").innerHTML = "<div class='card_titulo'>REALIZADAS</div><div class='card_cantidad'>"+resultado.FINALIZADA.length+"</div>"

    document.getElementById("proceso").innerHTML = "<div class='card_titulo'>EN PROCESO</div><div class='card_cantidad'>"+resultado.EJECUTANDO.length+"</div>"

    document.getElementById("no_finalizadas").innerHTML = "<div class='card_titulo'>EN PAUSA</div><div class='card_cantidad'>"+resultado.PAUSADA.length+"</div>"

    function setProgress(percent, bgColor = '#e6e6e6', progressColor = '#00bfa6') {
      const circleLength = 126.92;
      const offset = circleLength - (percent / 100) * circleLength;

      const progress = document.querySelector('.progress');
      const bg = document.querySelector('.bg');
      const text = document.getElementById('progress-text');

      // Cambiar el progreso visual
      progress.style.strokeDashoffset = offset;

      // Cambiar texto
      text.textContent = `${percent}%`;

      // Cambiar colores
      progress.style.stroke = progressColor;
      bg.style.stroke = bgColor;
      //text.style.color = progressColor;
    }



    let progreso = ((resultado.FINALIZADA.length / total_ordenes) * 100)
    console.log(progreso)
  if (isNaN(progreso) || !isFinite(progreso)) {
  progreso = 0;
}

     console.log(progreso)
    let primario = "#00bfa6"
    let secundario = "#b5e8e2"

    if (progreso <= 35) {
      primario = '#d93535'
      secundario = '#ff7070'
    }
    if ((progreso > 35) && (progreso <= 65)) {
      primario = '#caa905'
      secundario = '#faff70'
    }
    if ((progreso > 65)) {
      primario = '#05ca4d'
      secundario = '#6eeb9c'
    }

    setProgress(progreso.toFixed(1), secundario, primario); // Fondo gris claro, progreso naranja





    document.getElementById("tecnico_seleccionado").innerHTML = localStorage.getItem("tecnico_visualizar_name")
    document.getElementById("tecnico_seleccionado").style.textAlign = "center"
    document.getElementById("loader-container").style.display = "none";
 
 });
  })
  
  });


  window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    console.log("Volviendo del historial (no se recarga)");
    // Aquí puedes evitar re-cargar datos o volver a renderizar cosas
  } else {
    console.log("Carga normal o recarga manual");
  }
});
