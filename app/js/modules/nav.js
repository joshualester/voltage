const nav = {
  init: () => {
    const header = document.getElementById('header');
    const navToggler = document.getElementById('nav-toggle');

    navToggler.addEventListener('click', function () {
      header.classList.toggle('open');
    });
  },
};
nav.init();
