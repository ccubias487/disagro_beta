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

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function agruparPorOrden(lista) {
  const resultado = {};
  lista.forEach(item => {
    if (!resultado[item.ORDEN]) resultado[item.ORDEN] = [];
    resultado[item.ORDEN].push(item);
  });
  return resultado;
}

function agruparPorRequisicion(lista) {
  const resultado = {};
  lista.forEach(item => {
    if (!resultado[item.REQUISICION]) resultado[item.REQUISICION] = [];
    resultado[item.REQUISICION].push(item);
  });
  return resultado;
}

function guardarActividades(actividades) {
  const agrupadas = agruparPorOrden(actividades);
  const actualizaciones = {};

  for (const orden in agrupadas) {
    const actividadesOrden = agrupadas[orden];
    actualizaciones[`ordenes_asignadas/${orden}`] = actividadesOrden;

    actividadesOrden.forEach(act => {
      if (act.COD) actualizaciones[`por_cod/${act.COD}/${orden}`] = true;
      if (act.NOMBRE) actualizaciones[`por_empleado/${act.NOMBRE}/${orden}`] = true;
      if (act.ESTATUS) actualizaciones[`por_estatus/${act.ESTATUS}/${orden}`] = true;
    });
  }

  database.ref().update(actualizaciones)
    .then(() => console.log("Actividades y referencias guardadas."))
    .catch(err => console.log("Error al guardar: " + err.message));
}

function guardarData(data) {
  const agrupadas = agruparPorOrden(data);
  const actualizaciones = {};

  for (const orden in agrupadas) {
    actualizaciones[`ordenes_finalizadas/${orden}`] = agrupadas[orden];
  }

  database.ref().update(actualizaciones)
    .then(() => console.log("Finalizadas guardadas exitosamente."))
    .catch(err => console.log("Error al guardar: " + err.message));
}

/* function guardarRequisicion(data) {
  const agrupadas = agruparPorRequisicion(data);
  console.log(agrupadas)
  const actualizaciones = {};

  for (const requisicion in agrupadas) {
    actualizaciones[`requisiciones/${requisicion}`] = agrupadas[requisicion];
  }

  database.ref().update(actualizaciones)
    .then(() => console.log("Finalizadas guardadas exitosamente."))
    .catch(err => console.log("Error al guardar: " + err.message));
} */


    async function guardarRequisicion(data) {  
  const agrupadas = agruparPorOrden(data);
  console.log(agrupadas)
  const actualizaciones = {};

  for (const orden in agrupadas) {
    actualizaciones[`requisiciones/${orden}`] = agrupadas[orden];
  }

  database.ref().update(actualizaciones)
    .then(() => console.log("Finalizadas guardadas exitosamente."))
    .catch(err => console.log("Error al guardar: " + err.message));
}

function agregarData(data) {
  guardarActividades(data); // ya maneja índices también
}

async function leerOrden(ordenId) {
  try {
    const snapshot = await database.ref(`ordenes_asignadas/${ordenId}`).get();
    return snapshot.exists() ? snapshot.val() : null;
  } catch (err) {
    console.log("Error al leer: " + err.message);
    return null;
  }
}

async function leerReq(ordenId) {
  try {
    const snapshot = await database.ref(`requisiciones/${ordenId}`).get();
    return snapshot.exists() ? snapshot.val() : null;
  } catch (err) {
    console.log("Error al leer: " + err.message);
    return null;
  }
}

async function leerOrden_general() {
  try {
    const snapshot = await database.ref(`ordenes_asignadas`).get();
    return snapshot.exists() ? snapshot.val() : null;
  } catch (err) {
    console.log("Error al leer: " + err.message);
    return null;
  }
}

async function leerReq_general() {
  try {
    const snapshot = await database.ref(`requisiciones`).get();
    return snapshot.exists() ? snapshot.val() : null;
  } catch (err) {
    console.log("Error al leer: " + err.message);
    return null;
  }
}

function actualizarOrden(ordenId, nuevasActividades) {
  const actualizaciones = {
    [`ordenes_asignadas/${ordenId}`]: nuevasActividades
  };

  nuevasActividades.forEach(act => {
    if (act.COD) actualizaciones[`por_cod/${act.COD}/${ordenId}`] = true;
    if (act.NOMBRE) actualizaciones[`por_empleado/${act.NOMBRE}/${ordenId}`] = true;
    if (act.ESTATUS) actualizaciones[`por_estatus/${act.ESTATUS}/${ordenId}`] = true;
  });

  firebase.database().ref().update(actualizaciones)
    .then(() => console.log(`Orden ${ordenId} actualizada correctamente`))
    .catch((error) => console.error("Error al actualizar la orden:", error));
}

function actualizarReq(ordenId, nuevasActividades) {
  const actualizaciones = {
    [`requisiciones/${ordenId}`]: nuevasActividades
  };

  nuevasActividades.forEach(act => {
    if (act.COD) actualizaciones[`por_cod/${act.COD}/${ordenId}`] = true;
    if (act.NOMBRE) actualizaciones[`por_empleado/${act.NOMBRE}/${ordenId}`] = true;
    if (act.ESTATUS) actualizaciones[`por_estatus/${act.ESTATUS}/${ordenId}`] = true;
  });

  firebase.database().ref().update(actualizaciones)
    .then(() => console.log(`Orden ${ordenId} actualizada correctamente`))
    .catch((error) => console.error("Error al actualizar la orden:", error));
}

