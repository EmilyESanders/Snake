var canvas = document.getElementById("snake");
var canvas2d = canvas.getContext("2d");

var gameEnded = false;
canvas.width = 400;
canvas.height = 400;

var snakeSegments = [];
var snakeLength = 1;

var snakeX = 0;
var snakeY = 0;

var directionX = 10;
var directionY = 0;

var dots = [];

var canvasSelected = false;

var gamePaused = false;

var startTime = Date.now();
var elapsedTime = 0;
var highScores = JSON.parse(localStorage.getItem("highScores") )|| [];

canvas.addEventListener("click", function(){
    canvasSelected = true;
});

canvas.addEventListener("space", function(){
    canvasSelected = true;
});

canvas.addEventListener("click", function(){
    if(gameEnded){
        resetGame();
        gameLoop();
    }
});

function moveSnake() {
    snakeSegments.unshift({ x: snakeX, y: snakeY });
    snakeX += directionX;
    snakeY += directionY;
    while (snakeSegments.length > snakeLength){
        snakeSegments.pop();
    }
}

function drawSnake() {
    canvas.style.backgroundColor = "black";
    canvas2d.clearRect(0, 0, canvas.width, canvas.height);
    canvas2d.fillStyle = "white";
    for (var i = 0; i < snakeSegments.length; i++){
        canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y, 10, 10);
    }
}

function gameLoop() {
    if(canvasSelected && !gamePaused){
        moveSnake();
        drawSnake();
        spawnDots();
        checkCollision();
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        canvas2d.fillText("Time: " + elapsedTime, 10, 20);
        if(!gameEnded){
            setTimeout(gameLoop, 100);
        }
    } else {
        setTimeout(gameLoop, 100);
    }
}
gameLoop();

document.onkeydown = function(event){
    switch (event.keyCode){
        case 37:
            if(directionX !== 10){
            directionX = -10;
            directionY = 0;
            }
            break;
        case 38:
            if(directionY !== 10){
            directionX = 0;
            directionY = -10;
            }
            break;
        case 39:
            if (directionX !== -10){
                directionX = 10;
                directionY = 0;
            }
            break;
        case 40:
            if(directionY !== -10){
               directionX = 0;
              directionY = 10;
            }
            break;
        case 32:
            gamePaused = !gamePaused;
            break;
    }
};



function spawnDots() {
    if(dots.length < 10){
        var dotX = Math.floor(Math.random() * canvas.width);
        var dotY = Math.floor(Math.random() * canvas.height);
        dots.push({ x: dotX, y: dotY });
    }
    for (var i = 0; i < dots.length; i++){
        canvas2d.fillStyle = "white";
        canvas2d.fillRect(dots[i].x, dots[i].y, 10, 10);
    }
}

function checkCollision() {
    for (var i = 0; i < dots.length; i++){
        if (snakeX < dots[i].x + 10 &&
            snakeX + 10 > dots[i].x &&
            snakeY < dots[i].y + 10 &&
            snakeY + 10 > dots[i].y){
                snakeLength++;
                dots.splice(i, 1);
                var lastSegment = snakeSegments[snakeSegments.length - 1];
                snakeSegments.push({ x: lastSegment.x, y: lastSegment.y });
                // if(snakeLength > highScores){
                //     highScores = snakeLength;
                //     localStorage.setItem("highScores", highScores);
                // }
            }
    }
    if (snakeX < -10 ||
        snakeY < -10 ||
        snakeX > canvas.width+10 ||
        snakeY > canvas.height+10){
            gameOver();
        }
        for (var i = 1; i < snakeSegments.length; i++){
            if (snakeX === snakeSegments[i].x && snakeY === snakeSegments[i].y){
                gameOver();
            }
        }
}


function gameOver() {
    setTimeout(function(){
        alert("Game over!");
        if(snakeLength > 0){
            checkHighScores();
            updateHighScores();
        }
        alert("Click the box to start a new game");
    }, 500);
    gameEnded = true;
}

function resetGame(){
    gameEnded = false;
    snakeSegments = [];
    snakeLength = 1;
    snakeX = 0;
    snakeY = 0;
    directionX = 10;
    directionY = 0;
    dots = [];
    startTime = Date.now();
}

function checkHighScores(){
    highScores.push(snakeLength);
    highScores.sort(function(a, b) { return b - a});
    if (highScores.length > 5){
        highScores = highScores.slice(0, 5);
    }
    localStorage.setItem("highScores", JSON.stringify(highScores));
}


function updateHighScores() {
    var highScoresElement = document.getElementById("highScoresList");
    highScoresElement.innerHTML = "";
    var storedHighScores = JSON.parse(localStorage.getItem("highScores")) || [];
    // var ol = document.createElement("ol");
    for(var i = 0; i < storedHighScores.length; i++){
        var scoreElement = document.createElement("li");

        scoreElement.innerHTML = (i + 1) + ": " + storedHighScores[i];
        highScoresElement.appendChild(scoreElement);
    }
}











