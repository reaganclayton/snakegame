import { update as updateSnake, draw as drawSnake, snakeSpeed, snakeBody, getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const game = document.getElementById('game');

function main(currentTime) {
    if (gameOver) {
        return replay();
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;
    
    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkLose();
}

function draw() {
    game.innerHTML = "";
    drawSnake(game);
    drawFood(game);
}

function checkLose() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

export function replay() {
    const gameOverScreen = document.querySelector(".gameover-screen");
    const score = document.getElementById("score");

    gameOverScreen.classList.remove("hidden");
    score.innerText = `Your score: ${snakeBody.length - 1}`
}