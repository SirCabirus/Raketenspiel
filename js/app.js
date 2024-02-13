const APPWIDTH = 1044;
const APPHEIGHT = 728;

const app = new PIXI.Application({width: APPWIDTH, height: APPHEIGHT});
const ufoList = [];

let statusLine;
let score = 0;

document.body.appendChild(app.view);

const background = PIXI.Sprite.from('./assets/background.jpg');
app.stage.addChild(background);

const rocket = PIXI.Sprite.from('./assets/rocket.png');
rocket.x = APPWIDTH / 2;
rocket.y = APPHEIGHT - 80;
rocket.scale.x = 0.05;
rocket.scale.y = 0.05;
app.stage.addChild(rocket);

gameInterval(function() {

    statusLine = document.getElementById("status");
    statusLine.textContent = "Score: " + score;
    console.log(statusLine.textContent);
    

    const ufo = PIXI.Sprite.from('./assets/ufo' + random(1, 2) + '.png');
    ufo.x = random(0, APPWIDTH - 60);
    ufo.y = -25;
    ufo.scale.x = 0.1;
    ufo.scale.y = 0.1;
    app.stage.addChild(ufo);
    ufoList.push(ufo);
    flyDown(ufo, 1);

    waitForCollision(ufo, rocket).then(function() {
        app.stage.removeChild(rocket);
        const gameOver = PIXI.Sprite.from('./assets/gameOver.png');
        app.stage.addChild(gameOver);
        stopGame();
    });
}, 1000);

function leftKeyPressed() {
    rocket.x = rocket.x - 5;
}

function rightKeyPressed() {
    rocket.x = rocket.x + 5;
}

function spaceKeyPressed() {
    const bullet = PIXI.Sprite.from('./assets/bullet.png');
    bullet.x = rocket.x + 15; 
    bullet.y = rocket.y - 10  ;
    bullet.scale.x = 0.02;
    bullet.scale.y = 0.02;
    flyUp(bullet, 5, 3000);
    app.stage.addChild(bullet);
    shootsnd.play();


    waitForCollision(bullet, ufoList).then(function([bullet, ufo]) {
        app.stage.removeChild(ufo);
        app.stage.removeChild(bullet);
        explode.play();
        score = score + 10;                

    });
}