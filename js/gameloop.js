let GAMELOOPJS_SPEED = 500 / 60;
let GAMELOOPJS_SPACE_TIMEOUT = 200;
let GAMELOOPJS_INTERVALS = [];

const GAMELOOPJS_KEY = {};

let shootsnd;
let explode;
let gameOverSnd;

document.addEventListener("keydown", (e) => (GAMELOOPJS_KEY[e.key] = true));
document.addEventListener("keyup", (e) => (GAMELOOPJS_KEY[e.key] = false));

function leftKeyPressed() {
  console.log("Please implement the function leftKeyPressed()");
}

function rightKeyPressed() {
  console.log("Please implement the function rightKeyPressed()");
}

function upKeyPressed() {
  console.log("Please implement the function upKeyPressed()");
}

function downKeyPressed() {
  console.log("Please implement the function downKeyPressed()");
}

function spaceKeyPressed() {
  console.log("Please implement the function spaceKeyPressed()");
}

function flyUp(gameObject, speed =  10, repeat = 2000) {
  let i = 0;
  let interval = gameInterval(() => {
    gameObject.y -= speed;
    if (++i >= repeat) {
      clearInterval(interval);
    }
  }, GAMELOOPJS_SPEED);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function flyDown(gameObject, speed = 10, repeat = 2000) {
  let i = 0;
  let interval = gameInterval(() => {
    gameObject.y += speed;
    if (++i >= repeat) {
      clearInterval(interval);
    }
  }, GAMELOOPJS_SPEED);
}

GAMELOOPJS_START();

function GAMELOOPJS_START() {
  let spaceKeyLocked = false;
  let soundIsInitalized = false;
  gameInterval(() => {
    if (GAMELOOPJS_KEY["ArrowLeft"]) leftKeyPressed();
    if (GAMELOOPJS_KEY["ArrowRight"]) rightKeyPressed();
    if (GAMELOOPJS_KEY["ArrowUp"]) upKeyPressed();
    if (GAMELOOPJS_KEY["ArrowDown"]) downKeyPressed();
    if (GAMELOOPJS_KEY[" "]) {
      if (!spaceKeyLocked) {
        if (!soundIsInitalized) {
          initializeSound();
        }
        spaceKeyPressed();
        spaceKeyLocked = true;
        setTimeout(() => {
          spaceKeyLocked = false;
        }, GAMELOOPJS_SPACE_TIMEOUT);
      }
    }
  }, GAMELOOPJS_SPEED);
}

function waitForCollision(object1, object2) {
  return new Promise((resolve) => {
    gameInterval(() => {
      if (object2 instanceof Array) {
        object2.forEach((gameObject) => {
          if (isColliding(object1, gameObject)) {
            resolve([object1, gameObject]);
          }
        });
      } else {
        if (isColliding(object1, object2)) {
          resolve([object1, object2]);
        }
      }
    }, 50);
  });
}

function initializeSound() {
  console.log("Sound initialisiert.");
  shootsnd = new Howl({ src: ["snd/shoot.mp3"], autoplay: true, html5: true });
  explode = new Howl({
    src: ["snd/explosion.mp3"],
    autoplay: false,
    html5: true,
  });
  gameOverSnd = new Howl({
    src: ["snd/game-over.wav"],
    autoplay: false,
    html5: true,
  });

  soundIsInitalized = true;
}

function isColliding(object1, object2) {
  let children = typeof rocket !== "undefined" ? app.stage.children : [];
  if (children.includes(object1) && children.includes(object2)) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }
  return false;
}

function stopGame() {
  gameOverSnd.play();
  GAMELOOPJS_INTERVALS.forEach(clearInterval);
}

function gameInterval(fun, time) {
  let interval = setInterval(fun, time);
  GAMELOOPJS_INTERVALS.push(interval);
  return interval;
}
