class Player {
  constructor() {
    this.positionY = 20;
    this.positionX = 20;
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
    this.positionX--;
    this.domElement.style.left = this.positionX + "px";
  }

  moveRight() {
    this.positionX++;
    this.domElement.style.left = this.positionX + "px";
  }
}
const player = new Player();
player.moveLeft();
player.moveRight();
document.addEventListener("keydown", (action) => {
  if (action.code === "ArrowLeft") {
    player.moveLeft();
  } else if (action.code === "ArrowRight") {
    player.moveRight();
  }
});
