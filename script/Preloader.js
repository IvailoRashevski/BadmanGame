/**
 * Created by ivailo on 2/7/15.
 */
script.Preloader={

    queue: new createjs.LoadQueue(true),
    preloadText: new createjs.Text("", "40px Arial", "$FFFFFF"),
    preload:function(){
        this.queue.on("progress", this.progress, this);
        this.queue.on("complete", script.gameLoaded);
        this.queue.loadManifest([
            {id:"Batman", src: "../images/Batman.png"},
            {id:"Enemy", src: "../images/Enemy.png"},
            {id:"EnemyCount", src:"../images/EnemyCount.png"},
            {id:"bullet1", src:"../images/bullet1.png"},
            {id:"bullet2", src:"../images/bullet2.png"},
            {id:"Gameover", src:"../images/Gameover.png"},
            {id:"Pause", src: "../images/PauseBtn.png"},
            {id:"bronze", src:"../images/bronze.png"},
            {id:"silver", src:"../images/silver.png"},
            {id:"gold", src:"../images/gold.png"},
            {id:"Play", src: "../images/PlayBtn.png"},
            {id:"Start", src: "../images/StartBtn.png"},
            {id:"Kaskata", src: "../audio/Kaskata.mp3"},
            {id:"victory", src: "../audio/victory_fanfare.mp3"},
            {id:"lose", src:"../audio/fail-trombone-01.mp3"},
            {id:"boom", src: "../audio/boom.mp3"},
            {id:"kill", src: "../audio/kill.mp3"}

        ]);
    },
    progress:function(e){

        var percent = Math.round(e.progress * 100);
        this.preloadText.text = "LOADING..." + percent + "%";
        script.stage.update(e);
    }
};