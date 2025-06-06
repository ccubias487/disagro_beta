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
      '<table class="tabla_notificacions" id="tabla_requisiciones"><tbody><tr><th scope="col" width="20px">#</th><th scope="col" width="40px">CODIGO</th><th scope="col" width="640px">TECNICO</th></tr></tbody></table>';

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

    function iniciar_orden(user, name) {

  console.log(user)
  console.log(name)
  localStorage.setItem("tecnico_visualizar_user", user)
    localStorage.setItem("tecnico_visualizar_name", name)
    window.location.href="ordenes_admin_tecnico.html"
 

    }

    let contador = 0;
    for (let k in empleado) {
      contador = contador + 1;
      let tablaRef = document.getElementById("tabla_requisiciones");
      let filaRef = tablaRef.insertRow(-1);
      filaRef.onclick = function () {iniciar_orden(empleado[k].USUARIO, empleado[k].NOMBRE);};

     const prioridadColor = {
          "A": "rgb(202, 80, 80)",
          "B": "rgb(223, 236, 89)",
          "C": "rgb(87, 220, 82)",
          "1": "rgb(201, 52, 52)"
        };


      filaRef.insertCell(0).textContent = contador;
      filaRef.insertCell(1).textContent = empleado[k].USUARIO;
      filaRef.insertCell(2).textContent = empleado[k].NOMBRE;
    }
  });
