const GITHUB_TOKEN = "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";
const REPO_OWNER = "ccubias487";
const REPO_NAME = "disagro_beta";
const FILE_PATH = "autorizacion.json";
const COMMIT_MESSAGE = "Actualización desde JavaScript";
const BRANCH_NAME = "disagro_beta1.0";  // Especificar la rama

// Nuevo contenido JSON


// Convertir a Base64
const encodeBase64 = (obj) => {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj, null, 2))));
};

// Obtener el SHA del archivo actual desde la rama especificada
async function obtenerSHA() {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH_NAME}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) throw new Error("No se pudo obtener el SHA");

  const data = await response.json();
  
  return data.sha; // Necesario para actualizar el archivo
}


//document.getElementById("boton_siguiente").addEventListener("click", function(){
function a(){
async function obtenercontent() {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH_NAME}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) throw new Error("No se pudo obtener el SHA");

  const data = await response.json();
  
  let ordenes=JSON.parse(atob(data.content))
  data_local=JSON.parse(localStorage.getItem("agregar_material"))

  if(data_local.length>0){
    for (let i = 0; i < data_local.length; i++) {
      let nuevoObjeto =  {
        "ORDEN": data_local[i].ORDEN,
        "CODIGO": data_local[i].SAP,
        "DESCRIPCION": data_local[i].DESCRIPCION,
        "CANTIDAD": data_local[i].CANTIDAD,
        "DETALLE": localStorage.getItem("iniciar_orden_d"),
        "STATUS": "PENDIENTE",
        "SOLICITANTE": localStorage.getItem("nombre"),
        "AUTORIZADO": "",
        "REQUISICION": "3.00201E+24",
        "VALIDADOR": "3.00201E+20"
    }
    
    }
  }

  console.log(nuevoObjeto)
return (ordenesActualizadas)
  //return data.sha; // Necesario para actualizar el archivo
}

async function actualizarArchivo2() {
  const cont = await obtenercontent();
}
obtenercontent()

// Actualizar el archivo en GitHub en la rama especificada
async function actualizarArchivo() {
  const sha = await obtenerSHA();
  const cont = await obtenercontent();

  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH_NAME}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: COMMIT_MESSAGE,
      content: encodeBase64(cont),
      sha, // Se necesita el SHA del archivo actual
      branch: BRANCH_NAME,  // Asegura que se realice el commit en la rama correcta
    }),
  });

  const result = await response.json();
  console.log("Archivo actualizado:", result);
}

// Ejecutar actualización
//actualizarArchivo().catch(console.error);

//})

}

a()
