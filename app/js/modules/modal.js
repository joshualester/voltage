const modal = {
  init: () => {
    const loginElement = document.getElementById('login');
    const closeBtn = document.getElementById('close');

    const modalTriggers = document.querySelectorAll('[data-trigger-modal]');

    modalTriggers.forEach((modalTrigger) => {
      modalTrigger.addEventListener('click', function () {
        loginElement.classList.toggle('open');
      });
    });

    closeBtn.addEventListener('click', function () {
      loginElement.classList.remove('open');
    });
  },
};
modal.init();
