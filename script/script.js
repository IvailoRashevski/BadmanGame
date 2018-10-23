/**
 * Created by ivailo on 2/7/15.
 */
var counter = {
    counter: 0
}

var bulletsCounter = {
    bCounter: 11
}

var script = {
    stage: null,
    speed: 2,
    enemies: [],
    bullets: [11],
    i: 0,
    p: 0,
    q: 0,
    w: 0,
    crx: null,
    lkd: false,
    upd: false,
    rkd: false,
    dkd: false,
    temp: null,
    Enemy: null,
    Batman: null,
    EnemyCount: null,
    GameOver: null,
    bullet: null,
    score: null,
    bronze: null,
    silver: null,
    gold: null,
    trackBullets: null,
    PlayBtn: null,
    PauseBtn: null,
    StartBtn: null,
    startView: null,
    soundPath: "../audio/",
    theMP3: null,
    hitEnemyMP3:null,
    killMP3:null,
    victoryMP3:null,
    loseMP3:null,

    init: function () {

        script.stage = new createjs.Stage("canvas");
        script.Preloader.preload(); //this.preloader...
        script.addBackgroundSound();

    },
    gameLoaded: function () {
        script.startView = new createjs.Container();

        script.StartBtn = new createjs.Bitmap(script.Preloader.queue.getResult("Start"));
        script.StartBtn.x = 300;
        script.StartBtn.y = 250;
        script.PlayBtn = new createjs.Bitmap(script.Preloader.queue.getResult("Play"));
        script.PlayBtn.x = 700;
        script.PlayBtn.y = 550;
        script.PauseBtn = new createjs.Bitmap(script.Preloader.queue.getResult("Pause"));
        script.PauseBtn.x = script.PlayBtn.x + 33;
        script.PauseBtn.y = script.PlayBtn.y;
        script.EnemyCount = new createjs.Bitmap(script.Preloader.queue.getResult("EnemyCount"));
        script.EnemyCount.x = 10;
        script.EnemyCount.y = 10;
        script.bullet = new createjs.Bitmap(script.Preloader.queue.getResult("bullet1"));
        script.bullet.x = 120;
        script.bullet.y = 5;
        script.score = new createjs.Text(counter.counter, " 35px Verdana", "#0000FF");
        script.score.x = 50;
        script.score.y = 10;
        script.trackBullets = new createjs.Text(bulletsCounter.bCounter, "35px Verdana", "#0000FF");
        script.trackBullets.x = 170;
        script.trackBullets.y = 10;
        script.GameOver = new createjs.Bitmap(script.Preloader.queue.getResult("Gameover"));
        script.GameOver.x = 250;
        script.GameOver.y = 400;
        script.bronze = new createjs.Bitmap(script.Preloader.queue.getResult("bronze"));
        script.bronze.x = 680;
        script.bronze.y =10;
        script.silver = new createjs.Bitmap(script.Preloader.queue.getResult("silver"));
        script.silver.x = 720;
        script.silver.y = 10;
        script.gold = new createjs.Bitmap(script.Preloader.queue.getResult("gold"));
        script.gold.x = 200;
        script.gold.y = 100;

        script.startView.addChild(script.StartBtn);
        script.startView.addChild(script.PlayBtn);
        script.startView.addChild(script.PauseBtn);

        script.stage.addChild(script.startView);

        script.StartBtn.on("click", script.startGame);
        script.PlayBtn.on("click", script.playSound);
        script.PauseBtn.on("click", script.pauseSound);


        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", script.onTick); //onTick?

        window.onkeyup = script.keyUp;
        window.onkeydown = script.keyDown;
        script.hitEnemyMP3 = createjs.Sound.play('../audio/boom.mp3');
        script.hitEnemyMP3.setVolume(0.15);
        script.killMP3 = createjs.Sound.play('../audio/kill.mp3');
        script.loseMP3 = createjs.Sound.play('../audio/fail-trombone-01.mp3');


    },

    startGame: function () {


        script.stage.removeAllChildren();
        script.stage.addChild(script.PlayBtn);
        script.stage.addChild(script.PauseBtn);
        //script.stage.addChild(script.Batman);
        script.stage.addChild(script.EnemyCount);
        script.stage.addChild(script.bullet);
        script.stage.addChild(script.score);
        script.stage.addChild(script.trackBullets);
        script.stage.addChild(script.addEnemy());
        script.stage.addChild(script.addBatman());


    },

    keyUp: function (e) {

        switch (e.keyCode) {
            case 37:
                script.Batman.lkd = false;
                break;
            case 38:
                script.Batman.ukd = false;
                break;
            case 39:
                script.Batman.rkd = false;
                break;
            case 40:
                script.Batman.dkd = false;
                break;
        }
    },

    keyDown: function (e) {

        switch (e.keyCode) {
            case 37:
                script.Batman.lkd = true;
                break;
            case 38:
                script.Batman.ukd = true;
                break;
            case 39:
                script.Batman.rkd = true;
                break;
            case 40:
                script.Batman.dkd = true;
                break;
            case 32:
                script.heroStrike();
                break;
        }
    },

    rewards : function() {
        if(counter.counter == 20){
            script.stage.addChild(script.bronze);
        }
        if(counter.counter == 40){
            script.stage.addChild(script.silver);
        }
        if(counter.counter == 65){
            script.stage.removeAllChildren();
            script.stage.addChild(script.gold);
            script.pauseSound();
            script.victoryMP3 = createjs.Sound.play('../audio/victory_fanfare.mp3');
            script.victoryMP3.play();
            script.stage.update();
        }
    },

    heroStrike: function () {

        if(bulletsCounter.bCounter > 0) {
            script.temp = new createjs.Bitmap(script.Preloader.queue.getResult("bullet2"));
            script.temp.x = script.Batman.x + 20;
            script.temp.y = script.Batman.y + 20;
            script.temp.width = 25;
            script.temp.height = 20;
            script.stage.addChild(script.temp);
            script.bullets.push(script.temp);  // add one more bullet to the end of the array
            bulletsCounter.bCounter --;
            script.trackBullets.text = bulletsCounter.bCounter;
        }

    },
    moveBullets: function () {

        for (script.p = script.bullets.length - 1; script.p >= 0; script.p--) {
            script.bullets[script.p].x += 10;
            if (script.bullets[script.p].x > script.stage.canvas.width) {
                script.stage.removeChild(script.bullets[script.p]);
                script.bullets.splice(script.p, 1);
            }
        }
    },


    addBatman: function() {
        script.Batman = new createjs.Bitmap(script.Preloader.queue.getResult("Batman"));
        script.Batman.x = 100;
        script.Batman.y = 100;
        script.Batman.width = 64;
        script.Batman.height = 64;
        script.stage.addChild(script.Batman);
    },
    addEnemy: function () {

        script.Enemy = new createjs.Bitmap(script.Preloader.queue.getResult("Enemy"));
        script.Enemy.x = script.stage.canvas.width + 200 ;// + 200 outside
        script.Enemy.y = Math.floor(Math.random() * 320);
        script.Enemy.width = 88;
        script.Enemy.height = 86;
        script.enemies.push(script.Enemy);
        script.stage.addChild(script.Enemy);
    },

    moveEnemies: function () {

        for (script.i = 0; script.i < script.enemies.length; script.i++) {
            script.enemies[script.i].x -= script.speed;
        }

    },

    hitTest: function (rect1, rect2) {

        if (rect1.x >= rect2.x + rect2.width
            || rect1.x + rect1.width <= rect2.x
            || rect1.y >= rect2.y + rect2.width
            || rect1.y + rect1.height <= rect2.y) {

            return false;
        }
        return true;
    },

    isCollide: function () {
        for (script.w = script.enemies.length - 1; script.w >= 0; script.w--) {
            if (script.hitTest(script.Batman, script.enemies[script.w])) {
                script.stage.removeAllChildren();
                script.stage.addChild(script.GameOver);
                script.pauseSound();
                script.loseMP3.play();
                script.stage.update();
            }
        }
    },

    checkCollisions: function () {


        for (script.q = script.bullets.length - 1; script.q >= 0; script.q--) {
            for (script.w = script.enemies.length - 1; script.w >= 0; script.w--) {
                if (script.hitTest(script.bullets[script.q], script.enemies[script.w])) {
                    counter.counter ++;
                    script.score.text=counter.counter;
                    if (counter.counter % 10 ==0 ){
                        script.killMP3.play();
                        bulletsCounter.bCounter = bulletsCounter.bCounter + 12;
                        script.speed ++;
                    }
                    script.hitEnemyMP3.play();
                    createjs.Tween.get(script.enemies[script.w]).to({x:800, y:600, scaleX: 2.2, scaleY: 3.3, alpha: 0.2}, 2000, createjs.Ease.sineInOut);//sineInOut 800/600
                    script.stage.removeChild(script.bullets[script.q]);
                    script.enemies.splice(script.w, 1); //splice remove from array(which element, how many)
                    script.bullets.splice(script.q, 1);
                    break;
                }
            }
        }
    },


    addBackgroundSound: function () {

        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }

        var manifest = [
            {id: "Kaskata", src: "Kaskata.mp3"}
        ];

        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.addEventListener("fileload", script.handleLoad);
        createjs.Sound.registerManifest(manifest, script.soundPath);
    },

    handleLoad: function (event) {
        script.theMP3 = createjs.Sound.play(event.src);
    },

    pauseSound: function () {
        script.theMP3.pause();
    },

    playSound: function () {
        script.theMP3.resume();
    },


    onTick: function (e) {

        var rand = Math.random() * 1000;
        if (rand < 12) {
            script.addEnemy();
        }

        if (script.Batman.lkd) {
            script.Batman.x -= script.speed + 3;
        }
        if (script.Batman.ukd) {
            script.Batman.y -= script.speed + 3;
        }
        if (script.Batman.rkd) {
            script.Batman.x += script.speed + 3;
        }
        if (script.Batman.dkd) {
            script.Batman.y += script.speed + 3;
        }


        script.isCollide();
        script.checkCollisions(); // no stage
        script.moveBullets();
        script.moveEnemies();
        script.rewards();

        script.stage.update(e);

    }
};
