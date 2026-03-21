(function(){
  const heroButtons = document.querySelectorAll('.glass-button');

  heroButtons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      button.style.setProperty('--x', x + '%');
      button.style.setProperty('--y', y + '%');
    });
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
