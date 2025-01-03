document.getElementById("titulo_logo").innerHTML=localStorage.getItem("iniciar_orden_d")
let orden= localStorage.getItem("iniciar_orden")

document.getElementById("inicio").addEventListener("click",function(){
    window.location.href = "index.html";
})



document.getElementById("boton_agregar").addEventListener("click",function(){
  window.location.href = "existencias.html";
})

document.getElementById("boton_siguiente").addEventListener("click", function(){
  const nuevoDato = {  ORDEN: orden,  DETALLE: localStorage.getItem("iniciar_orden_d"), STATUS: "PROCESO DE AUTORIZACION"};
          
                let datosJSON=[]
                let material=localStorage.getItem("autorizaciones")
                if((localStorage.getItem("autorizaciones"))==null){
                  datosJSON.push(nuevoDato);
                  console.log(datosJSON)
                localStorage.setItem("autorizaciones",JSON.stringify(datosJSON))
                }else{
                  datosJSON=(JSON.parse(material))
                  console.log(datosJSON)
                  //datosJSON = datosJSON.filter(item => item.SAP !== jsondata[i].CODIGO);
                  datosJSON.push(nuevoDato);
                
                console.log(datosJSON)
                //localStorage.setItem("autorizaciones",JSON.stringify(datosJSON))
                }

  window.location.href="autorizacion.html"
})


fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/materiales_ordenes.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const jsondata = data.sort((a, b) => {
            return parseInt(a.PRIORIDAD) - parseInt(b.PRIORIDAD);
          });


        //console.log(jsondata)
        const container = document.getElementById('actividades_asignadas');
        let contador=1
        let datosJSON = [];
        for (let i in jsondata) {
            //console.log(jsondata[i].HOJARUTA)      
            
            function iniciar_orden(){
                localStorage.setItem("iniciar_orden_hr",jsondata[i].HOJARUTA)
                
            }

            if (jsondata[i].HOJARUTA==localStorage.getItem("iniciar_orden_hr")) {
                
                const nuevoDato = {  ORDEN: orden, SAP: jsondata[i].CODIGO, DESCRIPCION: jsondata[i].DESCRIPCION, CANTIDAD: jsondata[i].CANTIDAD, EXISTENCIA: jsondata[i].EXISTENCIA, VALOR_TOTAL: jsondata[i].VALOR_TOTAL };
          
                let material=localStorage.getItem("agregar_material")
                if((localStorage.getItem("agregar_material"))==null){
                  datosJSON.push(nuevoDato);
                  console.log(datosJSON)
                localStorage.setItem("agregar_material",JSON.stringify(datosJSON))
                }else{
                  datosJSON=(JSON.parse(material))
                  console.log(datosJSON)
                  datosJSON = datosJSON.filter(item => item.SAP !== jsondata[i].CODIGO);
                  datosJSON.push(nuevoDato);
                
                console.log(datosJSON)
                localStorage.setItem("agregar_material",JSON.stringify(datosJSON))
                }

              
                contador=contador+1
                if (Number(jsondata[i].CANTIDAD)>Number(jsondata[i].EXISTENCIA)){
                    document.getElementById("insumos"+i).style.backgroundColor= "rgb(147, 81, 85)"
                }
  

            }

        }
        datosJSON=(JSON.parse(localStorage.getItem("agregar_material")))
        for (let j in datosJSON ) {
          
          const div = document.createElement('div');
          div.id="insumos"+j
          div.className = 'cuadro_resumen_insumos';
          div.innerHTML='<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">CODIGO: &nbsp &nbsp'+datosJSON[j].SAP+'</div><div class="titulo_resumen_ordenes">DESCRIPCION: &nbsp &nbsp'+(datosJSON[j].DESCRIPCION).substring(0,28)+'</div><div class="titulo_resumen_ordenes">CANTIDAD: &nbsp &nbsp'+ datosJSON[j].CANTIDAD  +'</div><div class="titulo_resumen_ordenes">EXISTENCIA: &nbsp &nbsp'+ datosJSON[j].EXISTENCIA +'</div></div></div>'
          container.appendChild(div)

        }
        function numeroAleatorio(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

        if (contador==1){

            let aleatorio_image = "https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/empty"+numeroAleatorio(1, 3)+".png"

            const div = document.getElementById("no_encontrado");
            const imagen = document.createElement("img");
            imagen.src = aleatorio_image
            imagen.alt = "No encontrado"; 
            imagen.style.width = "400px"; 
            imagen.style.height = "400px"; 
            div.appendChild(imagen);
            document.getElementById("no_encontrado_texto").innerHTML="NO SE ENCOTRARON INSUMOS PARA ESTA ORDEN"
            document.getElementById("no_encontrado_texto").style.fontSize="xx-large"
            document.getElementById("no_encontrado_texto").style.fontWeight="bold"
            document.getElementById("no_encontrado_texto").style.color="White"
            document.getElementById("boton_siguiente").innerHTML="Iniciar orden"
        }
        })