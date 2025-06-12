async function cerrar_orden() {
  const response = await fetch(
    "https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/autentificacion.json"
  );
  const data = await response.json();

  const GITHUB_TOKEN = data.GITHUB_TOKEN.replace(/\s+/g, "");
  const REPO_OWNER = data.REPO_OWNER;
  const REPO_NAME = data.REPO_NAME;
  const FILE_PATH = "ordenes_asignadas.json"
  const COMMIT_MESSAGE = data.COMMIT_MESSAGE;
  const BRANCH_NAME = data.BRANCH_NAME;

  //console.log(data);
  //console.log(GITHUB_TOKEN);

  const encodeBase64 = (obj) => {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj, null, 2))));
  };

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
    return data.sha;
  }

  async function obtenercontent() {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH_NAME}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok)
      throw new Error("No se pudo obtener el contenido del archivo");

    const githubData = await response.json();

    const rawResponse = await fetch(
      "https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/ordenes_asignadas.json"
    );
    const ordenesActuales = await rawResponse.json();
    console.log(ordenesActuales)

    const ordenes = ordenesActuales; // O usa tu array directamente

    //const ordenesFiltradas = ordenes.filter(item => item.ORDEN !== localStorage.getItem("iniciar_orden"));

ordenes.forEach(orden => {
  if (orden.ORDEN === localStorage.getItem("iniciar_orden")) {
    orden.ESTATUS = "FINALIZADA";
    orden.TIEMPO_ORDEN= localStorage.getItem("tiempo_orden")
  }
});



    // Si quieres guardar el resultado de nuevo:
    //localStorage.setItem("ordenes2155", JSON.stringify(ordenesFiltradas));


    //const ordenesActualizadas = ordenesActuales.concat(nuevosObjetos);

    // console.log("Objetos nuevos:", nuevosObjetos);
    // console.log("Ordenes actualizadas:", ordenesActualizadas);

    return ordenes;
  }

  async function actualizarArchivo() {
    const sha = await obtenerSHA();
    const cont = await obtenercontent();
    // console.log("Valor obtenido: ", cont);

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
        sha,
        branch: BRANCH_NAME,
      }),
    });

    const result = await response.json();
    //console.log("Archivo actualizado:", result);
  }

  await actualizarArchivo();
  //console.log("Pedido actualizado con éxito.");
}

