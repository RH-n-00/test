(function(){
  const heroButtons = document.querySelectorAll('.glass-button');
  const profileButton = document.getElementById('profileButton');
  const profileModal = document.getElementById('profileModal');
  const profileClose = document.getElementById('profileClose');
  const profileTranslateButton = document.getElementById('profileTranslateButton');

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

  const profileCopy = {
    chipPrimary: { en: 'SIS CHARACTER DOSSIER', ko: 'SIS 인물 기록' },
    chipSecondary: { en: 'LEVEL 4 / INTERNAL', ko: '4등급 / 내부 열람' },
    kicker: { en: 'Filed Profile', ko: '등록 프로필' },
    name: { en: 'Noel Hale', ko: '노엘 헤일' },
    subtitle: { en: 'Field Asset Overview / Psychological Readout', ko: '현장 자산 개요 / 심리 판독' },
    labelAge: { en: 'Age', ko: '나이' },
    valueAge: { en: '34', ko: '34' },
    labelNationality: { en: 'Nationality', ko: '국적' },
    valueNationality: { en: 'British', ko: '영국' },
    labelPosition: { en: 'Position', ko: '직위' },
    valuePosition: { en: 'MI6 Senior HUMINT Case Officer', ko: 'MI6 선임 HUMINT 담당관' },
    labelOrigin: { en: 'Origin', ko: '출신' },
    valueOrigin: { en: 'London, England', ko: '영국 잉글랜드 런던' },
    sectionBackgroundLabel: { en: 'Background', ko: '성장 배경' },
    sectionBackgroundText: { en: 'Raised between the rigid standards of an orchestra conductor father and a London auction-house curator mother, he learned composure before warmth. Precision, restraint, and immaculate control were treated as necessities, not virtues. What remains on the surface is elegance. What survives underneath is a man who was trained to read others long before he was allowed to understand himself.', ko: '오케스트라 지휘자인 아버지와 런던 경매 하우스 큐레이터인 어머니 사이에서 자라며, 그는 따뜻함보다 먼저 절제를 배웠다. 정확함과 자제, 완벽한 통제는 미덕이 아니라 필수로 여겨졌다. 표면에 남은 것은 우아함이지만, 그 아래에 남은 것은 자기 자신을 이해하도록 허락받기도 전에 타인을 읽는 법부터 훈련된 남자다.' },
    sectionImpressionLabel: { en: 'Impression', ko: '인상' },
    sectionImpressionText: { en: 'Calm, immaculate, and difficult to penetrate. He leaves the impression of still water at midnight: polished, silent, and far deeper than first contact suggests.', ko: '차분하고, 흠잡을 데 없으며, 쉽게 속내를 드러내지 않는다. 그는 자정의 고요한 물처럼 보인다. 정제되어 있고, 침묵 속에 있으며, 처음 마주한 순간보다 훨씬 깊다.' }
  };

  const verificationMessages = [
    'Establishing internal relay...',
    'Tracing local signature...',
    'Correlating domestic residence node...',
    'Secure channel recovered.'
  ];

  const decodedLines = [
    'SOUTH KENSINGTON, LONDON.',
    'MEWS HOUSE',
    '26.03.21 / 5:30 A.M.'
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
  let profileLanguage = 'en';

  heroButtons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      button.style.setProperty('--x', x + '%');
      button.style.setProperty('--y', y + '%');
    });
  });

  const setProfileLanguage = (lang = 'en') => {
    document.querySelectorAll('[data-profile-copy]').forEach((element) => {
      const key = element.dataset.profileCopy;
      const copy = profileCopy[key];
      if (!copy || !copy[lang]) return;
      element.textContent = copy[lang];
    });

    profileLanguage = lang;

    if (profileTranslateButton) {
      const isKorean = lang === 'ko';
      profileTranslateButton.textContent = isKorean ? '원문' : '번역';
      profileTranslateButton.classList.toggle('is-active', isKorean);
      profileTranslateButton.setAttribute('aria-pressed', String(isKorean));
      profileTranslateButton.setAttribute('aria-label', isKorean ? '영문으로 보기' : '한글로 번역');
    }
  };

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

  const getTypingDelay = (char, mode = 'morse') => {
    if (char === '\n') return 320 + Math.random() * 120;
    if (char === ' ') return mode === 'morse' ? 90 + Math.random() * 40 : 100 + Math.random() * 55;
    if (char === '/') return 170 + Math.random() * 70;
    if (char === '.' || char === '-') return mode === 'morse' ? 58 + Math.random() * 38 : 34 + Math.random() * 22;
    if (char === ',') return 160 + Math.random() * 50;
    return mode === 'morse' ? 46 + Math.random() * 30 : 40 + Math.random() * 28;
  };

  const renderSignal = (text, mode = 'morse') => {
    stopSignInTimers();
    signalOutput.textContent = '';
    signalOutput.classList.toggle('is-decoded', mode === 'decoded');
    signalOutput.classList.add('is-typing');

    let index = 0;
    const step = () => {
      const char = text.charAt(index);
      signalOutput.textContent += char;
      index += 1;

      if (index < text.length) {
        typingTimer = window.setTimeout(step, getTypingDelay(char, mode));
      } else {
        signalOutput.classList.remove('is-typing');
        typingTimer = null;
      }
    };

    typingTimer = window.setTimeout(step, 180);
  };

  const resetProfileModal = () => {
    setProfileLanguage('en');
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
      signalOutput.classList.remove('is-decoded', 'is-typing');
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

  const openProfile = () => {
    resetProfileModal();
    openModal(profileModal);
  };

  const closeProfile = () => {
    closeModal(profileModal);
    resetProfileModal();
  };

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
  profileTranslateButton?.addEventListener('click', () => {
    setProfileLanguage(profileLanguage === 'en' ? 'ko' : 'en');
  });
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

  resetProfileModal();

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
