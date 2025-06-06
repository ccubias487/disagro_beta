async function actualizar_ordenes_proceso_git(data_actual) {
  //document.getElementById("loader-container").style.display = "flex";

  const response = await fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/autentificacion.json");
  const data = await response.json();

  const GITHUB_TOKEN = data.GITHUB_TOKEN.replace(/\s+/g, "");
  const REPO_OWNER = data.REPO_OWNER;
  const REPO_NAME = data.REPO_NAME;
  const FILE_PATH = "ordenes_asignadas.json";
  const COMMIT_MESSAGE = data.COMMIT_MESSAGE;
  const BRANCH_NAME = data.BRANCH_NAME;

  const encodeBase64 = (obj) => {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj, null, 2))));
  };

  async function obtenerSHA() {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH_NAME}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    if (!response.ok) throw new Error("No se pudo obtener el SHA");
    const data = await response.json();
    return data.sha;
  }

  async function obtenercontent() {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH_NAME}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    if (!response.ok) throw new Error("No se pudo obtener el contenido del archivo");

    const githubData = await response.json();
    const rawResponse = await fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/autorizacion.json");
    const ordenesActuales = await rawResponse.json();

    const data_local = JSON.parse(localStorage.getItem("agregar_material") || "[]");
    const nuevosObjetos = [];

    for (let i = 0; i < data_local.length; i++) {
      const objeto = {
        ORDEN: data_local[i].ORDEN,
        CODIGO: data_local[i].SAP,
        DESCRIPCION: data_local[i].DESCRIPCION,
        CANTIDAD: data_local[i].CANTIDAD,
        DETALLE: localStorage.getItem("iniciar_orden_d"),
        STATUS: "PENDIENTE",
        SOLICITANTE: localStorage.getItem("nombre"),
        AUTORIZADO: "",
        REQUISICION: "30020154524",
        VALIDADOR: "30020448484120"
      };
      nuevosObjetos.push(objeto);
    }

    const ordenesActualizadas = ordenesActuales.concat(nuevosObjetos);
    return ordenesActualizadas;
  }

  async function actualizarArchivo() {
    const sha = await obtenerSHA();
    const cont = await obtenercontent();

    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH_NAME}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: COMMIT_MESSAGE,
        content: encodeBase64(data_actual),
        sha,
        branch: BRANCH_NAME
      })
    });

    const result = await response.json();
    console.log("Archivo actualizado:", result);
  }

  try {
    await actualizarArchivo();

  } catch (error) {

    console.error(error);
  } finally {
    /* document.getElementById("loader-container").style.display = "none"; */
  }
}
