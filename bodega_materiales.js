if (localStorage.getItem("usuario")== null){
  window.location.href = "index.html";
}
document.getElementById("inicio").addEventListener("click", function () {
  window.location.href = "principal.html";
})

document.getElementById("Buscar_string").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function esperando() {
  let aleatorio_image = "https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/consultando" + numeroAleatorio(1, 3) + ".png"

  const div = document.getElementById("no_encontrado");
  const imagen = document.createElement("img");
  imagen.src = aleatorio_image
  imagen.alt = "No encontrado";
  imagen.style.width = "400px";
  imagen.style.height = "400px";
  div.appendChild(imagen);

  document.getElementById("no_encontrado_texto").innerHTML = "ESPERE UN MOMENTO, ESTAMOS CONSULTANDO LA BASE DE DATOS"
  document.getElementById("no_encontrado_texto").style.fontSize = "xx-large"
  document.getElementById("no_encontrado_texto").style.fontWeight = "bold"
  document.getElementById("no_encontrado_texto").style.color = "White"
  document.getElementById("no_encontrado_texto").style.textAlign = "center"
  document.getElementById("boton_siguiente").innerHTML = "Iniciar orden"
}

function sin_datos(contador) {
  if (contador == 1) {
    document.getElementById("no_encontrado").innerHTML = ""
    document.getElementById("no_encontrado_texto").innerHTML = ""

    let aleatorio_image = "https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/empty" + numeroAleatorio(1, 3) + ".png"

    const div = document.getElementById("no_encontrado");
    const imagen = document.createElement("img");
    imagen.src = aleatorio_image
    imagen.alt = "No encontrado";
    imagen.style.width = "400px";
    imagen.style.height = "400px";
    div.appendChild(imagen);
    document.getElementById("no_encontrado_texto").innerHTML = "NO SE ENCOTRARON INSUMOS CON ESTA INFORMACION"
    document.getElementById("no_encontrado_texto").style.fontSize = "xx-large"
    document.getElementById("no_encontrado_texto").style.fontWeight = "bold"
    document.getElementById("no_encontrado_texto").style.color = "White"
    document.getElementById("boton_siguiente").innerHTML = "Iniciar orden"
  }
}

esperando()

let checkbox = document.getElementById("mode")
checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    document.getElementById("Buscar_string").placeholder = "Buscar por codigo..."
    document.getElementById("label_buscar").innerHTML = "CODIGO"
  } else {
    document.getElementById("Buscar_string").placeholder = "Buscar por descripcion..."
    document.getElementById("label_buscar").innerHTML = "DESCRIPCION"
  }
});



fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/existencias.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const jsondata = data.sort((a, b) => {
      return parseInt(a.PRIORIDAD) - parseInt(b.PRIORIDAD);
    });

    //console.log(jsondata)
    const container = document.getElementById('actividades_asignadas');
    let contador = 1

    function ventana_flotante(k) {
      // Obtener el modal y el botón
           //document.getElementById("boton_agregar").removeEventListener("click", "")
      //window.removeAttribute('onclick')
      localStorage.setItem("ventana_flotante",k)
      document.getElementById("cantidad_insumo").value=""
      const modal = document.getElementById("myModal")
      const closeBtn = document.getElementById("closeBtn");
      modal.style.display = "flex";
      document.getElementById("producto").innerHTML = jsondata[k].DESCRIPCION
      closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
      });

      window.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });

      document.getElementById("boton_cancelar").addEventListener("click", function(){
          modal.style.display = "none";
        
      })

    }

    document.getElementById("boton_agregar").addEventListener("click", function(){
      //venta_flotante(localStorage.getItem("ventana_flotante"))
        k=localStorage.getItem("ventana_flotante")
        let orden= localStorage.getItem("iniciar_orden")
        let datosJSON = [];
        let material=""
        const modal = document.getElementById("myModal")
        const nuevoDato = {  ORDEN: orden, SAP: jsondata[k].SAP, DESCRIPCION: jsondata[k].DESCRIPCION, CANTIDAD: document.getElementById("cantidad_insumo").value, EXISTENCIA: jsondata[k].EXISTENCIA, VALOR_TOTAL: jsondata[k].VALOR_TOTAL }; 
        //const nuevoDato = {  ORDEN: jsondata[k].ORDEN, SAP: jsondata[k].SAP, DESCRIPCION: jsondata[k].DESCRIPCION, CANTIDAD: jsondata[k].CANTIDAD, EXISTENCIA: jsondata[k].EXISTENCIA, VALOR_TOTAL: jsondata[k].VALOR_TOTAL };
        
        material=localStorage.getItem("agregar_material")

        if((localStorage.getItem("agregar_material"))==null){
          datosJSON.push(nuevoDato);
          console.log("1 "+datosJSON)
          localStorage.setItem("agregar_material",JSON.stringify(datosJSON))
          modal.style.display = "none";
        }else{
          datosJSON=(JSON.parse(material))
          datosJSON = datosJSON.filter(item => item.SAP !== jsondata[k].SAP);
          datosJSON.push(nuevoDato);
        localStorage.setItem("agregar_material",JSON.stringify(datosJSON))
        modal.style.display = "none";
        }
        
    })

    for (let i in jsondata) {
      // console.log(jsondata[i].HOJARUTA)      

      if (jsondata[i].SAP.includes(document.getElementById("Buscar_string").value)) {
        const div = document.createElement('div');
        div.id = "insumos" + i
        div.className = 'cuadro_resumen_insumos';
        div.innerHTML = '<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">CODIGO: &nbsp &nbsp' + jsondata[i].SAP + '</div><div class="titulo_resumen_ordenes">DESCRIPCION: &nbsp &nbsp' + jsondata[i].DESCRIPCION + '</div><div class="titulo_resumen_ordenes">CANTIDAD: &nbsp &nbsp' + jsondata[i].EXISTENCIA + '</div></div></div>'

        div.onclick = function(){ventana_flotante(i)}
        //localStorage.setItem("ventana_flotante",i)
        container.appendChild(div)
        contador = contador + 1
        if (Number(jsondata[i].EXISTENCIA == 0)) {
          document.getElementById("insumos" + i).style.backgroundColor = "rgb(147, 81, 85)"
        }

      }

    }


    // buscar por codigo

    document.getElementById("Buscar_string").addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (checkbox.checked == true) {
          let contador = 1
          event.preventDefault();
          container.innerHTML = ""
          document.getElementById("no_encontrado").innerHTML = ""
          document.getElementById("no_encontrado_texto").innerHTML = ""

          esperando()
          for (let i in jsondata) {
            if (jsondata[i].SAP.includes(document.getElementById("Buscar_string").value)) {
              const div = document.createElement('div');
              div.id = "insumos" + i
              div.className = 'cuadro_resumen_insumos';
              div.innerHTML = '<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">CODIGO: &nbsp &nbsp' + jsondata[i].SAP + '</div><div class="titulo_resumen_ordenes">DESCRIPCION: &nbsp &nbsp' + jsondata[i].DESCRIPCION + '</div><div class="titulo_resumen_ordenes">CANTIDAD: &nbsp &nbsp' + jsondata[i].EXISTENCIA + '</div></div></div>'
              document.getElementById("boton_agregar").removeAttribute('onclick')
              div.onclick = function(){ventana_flotante(i)}
              container.appendChild(div)
              contador = contador + 1
              document.getElementById("no_encontrado").innerHTML = ""
              document.getElementById("no_encontrado_texto").innerHTML = ""
              if (Number(jsondata[i].EXISTENCIA == 0)) {
                document.getElementById("insumos" + i).style.backgroundColor = "rgb(147, 81, 85)"
              }

            }

          }
          sin_datos(contador)
        }
      }

    });


    document.getElementById("boton_buscar").addEventListener("click", function (event) {
      if (checkbox.checked == true) {
        let contador = 1
        event.preventDefault();
        container.innerHTML = ""
        document.getElementById("no_encontrado").innerHTML = ""
        document.getElementById("no_encontrado_texto").innerHTML = ""

        esperando()
        for (let i in jsondata) {
          if (jsondata[i].SAP.includes(document.getElementById("Buscar_string").value)) {
            const div = document.createElement('div');
            div.id = "insumos" + i
            div.className = 'cuadro_resumen_insumos';
            div.innerHTML = '<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">CODIGO: &nbsp &nbsp' + jsondata[i].SAP + '</div><div class="titulo_resumen_ordenes">DESCRIPCION: &nbsp &nbsp' + jsondata[i].DESCRIPCION + '</div><div class="titulo_resumen_ordenes">CANTIDAD: &nbsp &nbsp' + jsondata[i].EXISTENCIA + '</div></div></div>'
            document.getElementById("boton_agregar").removeAttribute('onclick')
            div.onclick = function(){ventana_flotante(i)}
            container.appendChild(div)
            contador = contador + 1
            document.getElementById("no_encontrado").innerHTML = ""
            document.getElementById("no_encontrado_texto").innerHTML = ""
            if (Number(jsondata[i].EXISTENCIA == 0)) {
              document.getElementById("insumos" + i).style.backgroundColor = "rgb(147, 81, 85)"
            }

          }

        }
        sin_datos(contador)
      }


    });



    //buscar por descripcion

    document.getElementById("Buscar_string").addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (checkbox.checked == false) {
          let contador = 1
          event.preventDefault();
          container.innerHTML = ""
          document.getElementById("no_encontrado").innerHTML = ""
          document.getElementById("no_encontrado_texto").innerHTML = ""

          esperando()
          for (let i in jsondata) {
            if ((jsondata[i].DESCRIPCION.toUpperCase()).includes((document.getElementById("Buscar_string").value).toUpperCase())) {
              const div = document.createElement('div');
              div.id = "insumos" + i
              div.className = 'cuadro_resumen_insumos';
              div.innerHTML = '<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">CODIGO: &nbsp &nbsp' + jsondata[i].SAP + '</div><div class="titulo_resumen_ordenes">DESCRIPCION: &nbsp &nbsp' + jsondata[i].DESCRIPCION + '</div><div class="titulo_resumen_ordenes">CANTIDAD: &nbsp &nbsp' + jsondata[i].EXISTENCIA + '</div></div></div>'
              document.getElementById("boton_agregar").removeAttribute('onclick')
              div.onclick = function(){ventana_flotante(i)}
              container.appendChild(div)
              contador = contador + 1
              document.getElementById("no_encontrado").innerHTML = ""
              document.getElementById("no_encontrado_texto").innerHTML = ""
              if (Number(jsondata[i].EXISTENCIA == 0)) {
                document.getElementById("insumos" + i).style.backgroundColor = "rgb(147, 81, 85)"
              }

            }

          }
          sin_datos(contador)
        }
      }
    });



    document.getElementById("boton_buscar").addEventListener("click", function (event) {
      if (checkbox.checked == false) {
        let contador = 1
        event.preventDefault();
        container.innerHTML = ""
        document.getElementById("no_encontrado").innerHTML = ""
        document.getElementById("no_encontrado_texto").innerHTML = ""

        esperando()
        for (let i in jsondata) {
          if ((jsondata[i].DESCRIPCION.toUpperCase()).includes((document.getElementById("Buscar_string").value).toUpperCase())) {
            const div = document.createElement('div');
            div.id = "insumos" + i
            div.className = 'cuadro_resumen_insumos';
            div.innerHTML = '<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">CODIGO: &nbsp &nbsp' + jsondata[i].SAP + '</div><div class="titulo_resumen_ordenes">DESCRIPCION: &nbsp &nbsp' + jsondata[i].DESCRIPCION + '</div><div class="titulo_resumen_ordenes">CANTIDAD: &nbsp &nbsp' + jsondata[i].EXISTENCIA + '</div></div></div>'
            document.getElementById("boton_agregar").removeAttribute('onclick')
            div.onclick = function(){ventana_flotante(i)}
            container.appendChild(div)
            contador = contador + 1
            document.getElementById("no_encontrado").innerHTML = ""
            document.getElementById("no_encontrado_texto").innerHTML = ""
            if (Number(jsondata[i].EXISTENCIA == 0)) {
              document.getElementById("insumos" + i).style.backgroundColor = "rgb(147, 81, 85)"
            }

          }

        }
        sin_datos(contador)
      }

    });



  })