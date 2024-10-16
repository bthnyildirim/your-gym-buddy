class Player {
  constructor() {
    this.positionY = 0;
    this.positionX = 0;
    this.width = 60;
    this.height = 60;

    this.domElement = document.createElement("div");
    this.domElement.id = "player";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";

    const board = document.getElementById("board");
    board.appendChild(this.domElement);

    // Replace the player div background with the player image
    const playerImg = document.createElement("img");
    playerImg.src = "./pictures/player-picture.png";
    playerImg.style.width = "75px";
    playerImg.style.height = "auto";
    this.domElement.appendChild(playerImg);
  }

  moveLeft() {
    const board = document.getElementById("board");
    const boardWidth = board.clientWidth;
    const characterEdge = this.positionX + this.domElement.offsetWidth;
    if (this.positionX > 0) {
      this.positionX -= 20;
      this.domElement.style.left = this.positionX + "px";
    }
  }

  moveRight() {
    const board = document.getElementById("board");
    const boardWidth = board.clientWidth;
    const characterRightEdge = this.positionX + this.domElement.offsetWidth;

    if (characterRightEdge < boardWidth) {
      this.positionX += 20;

      if (this.positionX + this.domElement.offsetWidth > boardWidth) {
        this.positionX = boardWidth - this.domElement.offsetWidth;
      }
      this.domElement.style.left = this.positionX + "px";
    }
  }
}

class Obstacle1 {
  constructor() {
    this.width = 20;
    this.positionY = 900;
    this.positionX = 200 - this.width / 2;
    this.height = 20;

    // Generate a random positionX to place obstacles next to each other
    this.positionX = Math.random() * (boardWidth - this.width);

    this.domElement = document.createElement("div");
    this.domElement.id = "Obstacle1";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    this.domElement.style.position = "absolute";

    // Replace the obstacle background with the dumbbell image
    const dumbellImg = document.createElement("img");
    dumbellImg.src = "./pictures/dumbell-picture.png";
    dumbellImg.style.width = "40px";
    dumbellImg.style.height = "auto";
    this.domElement.appendChild(dumbellImg);

    const board = document.getElementById("board");
    board.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY -= 25;
    this.domElement.style.bottom = this.positionY + "px";
  }
}

class prize {
  constructor() {
    this.width = 20;
    this.positionY = 600;
    this.positionX = 100 - this.width / 2;
    this.height = 20;

    // Generate a random positionX to place obstacles next to each other
    this.positionX = Math.random() * (boardWidth - this.width);

    this.domElement = document.createElement("div");
    this.domElement.id = "prize";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    this.domElement.style.position = "absolute";

    // Replace the obstacle background with the prize image
    const prizeImg = document.createElement("img");
    prizeImg.src = "./pictures/prize-picture.png";
    prizeImg.style.width = "20px";
    prizeImg.style.height = "auto";
    this.domElement.appendChild(prizeImg);

    const board = document.getElementById("board");
    board.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY -= 70;
    this.domElement.style.bottom = this.positionY + "px";
  }
}

const player = new Player();
const obstacles = [];
const prizes = [];
const obstacleWidth = 20; // Define the width of each obstacle
const boardWidth = 1000;
//----------------ending the game once crashed----------------------------//
let gameIntervals = [];
function endGame() {
  gameIntervals.forEach((interval) => clearInterval(interval));
  window.location.href = "over.html";
}

//-----------------score counting once the prize is collected--------------//
let score = 0;
function updateScore() {
  score++;
  console.log(`Score: ${score}`);
  localStorage.setItem("playerScore", score);
}

function gameOver() {
  localStorage.setItem("score", score);
  window.location.href = "over.html";
}
//-----------------timers for the obstacle-dumbell-----------------------//

setInterval(() => {
  const newObstacle = new Obstacle1();
  obstacles.push(newObstacle);
}, 1000);

setInterval(() => {
  obstacles.forEach((obstacle, index) => {
    obstacle.moveDown();

    // remove obstacle from screen
    if (
      player.positionX < obstacle.positionX + obstacle.width &&
      player.positionX + player.width > obstacle.positionX &&
      player.positionY < obstacle.positionY + obstacle.height &&
      player.positionY + player.height > obstacle.positionY
    ) {
      console.log("Crashed");
      endGame();
    }

    // Remove obstacle if it moves off screen
    if (obstacle.positionY < 0) {
      obstacle.domElement.remove();
      obstacles.splice(index, 1);
    }
  });
}, 120);

//-----------------timers for the prize-----------------------//
setInterval(() => {
  const newPrize = new prize();
  prizes.push(newPrize);
}, 3000);

setInterval(() => {
  prizes.forEach((prize, index) => {
    prize.moveDown();

    if (
      player.positionX < prize.positionX + prize.width &&
      player.positionX + player.width > prize.positionX &&
      player.positionY < prize.positionY + prize.height &&
      player.positionY + player.height > prize.positionY
    ) {
      console.log("Collected prize!");
      updateScore();
      // Remove prize after collecting
      prize.domElement.remove();
      prizes.splice(index, 1);
    }

    // Remove prize if it moves off screen
    if (prize.positionY < 0) {
      prize.domElement.remove();
      prizes.splice(index, 1);
    }
  });
}, 15000 / 60);

player.moveLeft();
player.moveRight();
document.addEventListener("keydown", (action) => {
  if (action.code === "ArrowLeft") {
    player.moveLeft();
  } else if (action.code === "ArrowRight") {
    player.moveRight();
  }
});
