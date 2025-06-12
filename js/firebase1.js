// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCqafxFuN5Siu1HqqDdBHHsJQczarutnOw",
  authDomain: "disagroapp-a7fec.firebaseapp.com",
  databaseURL: "https://disagroapp-a7fec-default-rtdb.firebaseio.com",
  projectId: "disagroapp-a7fec",
  storageBucket: "disagroapp-a7fec.firebasestorage.app",
  messagingSenderId: "841529436199",
  appId: "1:841529436199:web:544f9a3fec62025f8d0602",
  measurementId: "G-EM53WMYF3T"
};


//prueba
/* const firebaseConfig = {
  apiKey: "AIzaSyDRx5vSS9b0GW76f87_Xi01VaOYxxPby9Y",
  authDomain: "disagro-96de7.firebaseapp.com",
  databaseURL: "https://disagro-96de7-default-rtdb.firebaseio.com",
  projectId: "disagro-96de7",
  storageBucket: "disagro-96de7.firebasestorage.app",
  messagingSenderId: "916169531441", 
  appId: "1:916169531441:web:c38866b35dc35268273510"
}; */

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);


const database = firebase.database();

function solicitarPermiso() {
  Notification.requestPermission().then((permiso) => {
    if (permiso === 'granted') {
      messaging.getToken({ vapidKey: 'BKnh82NuB0_Ni49Q2zLorbMWmw64zCQYOqYkU5Y6u_x-R4GLyAogHJMDA6Nx7U6tD86h2zeqvDQRWBnAi5eH9mM	' })
        .then((token) => {
          console.log('Token recibido:', token);
          // Puedes guardar este token en Firebase Database o donde lo necesites
        })
        .catch((err) => {
          console.error('Error al obtener el token:', err);
        });
    } else {
      console.warn('Permiso de notificaciones no concedido');
    }
  });
}

//solicitarPermiso()





// envio de arrays
function agruparPorOrden(lista) {
  const resultado = {};
  lista.forEach(item => {
    if (!resultado[item.ORDEN]) resultado[item.ORDEN] = [];
    resultado[item.ORDEN].push(item);
  });
  return resultado;
}

function guardarActividades(actividades) {
  const agrupadas = agruparPorOrden(actividades);
  const actualizaciones = {};

  for (const orden in agrupadas) {
    actualizaciones[`ordenes_asignadas/${orden}`] = agrupadas[orden];
  }

  database.ref().update(actualizaciones)
    .then(() => console.log("Actividades guardadas exitosamente."))
    .catch(err => console.log("Error al guardar: " + err.message));
}

function guardarData(data) {
  const agrupadas = agruparPorOrden(data);
  const actualizaciones = {};

  for (const orden in agrupadas) {
    actualizaciones[`ordenes_finalizadas/${orden}`] = agrupadas[orden];
  }

  database.ref().update(actualizaciones)
    .then(() => console.log("Actividades guardadas exitosamente."))
    .catch(err => console.log("Error al guardar: " + err.message));
}

function agregarData(data) {
  const agrupadas = agruparPorOrden(data);
  const actualizaciones = {};

  for (const orden in agrupadas) {
    actualizaciones[`ordenes_asignadas/${orden}`] = agrupadas[orden];
  }

  database.ref().update(actualizaciones)
    .then(() => console.log("Actividades guardadas exitosamente."))
    .catch(err => console.log("Error al guardar: " + err.message));
}

async function leerOrden(ordenId) {
  try {
    const snapshot = await database.ref(`ordenes_asignadas/${ordenId}`).get();
    if (snapshot.exists()) {
      return snapshot.val(); // Aquí retornas los datos correctamente
    } else {
      console.log("No se encontraron datos.");
      return null;
    }
  } catch (err) {
    console.log("Error al leer: " + err.message);
    return null;
  }
}


async function leerOrden_general() {
  try {
    const snapshot = await database.ref(`ordenes_asignadas`).get();
    if (snapshot.exists()) {
      return snapshot.val(); // Aquí retornas los datos correctamente
    } else {
      console.log("No se encontraron datos.");
      return null;
    }
  } catch (err) {
    console.log("Error al leer: " + err.message);
    return null;
  }
}


