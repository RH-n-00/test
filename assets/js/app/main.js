(function(){
  const heroButtons = document.querySelectorAll('.glass-button');
  const profileButton = document.getElementById('profileButton');
  const profileModal = document.getElementById('profileModal');
  const profileClose = document.getElementById('profileClose');

  const signInButton = document.getElementById('signInButton');
  const signInModal = document.getElementById('signInModal');
  const signInClose = document.getElementById('signInClose');
  const signInForm = document.getElementById('signInForm');
  const signInStageForm = document.getElementById('signInStageForm');
  const signInStageVerify = document.getElementById('signInStageVerify');
  const signInStageMessage = document.getElementById('signInStageMessage');
  const verifyFill = document.getElementById('verifyFill');
  const verifyStatus = document.getElementById('verifyStatus');
  const signalOutput = document.getElementById('signalOutput');
  const signalHint = document.getElementById('signalHint');
  const translateButton = document.getElementById('translateButton');

  const verificationMessages = [
    'Establishing internal relay...',
    'Tracing local signature...',
    'Correlating domestic residence node...',
    'Secure channel recovered.'
  ];

  const decodedLines = [
    '14 HALCYON MEWS',
    'SOUTH KENSINGTON, LONDON SW7',
    'TWO-STOREY MEWS HOUSE',
    '26.03.22 / 2 P.M.'
  ];

  const morseMap = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---',
    K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-',
    U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
    0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
    '.': '.-.-.-', ',': '--..--', '/': '-..-.', '-': '-....-', ':': '---...', '&': '.-...', "'": '.----.',
    '(': '-.--.', ')': '-.--.-'
  };

  let verifyTimer = null;
  let typingTimer = null;
  let signalMode = 'morse';

  heroButtons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      button.style.setProperty('--x', x + '%');
      button.style.setProperty('--y', y + '%');
    });
  });

  const updateBodyModalState = () => {
    const anyOpen = [profileModal, signInModal].some((modal) => modal?.classList.contains('is-open'));
    document.body.classList.toggle('modal-open', anyOpen);
  };

  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    updateBodyModalState();
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    updateBodyModalState();
  };

  const setActiveStage = (stage) => {
    [signInStageForm, signInStageVerify, signInStageMessage].forEach((item) => item?.classList.remove('is-active'));
    stage?.classList.add('is-active');
  };

  const encodeMorse = (lines) => lines
    .map((line) => line
      .split(' ')
      .map((word) => Array.from(word).map((char) => morseMap[char.toUpperCase()] || char).join(' '))
      .join(' / '))
    .join('\n');

  const morseText = encodeMorse(decodedLines);
  const decodedText = decodedLines.join('\n');

  const stopSignInTimers = () => {
    if (verifyTimer) {
      clearInterval(verifyTimer);
      verifyTimer = null;
    }
    if (typingTimer) {
      clearTimeout(typingTimer);
      typingTimer = null;
    }
  };

  const renderSignal = (text, mode = 'morse') => {
    stopSignInTimers();
    signalOutput.textContent = '';
    signalOutput.classList.toggle('is-decoded', mode === 'decoded');

    let index = 0;
    const step = () => {
      signalOutput.textContent = text.slice(0, index);
      index += 1;
      if (index <= text.length) {
        typingTimer = window.setTimeout(step, mode === 'morse' ? 12 : 18);
      } else {
        typingTimer = null;
      }
    };

    step();
  };

  const resetSignInModal = () => {
    stopSignInTimers();
    signInForm?.reset();
    setActiveStage(signInStageForm);
    signalMode = 'morse';
    if (verifyFill) verifyFill.style.width = '0%';
    if (verifyStatus) verifyStatus.textContent = verificationMessages[0];
    if (signalOutput) {
      signalOutput.textContent = '';
      signalOutput.classList.remove('is-decoded');
    }
    if (signalHint) {
      signalHint.textContent = 'Recovered transmission rendered in Morse. Use [해석] to decode.';
    }
    if (translateButton) {
      translateButton.hidden = true;
      translateButton.classList.remove('is-active');
      translateButton.textContent = '해석';
      translateButton.disabled = false;
    }
  };

  const openProfile = () => openModal(profileModal);
  const closeProfile = () => closeModal(profileModal);

  const openSignIn = () => {
    resetSignInModal();
    openModal(signInModal);
    const firstField = signInForm?.querySelector('input');
    firstField?.focus();
  };

  const closeSignIn = () => {
    closeModal(signInModal);
    resetSignInModal();
  };

  const startVerification = () => {
    setActiveStage(signInStageVerify);
    if (translateButton) translateButton.hidden = true;

    let progress = 0;
    let messageIndex = 0;

    if (verifyStatus) verifyStatus.textContent = verificationMessages[0];
    if (verifyFill) verifyFill.style.width = '0%';

    verifyTimer = window.setInterval(() => {
      progress = Math.min(progress + 4, 100);
      if (verifyFill) verifyFill.style.width = progress + '%';

      const nextMessageIndex = Math.min(Math.floor(progress / 30), verificationMessages.length - 1);
      if (nextMessageIndex !== messageIndex) {
        messageIndex = nextMessageIndex;
        if (verifyStatus) verifyStatus.textContent = verificationMessages[messageIndex];
      }

      if (progress >= 100) {
        clearInterval(verifyTimer);
        verifyTimer = null;
        setTimeout(() => {
          setActiveStage(signInStageMessage);
          if (translateButton) translateButton.hidden = false;
          signalMode = 'morse';
          renderSignal(morseText, 'morse');
        }, 280);
      }
    }, 85);
  };

  profileButton?.addEventListener('click', openProfile);
  profileClose?.addEventListener('click', closeProfile);
  signInButton?.addEventListener('click', openSignIn);
  signInClose?.addEventListener('click', closeSignIn);

  signInForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    startVerification();
  });

  translateButton?.addEventListener('click', () => {
    if (!signInStageMessage?.classList.contains('is-active')) return;
    if (signalMode !== 'morse') return;

    signalMode = 'decoded';
    translateButton.classList.add('is-active');
    translateButton.disabled = true;
    if (signalHint) {
      signalHint.textContent = 'Decoded residence log / local timestamp.';
    }
    renderSignal(decodedText, 'decoded');
  });

  profileModal?.addEventListener('click', (event) => {
    if (event.target === profileModal) closeProfile();
  });

  signInModal?.addEventListener('click', (event) => {
    if (event.target === signInModal) closeSignIn();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (signInModal?.classList.contains('is-open')) {
      closeSignIn();
      return;
    }
    if (profileModal?.classList.contains('is-open')) closeProfile();
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
