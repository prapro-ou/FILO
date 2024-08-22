function mod(a, b) {
    return a % b + ((a * b < 0) ? b : 0);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getTimeElm(time) {
    const m  = String(time.getMinutes()).padStart(2, '0');
    const s  = String(time.getSeconds()).padStart(2, '0');
    const ms = String(time.getMilliseconds()).padStart(3, '0');

    return [m, s, ms];
}

// -----------------------------------------------
// return: [mapXDisplacement, mapYDisplacement]
// -----------------------------------------------
function getDisplacementByDir(direction) {
    switch (direction) {
        case 0:  return [0, -1];
        case 1:  return [1, 0];
        case 2:  return [0, 1];
        case 3:  return [-1, 0];
        default: return [0, 0];
    }
}

function pushInventory(img, paddingX = 0, paddingY = 0) {
    const aspect = img.width / img.height;
    const dWidth  = (aspect > 1) ? 50 - paddingX : (50 - paddingX) * aspect;
    const dHeight = (aspect > 1) ? (50 - paddingX) / aspect : 50 - paddingX;
    const xOffset = (50 - dWidth) / 2;
    const yOffset = (50 - dHeight) / 2 - paddingY;

    INVENTORY.getContext('2d').drawImage(
        img,
        xOffset, yOffset,
        dWidth, dHeight 
    );
}

function clearInventory() {
    INVENTORY.getContext('2d').clearRect(0, 0, INVENTORY.width, INVENTORY.height);
}

function closeCurtainAnime() {
    const left  = document.getElementsByClassName('curtain-left')[0];
    const right = document.getElementsByClassName('curtain-right')[0];
    left.classList.remove('open');
    left.classList.add('close');
    right.classList.remove('open');
    right.classList.add('close');
}

function openCurtainAnime() {
    const left  = document.getElementsByClassName('curtain-left')[0];
    const right = document.getElementsByClassName('curtain-right')[0];
    left.classList.remove('close');
    left.classList.add('open');
    right.classList.remove('close');
    right.classList.add('open');
}

function displayMsg(msg) {
    document.getElementsByClassName('clear-msg')[0].classList.add('appear');
    // document.getElementsByClassName('clear-msg')[0].classList.remove('hidden');
}

function hideMsg(msg) {
    document.getElementsByClassName('clear-msg')[0].classList.remove('appear');
    // document.getElementsByClassName('clear-msg')[0].classList.add('hidden');
}