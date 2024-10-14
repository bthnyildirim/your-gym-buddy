class Player {
  constructor() {
    this.positionY = 0;
    this.positionX = 0;
    this.width = 40;
    this.height = 40;

    this.domElement = document.createElement("div");
    this.domElement.id = "player";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";

    const board = document.getElementById("board");
    board.appendChild(this.domElement);
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
    this.width = 40;
    this.positionY = 900;
    this.positionX = 500 - this.width / 2;
    this.width = 40;
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

    const board = document.getElementById("board");
    board.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY -= 25;
    this.domElement.style.bottom = this.positionY + "px";
  }
}

const player = new Player();

// Array to store all obstacles
const obstacles = [];
const obstacleWidth = 40; // Define the width of each obstacle
const boardWidth = 1800;

setInterval(() => {
  const newObstacle = new Obstacle1(); // Create a new obstacle
  obstacles.push(newObstacle); // Add it to the array
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

player.moveLeft();
player.moveRight();
document.addEventListener("keydown", (action) => {
  if (action.code === "ArrowLeft") {
    player.moveLeft();
  } else if (action.code === "ArrowRight") {
    player.moveRight();
  }
});
