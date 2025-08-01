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
    console.log(`[Chess Confirm] tick ${tick}: chessboard=${!!chessboard}, player-row-container=${containers.length}`);

    if (!chessboard) {
      if (tick >= 20) {
        console.warn('[Chess Confirm] giving up after 20 ticks');
        clearInterval(timer);
      }
      return;
    }
    clearInterval(timer);
    console.log('[Chess Confirm] chessboard found — setting up overlay & controls');

    // 1) Overlay
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

    // 2) Prepare wrapper for buttons (inline flex, pushed right)
    const wrapper = document.createElement('div');
    Object.assign(wrapper.style, {
      display:    'flex',
      alignItems: 'center',
      gap:        '6px',
      marginLeft: 'auto'
    });

    // 3) Inject buttons into player-row-container if present, else fallback below board
    if (containers.length > 0) {
      const bottomContainer = containers[containers.length - 1];
      bottomContainer.style.display    = bottomContainer.style.display    || 'flex';
      bottomContainer.style.alignItems = bottomContainer.style.alignItems || 'center';
      bottomContainer.appendChild(wrapper);
      console.log('[Chess Confirm] wrapper appended to player-row-container');
    } else {
      chessboard.insertAdjacentElement('afterend', wrapper);
      console.log('[Chess Confirm] wrapper appended below chessboard');
    }

    // 4) Release Move button
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

    // 5) Emergency Release toggle
    const btnEmergency = document.createElement('button');
    btnEmergency.textContent = 'Lock ON';
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

    // 6) Helper functions
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

    // 7) Release Move
    btnRelease.addEventListener('click', () => {
      if (!permanentRelease) releaseOne();
    });

    // 8) Emergency toggle
    btnEmergency.addEventListener('click', () => {
      permanentRelease = !permanentRelease;
      if (permanentRelease) {
        overlay.style.pointerEvents   = 'none';
        overlay.style.cursor          = 'default';
        btnEmergency.textContent      = 'Lock OFF';
        btnEmergency.style.background = '#080';
        btnRelease.disabled           = true;
        console.log('[Chess Confirm] emergency permanent release ON');
      } else {
        btnEmergency.textContent      = 'Lock ON';
        btnEmergency.style.background = '#b00';
        console.log('[Chess Confirm] emergency permanent release OFF');
        lockBoard();
      }
    });

    // 9) Auto-relock after move
    chessboard.addEventListener('pointerup', () => {
      if (!permanentRelease && overlay.style.pointerEvents === 'none') {
        setTimeout(lockBoard, 0);
      }
    });

    console.log('[Chess Confirm] overlay & controls ready');
  }, 300);
})();
