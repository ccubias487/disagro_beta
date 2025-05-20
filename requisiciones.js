document.getElementById("boton_agregar").addEventListener("click", function () {
  window.location.href = "existencias.html";
});

function borrado() {
    fila = this.rowIndex;
    borrar = [];
    for (k = 1; k <= localStorage.getItem("contador"); k++) {
        borrar.push(localStorage.getItem(k));
    }
    localStorage.setItem("contador", Number(localStorage.getItem("contador")) - 1);

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

materiales=  JSON.parse(localStorage.getItem("agregar_material"))

console.log(materiales)



 document.getElementById("tabla_requisiciones").innerHTML = '<tbody><tr><th scope="col" width="40px">CANTIDAD</th><th scope="col" width="680px">DESCRIPCION</th><th scope="col" width="100px">SAP</th></tr></tbody>';



    for (i = 0; i <= materiales.length-1; i++) {
        let date = new Date();
        let fecha_actual = String(date.getDate()).padStart(2, "0") + "/" + String(date.getMonth() + 1).padStart(2, "0") + "/" + date.getFullYear();

        let tablaRef = document.getElementById("tabla_requisiciones");
        let filaRef = tablaRef.insertRow(-1);
        filaRef.ondblclick = borrado;


        filaRef.insertCell(0).textContent = materiales[i].CANTIDAD;
        filaRef.insertCell(1).textContent = materiales[i].DESCRIPCION;
        filaRef.insertCell(2).textContent = materiales[i].SAP;
    

    }
