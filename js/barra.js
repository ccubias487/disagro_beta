
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
