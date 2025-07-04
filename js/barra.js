


  const contenedor = document.getElementById("barra_navegacion");


const barraHTML = `
  <div class="barra_navegacion">
    <div class="navbar">
      <div class="notch" id="notch">
        <svg width="290" height="250" viewBox="0 0 169 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M169 0.639244C118.259 15.2839 152.35 76 89.1803 76C26.0109 76 64.2713 13.3313 0 0.639244C62 0.639244 34.8515 0.639244 80 0.639244C125.149 0.639244 123.5 0.639244 169 0.639244Z"
            fill="#212e36" />
          <circle cx="89.5" cy="37.5" r="34.5" fill="#364a6ccc" />
        </svg>
      </div>

      <div class="nav-item active" data-index="0" title="Inicio" id="inicio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>

      </div>

      <div class="nav-item" data-index="2" title="Estadísticas" id="horas">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M3 17h3v-7H3v7zm5 0h3v-4H8v4zm5 0h3v-10h-3v10zm5 0h3v-1h-3v1z" />
        </svg>
      </div>
      <div class="nav-item" data-index="4" title="Perfil" id="cuenta">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
        </svg>
      </div>
    </div>
  </div>
`;

// Insertamos el HTML generado
contenedor.innerHTML = barraHTML;


  const navItems = document.querySelectorAll('.nav-item');
  const notch = document.getElementById('notch');

  function updateNotchPosition(index) {
    const item = navItems[index];
    const navbarRect = item.parentElement.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const leftOffset = itemRect.left - navbarRect.left + itemRect.width / 2 - 30; // 30 = mitad del notch
    notch.style.left = `${leftOffset}px`;
  }

  navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      updateNotchPosition(index);
    });
  });

  // Inicializar posición
  updateNotchPosition(0);

