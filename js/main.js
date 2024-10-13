class Player {
  constructor() {
    this.positionY = 0;
    this.positionX = 0;
    this.width = 20;
    this.height = 20;

    const domElement = document.createElement("div");
    domElement.id = "player";
    domElement.style.width = this.width + "px";
    domElement.style.height = this.height + "px";
    domElement.style.left = this.positionX + "px";
    domElement.style.bottom = this.positionY + "px";

    const board = document.getElementById("board");
    board.appendChild(domElement);
  }

  moveLeft() {
    this.positionY--;
    domElement.style.bottom = this.positionY + "px";
  }

  moveRight() {
    this.positionX++;
    domElement.style.left = this.positionX + "px";
  }
}
const player = new Player();
player.moveLeft();
player.moveLeft();
player.moveLeft();
