if (localStorage.getItem("usuario")== null){
    window.location.href = "index.html";
  }
  
document.getElementById("inicio").addEventListener("click",function(){
    window.location.href = "principal.html";
})

document.getElementById("actividades_siguiente").addEventListener("click",function(){
    window.location.href = "materiales_orden.html";
})
document.getElementById("titulo_logo").innerHTML=localStorage.getItem("iniciar_orden_d")

fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/hojaruta.json")
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
                div.className = 'cuadro_resumen_actividades';
                div.innerHTML='<div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">'+contador+'.   '+jsondata[i].ACTIVIDAD+'</div></div>'

                container.appendChild(div)
                contador=contador+1
     
                
            }

        }
             //container.appendChild(div)

        })