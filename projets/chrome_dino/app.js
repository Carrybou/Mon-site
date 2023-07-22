const container = document.getElementById("game");
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const score = document.getElementById("score");
//const bestScore = document.getElementById("bestScore");
const gameOver = document.getElementById("gameOver");

// fonction qui donne un entier entre 0 et max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
// le saut
function jump() {
    if (dino.classList !="jump") {
        dino.classList.add("jump");
        setTimeout(function (){
            dino.classList.remove("jump");
        }, 500);
        
    }
}

document.addEventListener("keydown", function (event) {
    jump();
});
// changer le type de cactus
let cactusType = setInterval(function(){
    if (getRandomInt(2)==0){
        cactus.style.width = "20px";
        cactus.style.backgroundImage = "url(image/petitcactus.PNG)";
        cactus.style.backgroundSize = "20px 40px";

    } else {
        cactus.style.width = "40px";
        cactus.style.backgroundImage = "url(image/grandcactus.png)";
        cactus.style.backgroundSize ="40px 40px";
    }
},1000);

// distance entre cactus et dino + defaite si contact
let isALive = setInterval(function(){
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));// position y du dino
    
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));// position x du cactus
     
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {// detecter les colisions
        // collision donc game over
        if (playerScore>bestScore) {
            bestScore= playerScore
            bestScore.innerHTML = `best Score <b> ${ bestScore } </b>`;
        }
        playerScore = 0; // game over donc score retombe a 0
        gameOver.style.display = "block"; // on affiche game over
        // on remet le cactus a sa position de départ
        cactus.classList.remove("block");
        setTimeout(function (){
            cactus.classList.add("block");
            gameOver.style.display = "none";
            playerScore = 0; // game over donc score retombe a 0
        }, 2000);
        
    }
    

}, 10);


// score et meilleur score
let interval = null;
let playerScore = 0;

let scoreCounter = ()=>{
    playerScore++;
    score.innerHTML = `Score <b> ${ playerScore } </b>`;
}

interval = setInterval(scoreCounter,200);

/*let bestScoreChanger = setInterval(function(){
    if (playerScore>bestScore) {
        bestScore.innerHTML = `best Score <b> ${ playerScore } </b>`;
    }
}, 10);*/
    