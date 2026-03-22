(function(){
  const heroButtons = document.querySelectorAll('.glass-button');
  const profileButton = document.getElementById('profileButton');
  const profileModal = document.getElementById('profileModal');
  const profileClose = document.getElementById('profileClose');
  const profileTranslateButton = document.getElementById('profileTranslateButton');
  const profileScroll = document.querySelector('.profile-scroll');

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
    chipPrimary: { en: 'SIS CHARACTER DOSSIER', ko: 'SIS CHARACTER DOSSIER' },
    chipSecondary: { en: 'EYES ONLY (SIS)', ko: 'EYES ONLY (SIS)' },
    kicker: { en: 'FILED PROFILE', ko: '요원 등록정보' },
    name: { en: 'Noel Hale', ko: 'Noel Hale' },
    subtitle: {
      en: 'MI6 Senior HUMINT Case Officer / Non-Official Cover',
      ko: 'MI6 수석 현장 요원 / 신분 비노출'
    },
    labelAge: { en: 'DOB', ko: '나이' },
    valueAge: { en: '22-DEC-1992 / 34Y', ko: '1992-12월-22 / 34세' },
    labelNationality: { en: 'Nationality', ko: '국적' },
    valueNationality: { en: 'British', ko: '영국' },
    section199212Label: { en: '[1992.12]', ko: '[1992.12]' },
    section199212Text: {
      en: `<p>Father: an orchestra conductor.</p>
<p>Mother: senior curator at a London auction house.</p>
<p>The family home was always filled with beautiful music and fine art, but never with emotional warmth.</p>
<p>His parents treated him less like a son than like the most flawless piece in their collection. Naturally, he grew up acutely responsive to every expression, inflection, and gesture, learning not to speak or feel his own emotions so much as to reflect back the response others wanted from him—like a mirror made for their approval.</p>`,
      ko: `<p>아버지: 오케스트라 지휘자.</p>
<p>어머니: 런던 옥션 하우스의 수석 큐레이터.</p>
<p>집안은 늘 아름다운 음악과 미술품으로 가득했지만, 정서적 온기는 없었다.</p>
<p>부모는 그를 아들보다는 자신의 컬렉션 가운데 가장 완벽한 작품처럼 대했고, 자연스럽게 그는 사랑받기 위해 그들의 표정과 말투, 행동 하나하나에 예민하게 반응하며 자라났다. 자신의 감정을 말하고 느끼기보다, 상대가 원하는 반응을 비춰 주는 '거울'에 가까웠다.</p>`
    },
    section201001Label: { en: '[2010.01]', ko: '[2010.01]' },
    section201001Text: {
      en: `<p>With the A-Level examinations just ahead of him, he was studying late into the night. His parents were returning home later than usual, but he thought little of it.</p>
<p>The moment he turned on the tap to wash up, the telephone rang.</p>
<p>Through the noise on the line, a man identifying himself as a doctor delivered two careful facts: a chain collision on rain-slick roads, and the death of both of his parents.</p>
<p>Only then did the violent sound of rain outside begin to grate on him. The breath he released was longer and finer than usual, trembling slightly, but his voice remained exactly the same.</p>
<p>After he hung up, he stood motionless for almost an hour with the tap still running before finally making his way to the funeral hall.</p>
<p>He did not cry once during the three-day funeral. Some mourners believed the grief was simply too great for tears. Others looked at him as though something in him were wrong, though none said it aloud.</p>
<p>From that point onward, he began to conclude that he was someone incapable of feeling emotion at all, because he could not shed even a single tear.</p>`,
      ko: `<p>A-Level 시험이 얼마 남지 않아 늦은 시간까지 공부하고 있었다. 부모님의 귀가가 평소보다 늦어지고 있었지만, 그는 대수롭지 않게 여겼다.</p>
<p>씻기 위해 수도꼭지를 틀자마자 전화기가 울렸다.</p>
<p>전화기 너머 소음 사이로 자신을 의사라고 밝힌 남자는 두 가지를 조심스럽게 전했다. 빗길 연쇄사고, 그리고 부모님의 사망.</p>
<p>그제야 창밖의 요란한 빗소리가 귀에 거슬리기 시작했다. 조용히 내뱉는 숨은 평소보다 길고 가늘게 떨렸지만, 목소리는 늘 그렇듯 일정했다.</p>
<p>전화를 끊고도 그는 수도꼭지를 틀어 둔 채 거의 한 시간을 멍하니 서 있다가 장례식장으로 향했다.</p>
<p>3일간의 장례 동안 그는 울지 않았다. 어떤 조문객들은 너무 큰 슬픔 앞에서는 눈물조차 나오지 않는 법이라 여겼고, 어떤 조문객들은 이상하다는 듯 바라보았지만 끝내 입 밖으로 내지는 않았다.</p>
<p>이 무렵부터 그는 눈물 한 방울 흘리지 못하는 자신을 두고, 감정을 느끼지 못하는 인간이라는 결론을 내리기 시작했다.</p>`
    },
    section201008Label: { en: '[2010.08]', ko: '[2010.08]' },
    section201008Text: {
      en: `<p>Everyone expected him to suspend his studies after his parents' deaths, yet he still achieved the same A* marks he had posted in his mock examinations. In August of that year, his admission to Cambridge was confirmed; by autumn, he had stepped onto the campus.</p>
<p>Choosing PBS—Psychological and Behavioural Sciences—was almost inevitable. In trying to understand and interpret both himself and ordinary people, he found in it not merely an academic field, but a manual for how the world worked.</p>`,
      ko: `<p>모두가 부모님의 사망 이후 휴학을 예상했지만, 그는 A-Level 시험에서 모의고사와 동일한 A*를 받아 냈고 그해 8월 케임브리지 진학이 확정되었다. 그리고 그해 가을, 그는 케임브리지에 발을 들였다.</p>
<p>자신과 평범한 사람들을 이해하고 해석하기 위해 그가 PBS(심리·행동과학)를 택한 것은 자연스러운 선택이었다. 그에게 그것은 단순한 학문이 아니라, 세상을 읽기 위한 설명서에 가까웠다.</p>`
    },
    section201310Label: { en: '[2013.10]', ko: '[2013.10]' },
    section201310Text: {
      en: `<p>At twenty-one, he graduated first in his undergraduate cohort and moved directly into a PhD.</p>
<p>His research focused on the correlation between mechanisms of human behaviour and non-verbal communication.</p>
<p>It was during this period that an MI6 recruiter began approaching Noel under the pretence of asking for academic advice.</p>`,
      ko: `<p>21세에 학부를 수석으로 졸업한 그는 곧바로 박사과정에 들어갔다.</p>
<p>그가 진행한 연구는 '인간 행동 기제와 비언어적 커뮤니케이션의 상관관계 분석'이었다.</p>
<p>이 시기부터 MI6 리크루터는 노엘에게 학문적 조언을 구하는 척 접근하기 시작했다.</p>`
    },
    section201607Label: { en: '[2016.07]', ko: '[2016.07]' },
    section201607Text: {
      en: `<p>At twenty-four, he completed in three years a doctorate that ordinarily took four.</p>
<p>Two days before graduation, MI6 made its approach.</p>`,
      ko: `<p>24세, 통상 4년이 걸리는 박사과정을 3년 만에 통과했다.</p>
<p>졸업을 이틀 앞둔 시점, 그는 MI6의 스카우트를 받았다.</p>`
    }
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

      if (element.dataset.profileCopyHtml === 'true') {
        element.innerHTML = copy[lang];
      } else {
        element.textContent = copy[lang];
      }
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
    if (profileScroll) profileScroll.scrollTop = 0;
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
