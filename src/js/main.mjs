function setupUI() {
  document.getElementById('nav-icon').addEventListener('click', function () {
    const menu = document.getElementById('menu-tray');
    if (menu.hasAttribute('hidden')) {
      menu.removeAttribute('hidden');
    } else {
      menu.setAttribute('hidden', '');
    }
  });
}

export { setupUI };
