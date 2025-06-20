if (localStorage.getItem("usuario") == null) {
  window.location.href = "index.html";
}

document.getElementById("inicio").addEventListener("click", function () {
  window.location.href = "principal.html";
});

fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/user.json")
  .then((response) => response.json())
  .then((empleado) => {
    const container = document.getElementById('ordenes_asignadas');
    const ordenesUnicas = new Set();

    document.getElementById("ordenes_asignadas").innerHTML =
      '<table class="tabla_notificacions" id="tabla_requisiciones"><tbody><tr><th scope="col" width="20px">#</th><th scope="col" width="40px">CODIGO</th><th scope="col" width="400px">TECNICO</th><th scope="col" class="ordenes_tabla" width="80px">ASIG</th><th scope="col" class="ordenes_tabla" width="80px">PEND</th><th scope="col" class="ordenes_tabla" width="80px">EJEC</th><th scope="col" class="ordenes_tabla" width="80px">REALI</th><th scope="col" class="ordenes_tabla" width="80px">PAUSA</th></tr></tbody></table>';
  leerOrden_general().then(data => {

   data = Object.values(data).flat();

    function consolidarOrdenesPorUsuario(ordenes, usuarios) {
      const estados = ["PENDIENTE", "EJECUTANDO", "PAUSADA", "FINALIZADA"];

      const resultado = usuarios.map(user => ({
        USUARIO: user.USUARIO,
        NOMBRE: user.NOMBRE,
        TIPO: user.TIPO,
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

 let ordenes_totales =consolidarOrdenesPorUsuario(data, empleado)

    function iniciar_orden(user, name) {

      console.log(user)
      console.log(name)
      localStorage.setItem("tecnico_visualizar_user", user)
      localStorage.setItem("tecnico_visualizar_name", name)
      window.location.href = "ordenes_admin_tecnico.html"


    }

    console.log(ordenes_totales.length)
    let contador = 0;
    for (let k in ordenes_totales) {
      if(ordenes_totales[k].TIPO !=="ADMIN"){
      console.log(ordenes_totales)
      console.log(ordenes_totales[k])
      console.log(ordenes_totales[k].NOMBRE)
      console.log(ordenes_totales[k].ORDENES)
      console.log(ordenes_totales[k].ORDENES.EJECUTANDO)
      contador = contador + 1;
     let ordenes_asignadas =ordenes_totales[k].ORDENES.PENDIENTE + ordenes_totales[k].ORDENES.FINALIZADA + ordenes_totales[k].ORDENES.PAUSADA
      let tablaRef = document.getElementById("tabla_requisiciones");
      let filaRef = tablaRef.insertRow(-1);
      filaRef.onclick = function () { iniciar_orden(empleado[k].USUARIO, empleado[k].NOMBRE); };

      const prioridadColor = {
          "A": "rgb(202, 80, 80)",
          "B": "rgb(223, 236, 89)",
          "C": "rgb(87, 220, 82)",
          "1": "rgb(201, 52, 52)"
        };


      filaRef.insertCell(0).textContent = contador;
      filaRef.insertCell(1).textContent = ordenes_totales[k].USUARIO;
      filaRef.insertCell(2).textContent = ordenes_totales[k].NOMBRE;


      let celda_asignadas =filaRef.insertCell(3)
      celda_asignadas.textContent = ordenes_asignadas;
      celda_asignadas.style.fontSize="1.9rem"

      let celda_pendientes =filaRef.insertCell(4)
      celda_pendientes.textContent = ordenes_totales[k].ORDENES.PENDIENTE;
      celda_pendientes.style.fontSize="1.9rem"


      let celda_ejecutando =filaRef.insertCell(5)
      celda_ejecutando.textContent = ordenes_totales[k].ORDENES.EJECUTANDO;
      celda_ejecutando.style.fontSize="1.9rem"


      let celda_finalizadas =filaRef.insertCell(6)
      celda_finalizadas.textContent = ordenes_totales[k].ORDENES.FINALIZADA;
      celda_finalizadas.style.fontSize="1.9rem"


      let celda_pausadas =filaRef.insertCell(7)
      celda_pausadas.textContent = ordenes_totales[k].ORDENES.PAUSADA;
      celda_pausadas.style.fontSize="1.9rem"
      //filaRef.insertCell(3).style.fontSize="2rem  "
    }
  }
  })
});