function actualizarOrden(ordenId, nuevasActividades) {
  // Guardar directamente en la ruta de la orden
  firebase.database().ref(`ordenes_asignadas/${ordenId}`).set(nuevasActividades)
    .then(() => {
      console.log(`Orden ${ordenId} actualizada correctamente`);
    })
    .catch((error) => {
      console.error("Error al actualizar la orden:", error);
    });
}




/* leerOrden(localStorage.getItem("iniciar_orden")).then(data => {
  if (data) {
    data.forEach(item => item.ESTATUS = "PAUSADA");
    console.log(data);
    guardarActividades(data); // << mover aquí, no afuera
  } else {
    console.warn("No se cargaron datos para modificar");
  }
}); */

/* leerOrden_general().then(data => {
  if (data) {
    console.log(data);
  } else {
    console.warn("No se cargaron datos para modificar");
  }
}); 
 */


async function buscarOrdenesPorCodEstructurado(codBuscado) {
  try {
    const snapshot = await database.ref('ordenes_asignadas').get();

    if (!snapshot.exists()) {
      console.log("No se encontraron datos.");
      return {};
    }

    const ordenes = snapshot.val();
    const resultado = {};

    for (const ordenId in ordenes) {
      const actividades = ordenes[ordenId];

      // Verifica si alguna actividad de esta orden tiene el COD buscado
      const contieneCod = actividades.some(act => act.COD == codBuscado);

      if (contieneCod) {
        resultado[ordenId] = actividades; // Agrega toda la orden
      }
    }

    console.log(`Se encontraron ${Object.keys(resultado).length} órdenes con actividades COD = ${codBuscado}`);
    return resultado;

  } catch (err) {
    console.error("Error al buscar órdenes:", err.message);
    return {};
  }
}


/* buscarOrdenesPorCodEstructurado("200850").then(resultado => {
  console.log("Órdenes encontradas:", resultado);
});
 */


async function buscarOrdenesPorEmpleado(codEmpleado) {
  try {
    const snapshot = await database.ref('ordenes_asignadas').get();

    if (!snapshot.exists()) {
      console.log("No se encontraron datos.");
      return {};
    }
console.log(codEmpleado)
    const ordenes = snapshot.val();
    const resultado = {
      PENDIENTE: [],
      EJECUTANDO: [],
      PAUSADA: [],
      FINALIZADA: []
    };

    for (const ordenId in ordenes) {
      const actividades = ordenes[ordenId];

      // Buscar si alguna actividad corresponde al empleado
      const actividadesEmpleado = actividades.filter(act => act.NOMBRE == codEmpleado);

      if (actividadesEmpleado.length > 0) {
        // Agrupar por estatus
        const estatusSet = new Set(actividadesEmpleado.map(act => act.ESTATUS));

        estatusSet.forEach(estatus => {
          if (resultado[estatus]) {
            resultado[estatus].push({
              ordenId,
              actividades: actividadesEmpleado.filter(act => act.ESTATUS === estatus)
            });
          }
        });
      }
    }

    console.log("Órdenes del empleado:", resultado);
    return resultado;

  } catch (err) {
    console.error("Error al buscar órdenes del empleado:", err.message);
    return {};
  }
}


async function eliminarOrdenesPendientes() {
  try {
    const snapshot = await database.ref('ordenes_asignadas').get();

    if (!snapshot.exists()) {
      console.log("No hay órdenes para revisar.");
      return;
    }

    const ordenes = snapshot.val();
    const actualizaciones = {};

    for (const ordenId in ordenes) {
      const actividades = ordenes[ordenId];

      // Si alguna actividad tiene estatus "PENDIENTE", se elimina toda la orden
      const tienePendiente = actividades.some(act => act.ESTATUS === "PENDIENTE");

      if (tienePendiente) {
        actualizaciones[`ordenes_asignadas/${ordenId}`] = null; // Borrar la orden
      }
    }

    if (Object.keys(actualizaciones).length > 0) {
      await database.ref().update(actualizaciones);
      console.log("Órdenes pendientes eliminadas exitosamente.");
    } else {
      console.log("No se encontraron órdenes con actividades PENDIENTES.");
    }
  } catch (err) {
    console.error("Error al eliminar órdenes pendientes:", err.message);
  }
}
