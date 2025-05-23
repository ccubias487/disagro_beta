   if (localStorage.getItem("usuario_critico") == null) {
  window.location.href = "login_critico.html";
}

const input_excel = document.getElementById("input-excel");
const nombreArchivo = document.getElementById("actualizacion")

input_excel.addEventListener("change", () => {
    if (input_excel.files.length > 0) {
      nombreArchivo.textContent = "Archivo seleccionado: " + input_excel.files[0].name;
      document.getElementById("actualizacion").style.background = "#2da849a3";
       document.getElementById("actualizacion").style.fontSize="large"
    } else {
      nombreArchivo.textContent = "";
    }
  });

document.getElementById("region").innerHTML="REPUESTOS CRITICOS PLANTA "+localStorage.getItem("region")
document.getElementById("pais_region").innerHTML=localStorage.getItem("region")
document.getElementById("actualizar").addEventListener("click", function () {
    
    const input = document.getElementById("input-excel");
    const file = input.files[0];
    
    if (!file) {
        /* alert("Por favor, selecciona un archivo Excel primero."); */
        document.getElementById("actualizacion").innerHTML = "Por favor, selecciona el archivo Excel que deseas cargar ";
        document.getElementById("actualizacion").style.background = "#d5383887";
        return;
    }

document.getElementById("loader-container").style.display = "flex";
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const first_sheet_name = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[first_sheet_name];

            const _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

            const tabla = {};
            let data2 = [];
            let post = [];
            const selectedByOrden = {};

            document.getElementById("item_notificaciones").innerHTML = `
                <tbody>
                    <tr>
                        <th scope="col" width="80px">N° </th>
                        <th scope="col" width="80px">EQUIPO</th>
                        <th scope="col" width="400px">REPUESTO</th>
                        <th scope="col" width="280px">NUMERO DE PARTE</th>
                        <th scope="col" width="80px">CANTIDAD INSTALADA</th>
                        <th scope="col" width="80px">STOCK ACTUAL</th>
                        <th scope="col" width="80px">CANT SOLICITAR</th>
                        <th scope="col" width="80px">SOLICITUD</th>
                        <th scope="col" width="80px">ESTATUS</th>
                        <th scope="col" width="80px">CÓDIGO</th>
                        <th scope="col" width="50px">COSTO UNITARIO</th>
                        <th scope="col" width="50px">COSTO TOTAL</th>
                        <th scope="col" width="400px">OBSERVACIONES</th>
                    </tr>
                </tbody>
            `;

            function obtenerFechaFormateada() {
                const ahora = new Date();
                const dia = String(ahora.getDate()).padStart(2, '0');
                const mes = String(ahora.getMonth() + 1).padStart(2, '0');
                const anio = String(ahora.getFullYear()).slice(-2);
                const horas = String(ahora.getHours()).padStart(2, '0');
                const minutos = String(ahora.getMinutes()).padStart(2, '0');
                const segundos = String(ahora.getSeconds()).padStart(2, '0');
                return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
            }

            function limpiar(valor) {
                if (valor === undefined || valor === null) return "";
                return String(valor).toUpperCase();
            }

            for (let i = 0; i < _JsonData.length; i++) {
                tabla.CANT_INSTALADA = limpiar(_JsonData[i].CANT_INSTALADA);
                tabla.CANTIDAD_SOLICITAR = limpiar(_JsonData[i].CANTIDAD_SOLICITAR);
                tabla.COSTO_UNITARIO = limpiar(_JsonData[i].COSTO_UNITARIO);
                tabla.COSTO_TOTAL = limpiar(Number(_JsonData[i].COSTO_TOTAL)?.toFixed(2));
                tabla.CÓDIGO = limpiar(_JsonData[i].CÓDIGO);
                tabla.EQUIPO = limpiar(_JsonData[i].EQUIPO);
                tabla.LINEA = limpiar(_JsonData[i].LINEA);
                tabla.NUMERO_PARTE = limpiar(_JsonData[i].NUMERO_PARTE);
                tabla.No = limpiar(_JsonData[i].No);
                tabla.OBSERVACIONES = limpiar(_JsonData[i].OBSERVACIONES);
                tabla.REPUESTO = limpiar(_JsonData[i].REPUESTO);
                tabla.UNIDAD_MEDIDA = limpiar(_JsonData[i].UNIDAD_MEDIDA);
                tabla.UNIDAD_TRABAJO = limpiar(_JsonData[i].UNIDAD_TRABAJO);
                tabla.STOCK_ACTUAL = limpiar(_JsonData[i].STOCK_ACTUAL);
                tabla.SOLICITUD = limpiar(_JsonData[i].SOLICITUD);
                tabla.ESTATUS = limpiar(_JsonData[i].ESTATUS);
                tabla.ACTUALIZACION = obtenerFechaFormateada();

                const nueva_req = Object.assign({}, tabla);
                data2.push(nueva_req);
            }

            for (let i = 0; i < data2.length; i++) {
                let tablaRef = document.getElementById("item_notificaciones");
                let filaRef = tablaRef.insertRow(-1);

                filaRef.insertCell(0).textContent = i + 1;
                filaRef.insertCell(1).textContent = data2[i].EQUIPO || "";
                filaRef.insertCell(2).textContent = data2[i].REPUESTO || "";
                filaRef.insertCell(3).textContent = data2[i].NUMERO_PARTE || "";
                filaRef.insertCell(4).textContent = data2[i].CANT_INSTALADA || "";
                filaRef.insertCell(5).textContent = data2[i].STOCK_ACTUAL || "";
                filaRef.insertCell(6).textContent = data2[i].CANTIDAD_SOLICITAR || "";
                filaRef.insertCell(7).textContent = data2[i].SOLICITUD || "";
                filaRef.insertCell(8).textContent = data2[i].ESTATUS || "";
                filaRef.insertCell(9).textContent = data2[i].CÓDIGO || "";
                filaRef.insertCell(10).textContent = data2[i].COSTO_UNITARIO || "";
                filaRef.insertCell(11).textContent = data2[i].COSTO_TOTAL || "";
                filaRef.insertCell(12).textContent = data2[i].OBSERVACIONES || "";
            }

            localStorage.setItem("fst", JSON.stringify(post));
            actualizar_existencias_git(data2);
        } catch (error) {
            /* alert("Ocurrió un error al procesar el archivo Excel."); */
            console.error("Error procesando el archivo:", error);
document.getElementById("actualizacion").innerHTML = "Ocurrió un error al procesar el archivo Excel." + error.toUpperCase();
  document.getElementById("actualizacion").style.background = "#d5383887";

        } finally {
            document.getElementById("loader-container").style.display = "none"; 
            console.log("finalizado")
        }
    };

    reader.readAsArrayBuffer(file);
});








