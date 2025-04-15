localStorage.removeItem("autorizaciones");
document.getElementById("inicio").addEventListener("click", function () {
  window.location.href = "principal.html";
});

if (localStorage.getItem("usuario") == null) {
  window.location.href = "index.html";
}
document.getElementById("actividades_asignadas").style.paddingBottom = "300px";

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

setInterval(() => {
  location.reload();
}, 30000); // 30000 milisegundos = 30 segundos

let orden = localStorage.getItem("iniciar_orden");

fetch(
  "https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/autorizacion.json"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const jsondata = data.sort((a, b) => {
      return parseInt(a.PRIORIDAD) - parseInt(b.PRIORIDAD);
    });

    function hora(i) {
      const fechayhora = fecha_actual();
      let material = JSON.parse(localStorage.getItem("autorizaciones"));
      if (material[i].STATUS !== "PENDIENTE") {
        if (localStorage.getItem("autorizaciones") == null) {
          if (material[i].hasOwnProperty("INICIO") == false) {
            const nuevoDato = {
              ORDEN: datosJSON[i].ORDEN,
              DETALLE: datosJSON[i].DETALLE,
              STATUS: datosJSON[i].STATUS,
              INICIO: fechayhora,
            };
            datosJSON = datosJSON.sort((a, b) => {
              return parseInt(a.ORDEN) - parseInt(b.ORDEN);
            });
            datosJSON.push(nuevoDato);
            localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));
          }
        } else {
          if (material[i].hasOwnProperty("INICIO") == false) {
            const nuevoDato = {
              ORDEN: material[i].ORDEN,
              DETALLE: material[i].DETALLE,
              STATUS: material[i].STATUS,
              INICIO: fechayhora,
            };
            datosJSON = datosJSON.filter(
              (item) => item.ORDEN !== material[i].ORDEN
            );
            datosJSON.push(nuevoDato);
            datosJSON2 = datosJSON.sort((a, b) => {
              return Number(a.ORDEN) - Number(b.ORDEN);
            });
            localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));
          }
        }
        window.location.href = "ejecutando.html";
      } else {

        const modal = document.getElementById("myModal");
        const closeBtn = document.getElementById("closeBtn");
        modal.style.display = "flex";

        setTimeout(()=>{
          modal.style.display="none"
        }, 1500)
      }
    }

    //console.log(jsondata)
    const container = document.getElementById("actividades_asignadas");

    let datosJSON = [];

    for (let i in jsondata) {
      let material = JSON.parse(localStorage.getItem("autorizaciones"));

      if (localStorage.getItem("autorizaciones") == null) {
        const nuevoDato = {
          ORDEN: jsondata[i].ORDEN,
          DETALLE: jsondata[i].DETALLE,
          STATUS: jsondata[i].STATUS,
        };
        datosJSON.push(nuevoDato);
        localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));
      } else {
        const encontrado = material.some((item) =>
          Object.values(item).some(
            (valor) =>
              typeof valor === "string" && valor.includes(jsondata[i].ORDEN)
          )
        );
        if (encontrado == false) {
          const nuevoDato = {
            ORDEN: jsondata[i].ORDEN,
            DETALLE: jsondata[i].DETALLE,
            STATUS: jsondata[i].STATUS,
          };
          //datosJSON = datosJSON.filter(item => item.ORDEN !== jsondata[i].ORDEN);
          datosJSON.push(nuevoDato);
          datosJSON2 = datosJSON.sort((a, b) => {
            return Number(a.ORDEN) - Number(b.ORDEN);
          });
          localStorage.setItem("autorizaciones", JSON.stringify(datosJSON));
        }
      }
    }

    datosJSON = JSON.parse(localStorage.getItem("autorizaciones"));
    datosJSON = datosJSON.sort((a, b) => {
      return parseInt(a.ORDEN) - parseInt(b.ORDEN);
    });

    let contador = 1;
    for (let j in datosJSON) {
      const div = document.createElement("div");
      div.id = "insumos" + j;

      div.className = "cuadro_resumen_insumos";
      div.innerHTML =
        '<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">ORDEN : &nbsp &nbsp' +
        datosJSON[j].ORDEN +
        '</div><div class="titulo_resumen_ordenes">DESCRIPCION: &nbsp &nbsp' +
        datosJSON[j].DETALLE.substring(0, 28) +
        '</div><div class="titulo_resumen_ordenes">STATUS : &nbsp &nbsp' +
        datosJSON[j].STATUS +
        "</div></div></div>";

      //div.innerHTML = '<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">ORDEN : &nbsp &nbsp' + localStorage.getItem("iniciar_orden") + '</div><div class="titulo_resumen_ordenes">DESCRIPCION: &nbsp &nbsp' + (localStorage.getItem("iniciar_orden_d")).substring(0, 28) + '</div><div class="titulo_resumen_ordenes">STATUS : &nbsp &nbsp AUTORIZADO </div></div></div>'
      div.onclick = function () {
        hora(j);
      };
      container.appendChild(div);
      contador = contador + 1;
    }
    function numeroAleatorio(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (contador == 1) {
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
      //document.getElementById("boton_siguiente").innerHTML = "Iniciar orden"
    }
  });
