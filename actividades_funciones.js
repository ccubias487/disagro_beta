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

fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/ordenes_asignadas.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const jsondata = data.sort((a, b) => {
            return parseInt(a.PRIORIDAD) - parseInt(b.PRIORIDAD);
          });


       // console.log(jsondata)
        const container = document.getElementById('actividades_asignadas');
        let contador=1
        for (let i in jsondata) {
         //   console.log(jsondata[i].HOJARUTA)      
            
            function iniciar_orden(){
                localStorage.setItem("iniciar_orden_hr",jsondata[i].HOJARUTA)
                
            }
            console.log("hoja ruta ", jsondata[i].HOJARUTA)
            console.log("hoja ruta local", localStorage.getItem("iniciar_orden_hr"))
             console.log("hoja orden ", jsondata[i].ORDEN)
            console.log("hoja orden local", localStorage.getItem("iniciar_orden"))
            console.log("---------------------------------------------------------------------")
            
            if (String(jsondata[i].HOJARUTA)==localStorage.getItem("iniciar_orden_hr")) {
                if (String(jsondata[i].ORDEN)==localStorage.getItem("iniciar_orden")) {
                const div = document.createElement('div');
                div.className = 'cuadro_resumen_actividades';
                div.innerHTML='<div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">'+contador+'.   '+jsondata[i].ACTIVIDAD+'</div></div>'
console.log("aquie")
                container.appendChild(div)
                contador=contador+1
     
                } 
            }

        }
             //container.appendChild(div)

        })
