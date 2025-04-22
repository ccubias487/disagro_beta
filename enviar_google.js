
  function enviarDatos() {
    const url = 'https://script.google.com/macros/s/AKfycbyicQh70qnGsikbwNYHDqAdPdmIUzSSIA2fmMxprvHaE1k6peeqra_iU_jKJdeYvlVY/exec'; // tu URL aquí

    const datos = {
      nombre: 'Ana',
      apellido: 'García',
      email: 'ana@example.com'
    };

    console.log(datos)
    
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      alert('Datos enviados correctamente');
    })
    .catch(err => {
      console.error('Error al enviar:', err);
      alert('Error al enviar los datos');
    });
  }

enviarDatos()