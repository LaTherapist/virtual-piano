// General
const PIANO = document.querySelector('.piano');
const KEYS = document.querySelectorAll('.piano-key');

// Notes/Letters Buttons
const buttonContainer = document.querySelector('.btn-container');
const buttons = document.querySelectorAll('.btn');

buttonContainer.addEventListener('click', (e) => {
    if (e.target.tagName != 'BUTTON' ||  
        e.target.classList.contains('btn-active')) return;

    buttons.forEach( el => el.classList.remove('btn-active'));
    e.target.classList.add('btn-active');

    switchLetters(e);
});

const switchLetters = (e) => {
    if (e.target.classList.contains('btn-letters')) {
        KEYS.forEach( key => key.classList.add('piano-key-letter'));
    } else {
        KEYS.forEach( key => key.classList.remove('piano-key-letter'));
    }
};

// FullScreen
const fullScreen = document.querySelector('.fullscreen');

const toggleScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

fullScreen.addEventListener('click', toggleScreen);

// Style Keys
const activeKey = target => {
    target.classList.remove('piano-key-remove-mouse');
    target.classList.add('piano-key-active');
    target.classList.add('piano-key-active-pseudo');
};
const simpleKey = target => {
    target.classList.add('piano-key-remove-mouse');
    target.classList.remove('piano-key-active');
    target.classList.remove('piano-key-active-pseudo');
};

// Playing Audio
const playAudio = src => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
};
const toggleKey = e => {
    activeKey(e.target);
    playAudio(`./assets/audio/${e.target.dataset.note}.mp3`);
};

// Mouse Events
const keyOver = e => {
    if (!e.target.classList.contains('piano-key')) return;
    toggleKey(e);
    KEYS.forEach( key => {
        key.addEventListener('mouseover', toggleKey);
        key.addEventListener('mouseout', e => simpleKey(e.target));
    });
};
const keyOut = e => {
    simpleKey(e.target);
    KEYS.forEach( key => {
        key.removeEventListener('mouseover', toggleKey);
        key.removeEventListener('mouseout', e => simpleKey(e.target) );
    });
};

PIANO.addEventListener('mousedown', keyOver);
document.addEventListener('mouseup', keyOut); 

// Keyboard Events
const keyboardDown = e => {
    if (e.repeat) return;

    let key = PIANO.querySelector(`[data-letter="${e.code.slice(-1)}"`);
    if(!key) return;

    playAudio(`./assets/audio/${key.dataset.note}.mp3`);
    activeKey(key);
};
const keyboardUp = e => {
    let key = PIANO.querySelector(`[data-letter="${e.code.slice(-1)}"`);
    if(!key) return;
    simpleKey(key);
};

window.addEventListener('keydown', keyboardDown);
window.addEventListener('keyup', keyboardUp);
