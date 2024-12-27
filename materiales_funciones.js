document.getElementById("inicio").addEventListener("click",function(){
    window.location.href = "index.html";
})


document.getElementById("titulo_logo").innerHTML=localStorage.getItem("iniciar_orden_d")

fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/materiales_ordenes.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const jsondata = data.sort((a, b) => {
            return parseInt(a.PRIORIDAD) - parseInt(b.PRIORIDAD);
          });


        console.log(jsondata)
        const container = document.getElementById('actividades_asignadas');
        let contador=1
        for (let i in jsondata) {
            console.log(jsondata[i].HOJARUTA)      
            
            function iniciar_orden(){
                localStorage.setItem("iniciar_orden_hr",jsondata[i].HOJARUTA)
                
            }

            if (jsondata[i].HOJARUTA==localStorage.getItem("iniciar_orden_hr")) {
                const div = document.createElement('div');
                div.id="insumos"+i
                div.className = 'cuadro_resumen_insumos';
                div.innerHTML='<div class="cuadro_resumen_ordenes_superpuesto"></div><div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">CODIGO: &nbsp &nbsp'+jsondata[i].CODIGO+'</div><div class="titulo_resumen_ordenes">DESCRIPCION: &nbsp &nbsp'+jsondata[i].DESCRIPCION+'</div><div class="titulo_resumen_ordenes">CANTIDAD: &nbsp &nbsp'+ jsondata[i].CANTIDAD +'</div><div class="titulo_resumen_ordenes">EXISTENCIA: &nbsp &nbsp'+ jsondata[i].EXISTENCIA +'</div></div></div>'

               

                container.appendChild(div)
                contador=contador+1
                if (Number(jsondata[i].CANTIDAD)>Number(jsondata[i].EXISTENCIA)){
                    document.getElementById("insumos"+i).style.backgroundColor= "rgb(147, 81, 85)"
                }
                
            }

        }
             //container.appendChild(div)

        })