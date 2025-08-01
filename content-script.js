// content-script.js
// Downloaded from https://github.com/Hieronymvs?tab=repositories

console.log('[Chess Confirm] overlay script loaded');

(function() {
  let permanentRelease = false;
  let tick = 0;

  const timer = setInterval(() => {
    tick++;
    const chessboard = document.getElementById('board-layout-chessboard');
    const containers = document.querySelectorAll('.player-row-container');
    console.log(`[Chess Confirm] tick ${tick}: chessboard=${!!chessboard}, containers=${containers.length}`);

    if (!chessboard || containers.length === 0) {
      if (tick >= 20) {
        console.warn('[Chess Confirm] giving up after 20 ticks');
        clearInterval(timer);
      }
      return;
    }
    clearInterval(timer);
    console.log('[Chess Confirm] chessboard & player-row-container found — setting up overlay & controls');

    // 1) Overlay over the actual board
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position:      'absolute',
      top:           '0',
      left:          '0',
      width:         '100%',
      height:        '100%',
      background:    'transparent',
      cursor:        'not-allowed',
      zIndex:        '2147483646',
      pointerEvents: 'auto'
    });
    chessboard.style.position = chessboard.style.position || 'relative';
    chessboard.appendChild(overlay);
    console.log('[Chess Confirm] overlay appended to #board-layout-chessboard');

    // 2) Inject buttons into the bottom player container
    const bottomContainer = containers[containers.length - 1];
    bottomContainer.style.display    = bottomContainer.style.display    || 'flex';
    bottomContainer.style.alignItems = bottomContainer.style.alignItems || 'center';

    const wrapper = document.createElement('div');
    Object.assign(wrapper.style, {
      display:    'flex',
      alignItems: 'center',
      gap:        '6px',
      marginLeft: 'auto'
    });
    bottomContainer.appendChild(wrapper);
    console.log('[Chess Confirm] wrapper appended');

    // 3) Release Move button
    const btnRelease = document.createElement('button');
    btnRelease.textContent = 'Release Move';
    Object.assign(btnRelease.style, {
      padding:      '4px 8px',
      background:   '#2a2a2a',
      color:        '#fff',
      border:       'none',
      borderRadius: '3px',
      cursor:       'pointer'
    });
    wrapper.appendChild(btnRelease);

    // 4) Emergency Release toggle
    const btnEmergency = document.createElement('button');
    btnEmergency.textContent = 'Free';
    Object.assign(btnEmergency.style, {
      padding:      '4px 8px',
      background:   '#b00',
      color:        '#fff',
      border:       'none',
      borderRadius: '3px',
      cursor:       'pointer'
    });
    wrapper.appendChild(btnEmergency);
    console.log('[Chess Confirm] buttons appended');

    // Helpers to lock/unlock
    function lockBoard() {
      if (permanentRelease) return;
      overlay.style.pointerEvents = 'auto';
      overlay.style.cursor        = 'not-allowed';
      btnRelease.disabled         = false;
      btnRelease.textContent      = 'Release Move';
      console.log('[Chess Confirm] board locked');
    }
    function releaseOne() {
      overlay.style.pointerEvents = 'none';
      overlay.style.cursor        = 'default';
      btnRelease.disabled         = true;
      btnRelease.textContent      = 'Board Released';
      console.log('[Chess Confirm] board released for one move');
    }

    // 5) Release Move: one-move unlock
    btnRelease.addEventListener('click', () => {
      if (!permanentRelease) releaseOne();
    });

    // 6) Emergency toggle on/off
    btnEmergency.addEventListener('click', () => {
      permanentRelease = !permanentRelease;
      if (permanentRelease) {
        overlay.style.pointerEvents    = 'none';
        overlay.style.cursor           = 'default';
        btnEmergency.textContent       = 'Free';
        btnEmergency.style.background  = '#080';
        btnRelease.disabled            = true;
        console.log('[Chess Confirm] Lock OFF');
      } else {
        btnEmergency.textContent       = 'Locked';
        btnEmergency.style.background  = '#b00';
        console.log('[Chess Confirm] Lock ON');
        lockBoard();
      }
    });

    // 7) Auto-relock after each move
    chessboard.addEventListener('pointerup', () => {
      if (!permanentRelease && overlay.style.pointerEvents === 'none') {
        setTimeout(lockBoard, 0);
      }
    });

    console.log('[Chess Confirm] overlay & controls ready');
  }, 300);
})();
