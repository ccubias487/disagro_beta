if (localStorage.getItem("usuario")== null){
  window.location.href = "index.html";
}

// Cadena Base64 (debe ser una cadena Base64 válida)
firma= localStorage.getItem("firma_user")
if (firma!==null){
const base64String = firma; // Truncada para el ejemplo

// Crear un canvas y un contexto 2D
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

// Crear un objeto de imagen
const img = new Image();
img.src = firma; // Reemplaza con tu Base64

img.onload = function () {
  // Ajustar el tamaño del canvas al tamaño de la imagen
  canvas.width = img.width;
  canvas.height = img.height;

  // Dibujar la imagen en el canvas
  ctx.drawImage(img, 0, 0);

  // Obtener los datos de píxeles
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Recorrer cada píxel y verificar si es blanco
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];     // Rojo
    const g = data[i + 1]; // Verde
    const b = data[i + 2]; // Azul

    // Si el color es blanco (o cercano), hacerlo transparente
    if (r > 200 && g > 200 && b > 200) {
      data[i + 3] = 0; // Alpha a 0 (transparente)
    }
  }

  // Volver a colocar los datos procesados en el canvas
  ctx.putImageData(imageData, 0, 0);

  // Mostrar la imagen procesada
  const resultImg = document.createElement("img");
  resultImg.src = canvas.toDataURL();
  document.body.appendChild(resultImg);
};

}