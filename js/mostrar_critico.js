
    if (localStorage.getItem("usuario_critico") == null) {
  window.location.href = "login_critico.html";
}

function esDispositivoMovil() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const urlActual = window.location.pathname;

if (esDispositivoMovil()) {
  if (!urlActual.includes("mostrar_critico_mobile.html")) {
    window.location.href = "mostrar_critico_mobile.html";
  }
} else {
  if (!urlActual.includes("mostrar_critico.html")) {
    window.location.href = "mostrar_critico.html";
  }
}



document.getElementById("pais_region").innerHTML=localStorage.getItem("region")
document.getElementById("region").innerHTML="REPUESTOS CRITICOS PLANTA "+localStorage.getItem("region_critico_planta")

try {
  fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/base_critico_" + localStorage.getItem("mostrar_critico") + ".json")
    .then((response) => {
      console.log(response.ok )
      if (!response.ok) {
      
        document.getElementById("actualizacion").innerHTML = "No se encontraron datos (error inesperado)";
  document.getElementById("actualizacion").style.background = "#d5383887";
  return
      }
      return response.json();
    })
    .then((jsondata) => {
      console.log(jsondata);

      if (jsondata.length ===0) {
      
        document.getElementById("actualizacion").innerHTML = "No se encontraron datos (sin informacion en la base)";
  document.getElementById("actualizacion").style.background = "#d5383887";
  return
      }

      document.getElementById("item_notificaciones").innerHTML = `
        <tbody>
            <tr>
                <th scope="col" width="80px">N° </th>
                <th scope="col" width="80px">EQUIPO</th>
                <th scope="col" width="200px">REPUESTO</th>
                <th scope="col" width="350px">NUMERO DE PARTE</th>
                <th scope="col" width="80px">STOCK</th>
                <th scope="col" width="80px">SOLICITAR</th>
                <th scope="col" width="120px">ESTATUS</th>
                <th scope="col" width="120px">CÓDIGO</th>
                <th scope="col" width="80px">COSTO</th>
                <th scope="col" width="80px">TOTAL</th>
                <th scope="col" width="400px">OBSERVACIONES</th>
            </tr>
        </tbody>

  
      `;

      document.getElementById("actualizacion").innerHTML = "Última actualización: " + jsondata[0].ACTUALIZACION;

      for (let i = 0; i < jsondata.length; i++) {
        let tablaRef = document.getElementById("item_notificaciones");
        let filaRef = tablaRef.insertRow(-1);

        filaRef.insertCell(0).textContent = i + 1;
        filaRef.insertCell(1).textContent = jsondata[i].EQUIPO || "";
        filaRef.insertCell(2).textContent = jsondata[i].REPUESTO || "";
        filaRef.insertCell(3).textContent = jsondata[i].NUMERO_PARTE || "";
        filaRef.insertCell(4).textContent = jsondata[i].STOCK_ACTUAL || "";
        filaRef.insertCell(5).textContent = jsondata[i].CANTIDAD_SOLICITAR || "";
        filaRef.insertCell(6).textContent = jsondata[i].ESTATUS || "";
        filaRef.insertCell(7).textContent = jsondata[i].CÓDIGO || "";
        filaRef.insertCell(8).textContent = jsondata[i].COSTO_UNITARIO || "";
        filaRef.insertCell(9).textContent = jsondata[i].COSTO_TOTAL || "";
        filaRef.insertCell(10).textContent = jsondata[i].OBSERVACIONES || "";
      }
    })
    .catch((error) => {
 
      console.error(error);
      document.getElementById("actualizacion").innerHTML = "No se encontraron datos (error de carga)";
      document.getElementById("actualizacion").style.background = "#d5383887";
    });
} catch (error) {
  document.getElementById("actualizacion").innerHTML = "No se encontraron datos (error inesperado)";
  document.getElementById("actualizacion").style.background = "#d5383887";
}