function actualizarReq_Auto(ordenId, nuevasActividades) {
  const actualizaciones = {
    [`requisiciones_autorizadas/${ordenId}`]: nuevasActividades
  };

  nuevasActividades.forEach(act => {
    if (act.COD) actualizaciones[`por_cod/${act.COD}/${ordenId}`] = true;
    if (act.NOMBRE) actualizaciones[`por_empleado/${act.NOMBRE}/${ordenId}`] = true;
    if (act.ESTATUS) actualizaciones[`por_estatus/${act.ESTATUS}/${ordenId}`] = true;
  });

  firebase.database().ref().update(actualizaciones)
    .then(() => console.log(`Orden ${ordenId} actualizada correctamente`))
    .catch((error) => console.error("Error al actualizar la orden:", error));
}

async function buscarOrdenesPorCodEstructurado(codBuscado) {
  const codRef = await database.ref(`por_cod/${codBuscado}`).get();
  if (!codRef.exists()) return {};

  const ordenes = codRef.val();
  const resultado = {};

  for (const ordenId of Object.keys(ordenes)) {
    const snapshot = await database.ref(`ordenes_asignadas/${ordenId}`).get();
    if (snapshot.exists()) resultado[ordenId] = snapshot.val();
  }

  return resultado;
}

async function buscarOrdenesPorEmpleado(nombreEmpleado) {
  const empRef = await database.ref(`por_empleado/${nombreEmpleado}`).get();
  if (!empRef.exists()) return {};

  const ordenes = empRef.val();
  const resultado = {
    PENDIENTE: [],
    EJECUTANDO: [],
    PAUSADA: [],
    FINALIZADA: []
  };

  for (const ordenId of Object.keys(ordenes)) {
    const snapshot = await database.ref(`ordenes_asignadas/${ordenId}`).get();
    if (snapshot.exists()) {
      const actividades = snapshot.val().filter(act => act.NOMBRE === nombreEmpleado);
      const estatusSet = new Set(actividades.map(act => act.ESTATUS));
      estatusSet.forEach(estatus => {
        if (resultado[estatus]) {
          resultado[estatus].push({ ordenId, actividades: actividades.filter(act => act.ESTATUS === estatus) });
        }
      });
    }
  }
  return resultado;
}

async function eliminarOrden(ordenId) {
  const snapshot = await database.ref(`ordenes_asignadas/${ordenId}`).get();
  if (!snapshot.exists()) return;

  const actividades = snapshot.val();
  const actualizaciones = {
    [`ordenes_asignadas/${ordenId}`]: null
  };

  actividades.forEach(act => {
    if (act.COD) actualizaciones[`por_cod/${act.COD}/${ordenId}`] = null;
    if (act.NOMBRE) actualizaciones[`por_empleado/${act.NOMBRE}/${ordenId}`] = null;
    if (act.ESTATUS) actualizaciones[`por_estatus/${act.ESTATUS}/${ordenId}`] = null;
  });

  await database.ref().update(actualizaciones);
}

async function eliminarReq(ordenId) {
  const snapshot = await database.ref(`requisiciones/${ordenId}`).get();
  if (!snapshot.exists()) return;

  const actividades = snapshot.val();
  const actualizaciones = {
    [`requisiciones/${ordenId}`]: null
  };

  actividades.forEach(act => {
    if (act.COD) actualizaciones[`por_cod/${act.COD}/${ordenId}`] = null;
    if (act.NOMBRE) actualizaciones[`por_empleado/${act.NOMBRE}/${ordenId}`] = null;
    if (act.ESTATUS) actualizaciones[`por_estatus/${act.ESTATUS}/${ordenId}`] = null;
  });

  await database.ref().update(actualizaciones);
}

async function eliminarOrdenesPendientes() {
  const snapshot = await database.ref('ordenes_asignadas').get();
  if (!snapshot.exists()) return;

  const ordenes = snapshot.val();
  const actualizaciones = {};

  for (const ordenId in ordenes) {
    const actividades = ordenes[ordenId];
    if (actividades.some(act => act.ESTATUS === "PENDIENTE")) {
      actualizaciones[`ordenes_asignadas/${ordenId}`] = null;
      actividades.forEach(act => {
        if (act.COD) actualizaciones[`por_cod/${act.COD}/${ordenId}`] = null;
        if (act.NOMBRE) actualizaciones[`por_empleado/${act.NOMBRE}/${ordenId}`] = null;
        if (act.ESTATUS) actualizaciones[`por_estatus/${act.ESTATUS}/${ordenId}`] = null;
      });
    }
  }

  if (Object.keys(actualizaciones).length > 0) {
    await database.ref().update(actualizaciones);
    console.log("Órdenes pendientes eliminadas exitosamente.");
  }
}


function guardarTokenFCM(uid, token) {
  firebase.database().ref('tokens/' + uid).set({
    token: token,
    timestamp: Date.now()
  }).then(() => {
    console.log('Token guardado en la base de datos');
  }).catch(error => {
    console.error('Error al guardar el token:', error);
  });
}