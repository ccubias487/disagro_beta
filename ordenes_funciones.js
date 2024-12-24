document.getElementById("inicio").addEventListener("click",function(){
    window.location.href = "index.html";
})

fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/database.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const jsondata = data.sort((a, b) => {
            return parseInt(a.PRIORIDAD) - parseInt(b.PRIORIDAD);
          });


        console.log(jsondata)
        const container = document.getElementById('ordenes_asignadas');
        for (let i in jsondata) {
            console.log(jsondata[i].NOMBRE)           
            if (jsondata[i].NOMBRE== "CARLOS ALEXANDER CUBIAS ORTIZ") {
                const div = document.createElement('div');
                div.className = 'cuadro_resumen_ordenes';
                div.innerHTML='<div class="titulo_resumen_ordenes"><div class="titulo_resumen_ordenes">ORDEN: '+jsondata[i].ORDEN+'</div><div class="titulo_resumen_ordenes">NOMBRE:'+ jsondata[i].NOMBRE+'</div><div class="titulo_resumen_ordenes  ">DESCRIPCION: '+jsondata[i].DESCRIPCION+'</div></div><div class="prioridad" id="prioridad'+i+'"></div>'
                container.appendChild(div)
                if (jsondata[i].PRIORIDAD==1){
                    document.getElementById("prioridad"+i).style.backgroundColor= "rgb(175, 8, 5)"
                }
                if (jsondata[i].PRIORIDAD==2){
                    document.getElementById("prioridad"+i).style.backgroundColor= "rgb(202 169 5)"
                }
                if (jsondata[i].PRIORIDAD==3){
                    document.getElementById("prioridad"+i).style.backgroundColor= "rgb(83, 202, 5)"
                }
                
            }

        }
             //container.appendChild(div)

        })