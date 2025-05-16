if (localStorage.getItem("usuario")== null){
  window.location.href = "index.html";
}

document.getElementById("inicio").addEventListener("click",function(){
    window.location.href = "principal.html";
})

fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/ordenes_asignadas.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const jsondata = data.sort((a, b) => {
  return a.PRIORIDAD.localeCompare(b.PRIORIDAD);
});


    console.log(jsondata);

    const container = document.getElementById('ordenes_asignadas');
    const ordenesUnicas = new Set(); // Para rastrear órdenes ya agregadas

    for (let i in jsondata) {
      const orden = jsondata[i].ORDEN;

      // Omitir si ya se procesó esta orden
      if (ordenesUnicas.has(orden)) continue;
      ordenesUnicas.add(orden); // Marcar orden como procesada

      console.log(jsondata[i].NOMBRE);

      function iniciar_orden(){
        localStorage.setItem("iniciar_orden_hr", jsondata[i].HOJARUTA);
        localStorage.setItem("iniciar_orden", jsondata[i].ORDEN);
        localStorage.setItem("iniciar_orden_d", jsondata[i].DESCRIPCION);
        localStorage.removeItem("agregar_material");

        let material = JSON.parse(localStorage.getItem("autorizaciones"));

        if (material !== null) {
          const indice = material.findIndex(item =>
            Object.values(item).some(valor =>
              typeof valor === "string" && valor.includes(jsondata[i].ORDEN)
            )
          );

          console.log(material);
          console.log(jsondata[i].ORDEN);
          console.log(material[i]);

          if (indice !== -1 && material[indice].hasOwnProperty("INICIO") == true) {
            window.location.href = "ejecutando.html";
          } else {
            window.location.href = "actividades.html";
          }
        } else {
          window.location.href = "actividades.html";
        }
      }

      if (jsondata[i].NOMBRE == localStorage.getItem("cod_empleado")) {
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
      }
    }
  });
