class Player {
  constructor() {
    this.positionY = 0;
    this.positionX = 0;
    this.width = 80;
    this.height = 80;

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
    playerImg.style.width = "100px";
    playerImg.style.height = "auto";
    this.domElement.appendChild(playerImg);
  }

  moveLeft() {
    this.positionX -= 20;
    this.domElement.style.left = this.positionX + "px";
  }

  moveRight() {
    this.positionX += 20;
    this.domElement.style.left = this.positionX + "px";
  }
}

class Obstacle1 {
  constructor() {
    this.width = 50;
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
    this.width = 30;
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

// Array to store all obstacles
const obstacles = [];
const obstacleWidth = 30; // Define the width of each obstacle
const boardWidth = 1000;

//-----------------timers for the obstacle-dumbell-----------------------//

setInterval(() => {
  const newObstacle = new Obstacle1();
  obstacles.push(newObstacle);
}, 1000);

setInterval(() => {
  obstacles.forEach((obstacle, index) => {
    obstacle.moveDown();

    // If the obstacle moves off the screen, remove it
    if (obstacle.positionY < 0) {
      obstacle.domElement.remove();
      obstacles.splice(index, 1);
    }
  });
}, 200);

//-----------------timers for the prize-----------------------//
setInterval(() => {
  const newPrize = new prize();
  obstacles.push(newPrize);
}, 3000);

setInterval(() => {
  prize.forEach((prize, index) => {
    prize.moveDown();

    // If the obstacle moves off the screen, remove it
    if (prize.positionY < 0) {
      prize.domElement.remove();
      obstacles.splice(index, 2);
    }
  });
}, 200);

player.moveLeft();
player.moveRight();
document.addEventListener("keydown", (action) => {
  if (action.code === "ArrowLeft") {
    player.moveLeft();
  } else if (action.code === "ArrowRight") {
    player.moveRight();
  }
});
