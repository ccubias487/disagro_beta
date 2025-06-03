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


document.getElementById("horas").addEventListener("click", function () {
  fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/ordenes_asignadas.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {



      //leerOrden(data)

    })
})