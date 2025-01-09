if (localStorage.getItem("usuario")== null){
    window.location.href = "index.html";
  }

  if (localStorage.getItem("firma_user")== null){
    window.location.href = "firma.html";
  }

document.getElementById("cuenta").addEventListener("click", function(){
  localStorage.removeItem("firma_user")
  localStorage.removeItem("nombre")
  localStorage.removeItem("usuario")
  localStorage.removeItem("realizadas")
  localStorage.removeItem("proceso")

    
  window.location.href = "index.html";
})

document.getElementById("inventario").addEventListener("click", function(){

  window.location.href = "existencias_disagro.html";
})
  
function convertirNombrePropio(nombre) {
    return nombre
      .split(' ')
      .map(palabra => 
        palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase() 
      )
      .join(' '); 
  }
  
  let nombre = convertirNombrePropio(localStorage.getItem("usuario"));
  
  let ejecutando=localStorage.getItem("proceso")
  console.log(ejecutando)
  if (ejecutando==null){
document.getElementById("proceso").innerHTML=0

  }else{
    document.getElementById("proceso").innerHTML=ejecutando
  }
  

document.getElementById("ordenes").addEventListener("click",function(){
    window.location.href = "ordenes.html";
})

document.getElementById("nombre_user").innerHTML="Hola, "+ nombre


fetch("https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/database.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    
    let realizadas=localStorage.getItem("realizadas")
    let asignadas=0

  if (realizadas==null){
   document.getElementById("realizadas").innerHTML=0
  }else{
  
    document.getElementById("realizadas").innerHTML=realizadas
  }


    for(i in data){
      if (data[i].NOMBRE== localStorage.getItem("nombre")){
        asignadas= asignadas+1
      }
    }
document.getElementById("asignadas").innerHTML=asignadas
console.log(realizadas)
console.log(asignadas)
if( realizadas !== null){
  document.getElementById("procentaje").innerHTML=(((realizadas/asignadas)*100).toFixed(2))+"%"
  document.getElementById("procentaje").style.width=((realizadas/asignadas)*100).toFixed(2)+"%"
}else{
  console.log(realizadas)
 document.getElementById("procentaje").innerHTML="0%"
 document.getElementById("procentaje").style.width="0%"
}


  })

