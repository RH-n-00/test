(function(){
  const heroButtons = document.querySelectorAll('.glass-button');
  const profileButton = document.getElementById('profileButton');
  const profileModal = document.getElementById('profileModal');
  const profileClose = document.getElementById('profileClose');

  heroButtons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      button.style.setProperty('--x', x + '%');
      button.style.setProperty('--y', y + '%');
    });
  });

  const openProfile = () => {
    if (!profileModal) return;
    profileModal.classList.add('is-open');
    profileModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeProfile = () => {
    if (!profileModal) return;
    profileModal.classList.remove('is-open');
    profileModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  profileButton?.addEventListener('click', openProfile);
  profileClose?.addEventListener('click', closeProfile);

  profileModal?.addEventListener('click', (event) => {
    if (event.target === profileModal) {
      closeProfile();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && profileModal?.classList.contains('is-open')) {
      closeProfile();
    }
  });

  new InstancedMouseEffect({
    speed: 1,
    frequency: 1,
    mouseSize: 1,
    rotationSpeed: 1,
    rotationAmmount: 0,
    mouseScaling: 0,
    mouseIndent: 1,
    color: '#050505',
    colorDegrade: 1.1,
    shape: 'square'
  });
})();
