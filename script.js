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

canvas.addEventListener("click", function(){
    canvasSelected = true;
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
    canvas2d.clearRect(0, 0, canvas.width, canvas.height);
    canvas2d.fillStyle = "black";
    for (var i = 0; i < snakeSegments.length; i++){
        canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y, 10, 10);
    }
}

function gameLoop() {
    if(canvasSelected){
    moveSnake();
    drawSnake();
    spawnDots();
    checkCollision();
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
    }
};

function spawnDots() {
    if(dots.length < 10){
        var dotX = Math.floor(Math.random() * canvas.width);
        var dotY = Math.floor(Math.random() * canvas.height);
        dots.push({ x: dotX, y: dotY });
    }
    for (var i = 0; i < dots.length; i++){
        canvas2d.fillStyle = "red";
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
    }, 500);
    gameEnded = true;
}











